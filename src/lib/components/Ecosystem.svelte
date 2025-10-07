<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { BookOpen, ArrowRight, ArrowLeft } from "lucide-svelte";
  import { base } from '$app/paths';
  import { onMount, onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  interface ProjectProps {
    name: string;
    description: string;
    image: string;
    githubUrl: string;
    docsUrl?: string;
    websiteUrl?: string;
    institutions?: Array<{
      name: string;
      logo: string;
      url: string;
    }>;
  }

  const projects: ProjectProps[] = [
    {
      name: "Atlite",
      description: "A Lightweight Python Package for Calculating Renewable Power Potentials and Time Series",
      image: `${base}/img/projects/atlite.png`,
      githubUrl: "https://github.com/PyPSA/atlite",
      docsUrl: "https://atlite.readthedocs.io/",
      institutions: [{
        name: "TU Berlin",
        logo: `${base}/img/institutions/tu-berlin.svg`,
        url: "https://www.tu.berlin/en/ensys"
      }]
    },
    {
      name: "PyPSA",
      description: "Python for Power System Analysis - the core framework for simulating and optimising modern power systems",
      image: `${base}/img/projects/pypsa-logo.svg`,
      githubUrl: "https://github.com/PyPSA/PyPSA",
      docsUrl: "https://pypsa.readthedocs.io/",
      institutions: [{
        name: "TU Berlin",
        logo: `${base}/img/institutions/tu-berlin.svg`,
        url: "https://www.tu.berlin/en/ensys"
      }]
    },
    {
      name: "Linopy",
      description: "Linear optimization interface for N-D labeled variables",
      image: `${base}/img/projects/linopy.png`,
      githubUrl: "https://github.com/PyPSA/linopy",
      docsUrl: "https://linopy.readthedocs.io/",
      institutions: [
        {
          name: "OET",
          logo: `${base}/img/institutions/oet.svg`,
          url: "https://openenergytransition.org/"
        },
        {
          name: "TU Berlin",
          logo: `${base}/img/institutions/tu-berlin.svg`,
          url: "https://www.tu.berlin/en/ensys"
        }
      ]
    },
    {
      name: "Powerplantmatching",
      description: "A toolset for cleaning, standardizing and combining multiple power plant databases",
      image: `${base}/img/projects/powerplantmatching.png`,
      githubUrl: "https://github.com/PyPSA/powerplantmatching",
      docsUrl: "https://powerplantmatching.readthedocs.io/",
      institutions: [{
        name: "TU Berlin",
        logo: `${base}/img/institutions/tu-berlin.svg`,
        url: "https://www.tu.berlin/en/ensys"
      }]
    },
    {
      name: "Technology Data",
      description: "Compile assumptions on energy system technologies for various years",
      image: `${base}/img/projects/technology-data.png`,
      githubUrl: "https://github.com/PyPSA/technology-data",
      docsUrl: "https://technology-data.readthedocs.io/en/latest/",
      institutions: [
        {
          name: "OET",
          logo: `${base}/img/institutions/oet.svg`,
          url: "https://openenergytransition.org/"
        },
        {
          name: "TU Berlin",
          logo: `${base}/img/institutions/tu-berlin.svg`,
          url: "https://www.tu.berlin/en/ensys"
        }
      ]
    }
  ];

  const accentColor = "#098754";
  const accentHoverColor = "#076b43";

  let carouselIndex = 0; // Start with Atlite (index 0) on left, PyPSA (index 1) in middle, Linopy (index 2) on right
  let carouselElement: HTMLElement;
  let isScrolling = false;

  // Track window width for responsive behavior
  let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
  let visibleCount = 3;

  function updateWindowSize() {
    if (typeof window === 'undefined') return;
    windowWidth = window.innerWidth;

    // Match Features section breakpoints:
    // 1 col (< 640px), 2 col (640px - 1024px), 3 col (>= 1024px)
    if (windowWidth < 640) {
      visibleCount = 1;
    } else if (windowWidth < 1024) {
      visibleCount = 2;
    } else {
      visibleCount = 3;
    }
  }

  let autoPlayInterval: ReturnType<typeof setInterval> | null = null;
  let autoPlayEnabled = true;

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

  function getVisibleProjects(): ProjectProps[] {

    if (projects.length <= visibleCount) {
      return projects.slice(0, visibleCount);
    }

    const total = projects.length;
    const visible: ProjectProps[] = [];

    for (let i = 0; i < visibleCount; i++) {
      const project = projects[(carouselIndex + i) % total];
      visible.push(project);
    }

    return visible;
  }

  let isTransitioning = true;

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
</script>

<section id="frameworks" class="container py-24 sm:py-32">
  <div>
    <div id="frameworks" class="relative -top-32"></div>
    <h2 class="text-lg text-center mb-2 tracking-wider" style={`color: ${accentColor};`}>
      Ecosystem
    </h2>

    <h2 class="text-3xl md:text-4xl text-center font-bold mb-4">
      Framework and Tools
    </h2>

    <h3 class="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
      PyPSA and its complementary tools for power system modeling
    </h3>

    <div class="relative py-8 overflow-x-hidden overflow-y-visible" bind:this={carouselElement}>
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
    </div>

    {#if projects.length > visibleCount}
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
          aria-label="Previous tool"
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
          aria-label="Next tool"
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
</style>
