<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { BookOpen, ArrowRight, ArrowLeft, Map } from "lucide-svelte";
  import { onMount, onDestroy } from "svelte";
  import { mode } from "mode-watcher";
  import { base } from '$app/paths';
  import { DOCS_BASE_URL } from '$lib/config';

  $: isDark = $mode === 'dark';

  interface ProjectProps{
    name: string;
    description: string;
    image: string;
    githubUrl: string;
    docsUrl?: string;
    websiteUrl?: string;
    exploreUrl?: string;
    exploreUrlDark?: string;
    institutions?: Array<{
      name: string;
      logo: string;
      url: string;
    }>;
  }

  const projects: ProjectProps[] = [
        {
          name: "PyPSA-Earth",
          description: "A flexible Python-based open optimisation model to study energy system futures around the world",
          image: `${base}/img/projects/pypsa-earth.png`,
          githubUrl: "https://github.com/pypsa-meets-earth/pypsa-earth",
          docsUrl: "https://pypsa-earth.readthedocs.io/en/latest/",
          institutions: [{
            name: "PyPSA meets Earth",
            logo: `${base}/img/institutions/pypsa-meets-earth.png`,
            url: "https://pypsa-meets-earth.github.io/"
          }]
        },
        {
          name: "PyPSA-Eur",
          description: "A Sector-Coupled Open Optimisation Model of the European Energy System",
          image: `${base}/img/projects/pypsa-eur.png`,
          githubUrl: "https://github.com/PyPSA/pypsa-eur",
          docsUrl: "https://pypsa-eur.readthedocs.io/",
          exploreUrl: `${base}/explore/europe-light.html`,
          exploreUrlDark: `${base}/explore/europe-dark.html`,
          institutions: [{
            name: "TU Berlin",
            logo: `${base}/img/institutions/tu-berlin.svg`,
            url: "https://www.tu.berlin/en/ensys"
          }]
        },
        {
          name: "PyPSA-USA",
          description: "An Open-Source Energy System Optimization Model for the United States",
          image: `${base}/img/projects/pypsa-usa.png`,
          githubUrl: "https://github.com/PyPSA/pypsa-usa",
          docsUrl: "https://pypsa-usa.readthedocs.io/en/latest/",
          institutions: [{
            name: "Stanford University",
            logo: `${base}/img/institutions/stanford-university-seeklogo.svg`,
            url: "https://ines.stanford.edu/"
          }]
        },
        {
          name: "PyPSA-DE",
          description: "High resolution, sector-coupled model of the German Energy System",
          image: `${base}/img/projects/pypsa-de.png`,
          githubUrl: "https://github.com/PyPSA/pypsa-de",
          institutions: [{
            name: "TU Berlin",
            logo: `${base}/img/institutions/tu-berlin.svg`,
            url: "https://www.tu.berlin/en/ensys"
          }]
        }
  ];

  const accentColor = "#2993B5";
  const accentHoverColor = "#237a92";

  let carouselIndex = 0;
  let visibleCount = 3;
  let isTransitioning = true;
  let autoPlayInterval: ReturnType<typeof setInterval> | null = null;
  let autoPlayEnabled = true;
  let expandedProject: string | null = null;
  let shouldLoadIframes = false;
  let sectionElement: HTMLElement;
  let carouselElement: HTMLElement;
  let isScrolling = false;

  // Track window width for responsive behavior
  let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;

  function updateWindowSize() {
    if (typeof window === 'undefined') return;
    windowWidth = window.innerWidth;

    if (windowWidth < 640) {
      visibleCount = 1;
    } else if (windowWidth < 1024) {
      visibleCount = 2;
    } else {
      visibleCount = 3;
    }
  }

  function stopAutoPlay() {
    autoPlayEnabled = false;
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  function handleWheel(event: WheelEvent) {
    if (isScrolling) {
      event.preventDefault();
      return;
    }

    const deltaX = event.deltaX;
    const deltaY = event.deltaY;

    // Check if horizontal scroll is dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      event.preventDefault();
      isScrolling = true;

      if (deltaX > 0) {
        showNext();
      } else {
        showPrev();
      }

      stopAutoPlay();

      setTimeout(() => {
        isScrolling = false;
      }, 600);
    }
  }

  onMount(() => {
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);

    // Setup intersection observer for lazy loading iframes
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadIframes) {
            shouldLoadIframes = true;
          }
        });
      },
      { rootMargin: '100px' } // Start loading 100px before section is visible
    );

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    // Add wheel event listener for horizontal scrolling
    if (carouselElement) {
      carouselElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    // Start auto-play carousel every 5 seconds
    autoPlayInterval = setInterval(() => {
      if (autoPlayEnabled) {
        showNext();
      }
    }, 5000);

    return () => {
      window.removeEventListener('resize', updateWindowSize);
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
      if (carouselElement) {
        carouselElement.removeEventListener('wheel', handleWheel);
      }
    };
  });

  onDestroy(() => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  });

  $: if (typeof window !== 'undefined') {
    updateWindowSize();
  }

  function showNext() {
    if (projects.length <= visibleCount) return;
    carouselIndex++;

    // Reset to beginning after animation completes
    if (carouselIndex >= projects.length) {
      setTimeout(() => {
        isTransitioning = false;
        carouselIndex = 0;
        setTimeout(() => {
          isTransitioning = true;
        }, 50);
      }, 500);
    }
  }

  function showPrev() {
    if (projects.length <= visibleCount) return;

    if (carouselIndex === 0) {
      isTransitioning = false;
      carouselIndex = projects.length;
      setTimeout(() => {
        isTransitioning = true;
        carouselIndex--;
      }, 50);
    } else {
      carouselIndex--;
    }
  }

  function accentStyle(name: string) {
    return `--accent-color: ${accentColor}; --accent-hover-color: ${accentHoverColor};`;
  }

  function toggleExpand(projectName: string) {
    if (expandedProject === projectName) {
      expandedProject = null;
    } else {
      expandedProject = projectName;
      stopAutoPlay();
    }
  }

</script>

<section id="implementations" class="container py-24 sm:py-32" bind:this={sectionElement}>
  <div>
    <div id="implementations" class="relative -top-32"></div>
    <h2 class="text-lg text-center mb-2 tracking-wider" style={`color: ${accentColor};`}>
      Implementations
    </h2>

    <h2 class="text-3xl md:text-4xl text-center font-bold mb-4">
      PyPSA Models
    </h2>

    <h3 class="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
      Open Energy System Models built with PyPSA
    </h3>

    <div class="relative py-8 overflow-x-hidden overflow-y-visible" bind:this={carouselElement}>
      {#if expandedProject === null}
      <div class="carousel-container pt-4 pb-2" style="transform: translateX(-{carouselIndex * (100 / visibleCount)}%); transition: {isTransitioning ? 'transform 0.5s ease-in-out' : 'none'}">
        {#each [...projects, ...projects] as project, idx (project.name + '-' + idx)}
        <div class="carousel-item" style="width: {100 / visibleCount}%">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="block h-full"
        >
          <Card
            class="h-full bg-muted/50 dark:bg-card border border-border/50 shadow-lg shadow-black/10 dark:shadow-white/10 hover:shadow-xl hover:shadow-black/20 dark:hover:shadow-white/20 transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 rounded-2xl relative overflow-hidden group cursor-pointer mx-3"
          >
            {#if project.exploreUrl}
              <button
                type="button"
                class="absolute bottom-3 right-3 p-2 rounded-full transition-all duration-300 opacity-60 hover:opacity-100 z-10 explore-button"
                on:mouseenter={(e) => {
                  const mapIcons = e.currentTarget.querySelectorAll('.map-icon');
                  mapIcons.forEach(icon => icon.style.color = accentColor);
                }}
                on:mouseleave={(e) => {
                  const mapIcons = e.currentTarget.querySelectorAll('.map-icon');
                  mapIcons.forEach(icon => icon.style.color = '');
                }}
                on:click={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleExpand(project.name);
                }}
                title="Explore {project.name}"
              >
                <span class="relative inline-flex">
                  <span class="absolute inline-flex h-full w-full hover-ping">
                    <Map class="size-6 map-icon" />
                  </span>
                  <Map class="size-6 relative map-icon transition-colors duration-300" />
                </span>
              </button>
            {/if}
            <CardHeader class="flex justify-center items-center pb-4">
                <div class="w-full h-48 mb-4 rounded-lg overflow-hidden flex items-center justify-center relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    class="max-w-full max-h-full object-contain transition-all duration-300"
                  />
                </div>
                <CardTitle class="text-xl mb-2 text-center">{project.name}</CardTitle>
              </CardHeader>

              <CardContent class="text-muted-foreground text-center px-6 pb-6">
                <p class="text-sm leading-relaxed mb-6">{project.description}</p>

                {#if project.docsUrl}
                  <div class="flex justify-center mb-4">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      class="flex items-center gap-2 accent-hover-only"
                      style={accentStyle(project.name)}
                    >
                      <a
                        href={project.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center gap-2 w-full h-full"
                        on:click={(e) => e.stopPropagation()}
                      >
                        <BookOpen class="size-4" />
                        Docs
                      </a>
                    </Button>
                  </div>
                {/if}

                {#if project.institutions && project.institutions.length > 0}
                  <div class="flex justify-center mt-2">
                    <div class="inline-flex items-center gap-1 px-2 py-0 bg-muted/50 border border-border/50 rounded-lg">
                      <span class="text-xs text-muted-foreground">Led by</span>
                      {#each project.institutions as institution, idx}
                        <a
                          href={institution.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="flex items-center gap-2 transition-opacity hover:opacity-70"
                          title={institution.name}
                        >
                          <span class="text-xs text-muted-foreground">{institution.name}</span>
                          <img
                            src={institution.logo}
                            alt={institution.name}
                            class="w-8 h-8 object-contain"
                            on:error={(e) => {
                              console.error('Institution logo failed to load:', institution.logo);
                              e.target.style.display = 'none';
                            }}
                          />
                        </a>
                        {#if idx < project.institutions.length - 1}
                          <span class="text-xs text-muted-foreground">&</span>
                        {/if}
                      {/each}
                    </div>
                  </div>
                {/if}
              </CardContent>
            </Card>
          </a>
        </div>
        {/each}
      </div>
      {/if}

      <!-- Expanded view - keep iframes loaded but hidden -->
      {#if shouldLoadIframes}
        {#each projects as project}
          {#if project.exploreUrl}
            <div class="w-full px-3" style="display: {expandedProject === project.name ? 'block' : 'none'};">
              <Card
                class="w-full bg-muted/50 dark:bg-card border border-border/50 shadow-lg shadow-black/10 dark:shadow-white/10 rounded-2xl relative overflow-hidden"
              >
                <div class="absolute top-4 left-4 z-10">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 accent-hover-only"
                    style={accentStyle(project.name)}
                    on:click={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleExpand(project.name);
                    }}
                  >
                    <ArrowLeft class="size-4" />
                    Back
                  </button>
                </div>

                <iframe
                  src={isDark && project.exploreUrlDark ? project.exploreUrlDark : project.exploreUrl}
                  title="{project.name} Explorer"
                  class="w-full h-[800px] border-0 rounded-2xl"
                ></iframe>
              </Card>
            </div>
          {/if}
        {/each}
      {/if}
    </div>

    {#if projects.length > visibleCount && expandedProject === null}
      <!-- Indicator Dots -->
      <div class="flex justify-center gap-2 mt-2">
        {#each projects as project, index}
          {@const normalizedIndex = carouselIndex % projects.length}
          {@const isInRange =
            index >= normalizedIndex && index < normalizedIndex + visibleCount
          }
          {@const isWrappedVisible =
            normalizedIndex + visibleCount > projects.length &&
            index < (normalizedIndex + visibleCount) % projects.length
          }
          {@const isVisible = isInRange || isWrappedVisible}
          <button
            type="button"
            on:click={() => {
              stopAutoPlay();
              carouselIndex = index;
            }}
            class="w-2 h-2 rounded-full transition-all duration-300"
            style="background-color: {isVisible ? accentColor : '#cbd5e1'}"
            aria-label="Go to {project.name}"
          />
        {/each}
      </div>
      <div class="mt-4 flex justify-center gap-4">
        <button
          class="p-2 rounded-full border border-gray-300 hover:text-white transition-colors"
          type="button"
          on:click={() => {
            stopAutoPlay();
            showPrev();
          }}
          aria-label="Previous model"
          on:mouseenter={(e) => {
            e.target.style.backgroundColor = accentColor;
            e.target.style.borderColor = accentColor;
          }}
          on:mouseleave={(e) => {
            e.target.style.backgroundColor = '';
            e.target.style.borderColor = '';
          }}
        >
          <ArrowLeft class="size-4" />
        </button>

        <button
          class="p-2 rounded-full border border-gray-300 hover:text-white transition-colors"
          type="button"
          on:click={() => {
            stopAutoPlay();
            showNext();
          }}
          aria-label="Next model"
          on:mouseenter={(e) => {
            e.target.style.backgroundColor = accentColor;
            e.target.style.borderColor = accentColor;
          }}
          on:mouseleave={(e) => {
            e.target.style.backgroundColor = '';
            e.target.style.borderColor = '';
          }}
        >
          <ArrowRight class="size-4" />
        </button>
      </div>
    {/if}

    {#if expandedProject === null}
      <div class="mt-8 flex justify-center">
        <Button
          href="{DOCS_BASE_URL}/home/models"
          target="_blank"
          rel="noopener noreferrer"
          class="h-12 px-8 bg-[#2993B5] hover:bg-[#237a92] text-white font-medium rounded-full group/arrow transition-colors duration-300"
        >
          Find More Models
          <ArrowRight class="ml-2 group-hover/arrow:translate-x-1 transition-transform duration-300" style="width: 1rem; height: 1rem;" />
        </Button>
      </div>
    {/if}
  </div>
</section>

<style>
  :global(.accent-hover-only) {
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  }

  :global(.accent-hover-only:hover) {
    border-color: var(--accent-color) !important;
    background-color: var(--accent-hover-color, var(--accent-color)) !important;
    color: #fff !important;
  }

  :global(.accent-hover-only:hover a),
  :global(.accent-hover-only:hover svg) {
    color: inherit !important;
  }

  .carousel-container {
    display: flex;
  }

  .carousel-item {
    flex-shrink: 0;
    padding: 0;
  }

  .hover-ping {
    opacity: 0;
  }

  .explore-button:hover .hover-ping {
    opacity: 0.75;
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  @keyframes ping {
    0% {
      transform: scale(1);
      opacity: 0.75;
    }
    75%, 100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }

</style>
