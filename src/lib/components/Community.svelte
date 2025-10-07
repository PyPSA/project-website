<script lang="ts">
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
  } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { onMount } from 'svelte';

  import LinkedInIcon from "$lib/icons/LinkedInIcon.svelte";
  import GithubIcon from "$lib/icons/GithubIcon.svelte";
  import XIcon from "$lib/icons/XIcon.svelte";
  import DiscordIcon from "$lib/icons/DiscordIcon.svelte";
  import { BarChart3 } from "lucide-svelte";

  import { contributorsData, dataTimestamp } from "$lib/data/contributors";
  import { browser } from '$app/environment';

  interface TeamProps {
    imageUrl: string;
    firstName: string;
    lastName: string;
    positions: string[];
    socialNetworks: SocialNetworkProps[];
    totalContributions?: number;
    totalMergedPrs?: number;
    totalIssuesCreated?: number;
    topRepos?: string[];
    repoContributions?: Record<string, number>;
    repoPrs?: Record<string, number>;
    repoIssues?: Record<string, number>;
    displayRepoOnly?: boolean;
  }

  interface SocialNetworkProps {
    name: 'LinkedIn' | 'Github' | 'X';
    url: string;
  }

  // Sort contributors by total contributions (descending), but always put Tom Brown first
  const sortedByContributions = [...contributorsData].sort((a, b) => {
    // Always put Tom Brown first
    if (a.firstName === 'Tom' && a.lastName === 'Brown') return -1;
    if (b.firstName === 'Tom' && b.lastName === 'Brown') return 1;

    const aTotal = a.totalContributions || 0;
    const bTotal = b.totalContributions || 0;
    return bTotal - aTotal;
  });

  // Responsive contributors per page
  let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
  let contributorsPerPage = 32; // Default for desktop (8 columns × 4 rows)

  function updateContributorsPerPage() {
    if (typeof window === 'undefined') return;
    windowWidth = window.innerWidth;

    if (windowWidth < 640) {
      // Mobile (1 card): 4 columns × 3 rows
      contributorsPerPage = 12;
    } else if (windowWidth < 1024) {
      // Tablet (2 cards): 6 columns × 4 rows
      contributorsPerPage = 24;
    } else if (windowWidth < 1280) {
      // Small desktop (3 cards): 8 columns × 4 rows
      contributorsPerPage = 32;
    } else {
      // Large desktop (3 cards): 8 columns × 4 rows
      contributorsPerPage = 32;
    }
  }

  // Animation hint state
  let showCursorHint = false;
  let showTooltipHint = false;
  let randomBadgeIndex = Math.floor(Math.random() * 32); // Random card from first 32
  let sectionElement: HTMLElement;
  let hasAnimated = false;

  function startAnimation() {
    if (hasAnimated) return;
    hasAnimated = true;

    // Position the cursor - start from right, move to badge
    setTimeout(() => {
      const badge = document.getElementById(`badge-${randomBadgeIndex}`);
      const grid = document.querySelector('.grid.relative');

      if (badge && grid) {
        const badgeRect = badge.getBoundingClientRect();
        const gridRect = grid.getBoundingClientRect();

        // Calculate position relative to grid - center cursor on badge
        const relativeTop = badgeRect.top - gridRect.top + badgeRect.height / 2 - 12; // -12 to center cursor (24px/2)
        const relativeLeft = badgeRect.left - gridRect.left + badgeRect.width / 2 - 12; // Center horizontally on badge

        // Start cursor off-screen to the right and higher up
        document.documentElement.style.setProperty('--cursor-top', `${relativeTop - 100}px`);
        document.documentElement.style.setProperty('--cursor-left', `calc(100% + 300px)`);

        // Show cursor after position is set
        showCursorHint = true;

        // Then move cursor to the badge
        setTimeout(() => {
          document.documentElement.style.setProperty('--cursor-top', `${relativeTop}px`);
          document.documentElement.style.setProperty('--cursor-left', `${relativeLeft}px`);
        }, 100);
      }
    }, 500);

    // Wait for cursor to move, then show tooltip, then hide everything
    setTimeout(() => {
      showTooltipHint = true;
    }, 2500); // Wait 500ms (initial) + 100ms (delay) + 2000ms (transition) = 2600ms

    setTimeout(() => {
      showCursorHint = false;
      showTooltipHint = false;
    }, 6500);
  }

  // Initialize on mount
  onMount(() => {
    updateContributorsPerPage();
    window.addEventListener('resize', updateContributorsPerPage);

    // Check URL for filter parameter
    if (browser) {
      const urlParams = new URLSearchParams(window.location.search);
      const filterParam = urlParams.get('filter');
      if (filterParam && repoMap[filterParam]) {
        selectedRepo = filterParam;

        // Expand the appropriate category
        const frameworkRepos = ['PyPSA', 'atlite', 'linopy', 'powerplantmatching', 'technology-data'];
        const modelRepos = ['PyPSA-Eur', 'PyPSA-Earth', 'PyPSA-USA', 'PyPSA-DE'];

        if (frameworkRepos.includes(filterParam)) {
          frameworkExpanded = true;
          modelsExpanded = false;
        } else if (modelRepos.includes(filterParam)) {
          modelsExpanded = true;
          frameworkExpanded = false;
        }
      }
    }

    // Set up Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      window.removeEventListener('resize', updateContributorsPerPage);
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  });

  $: totalPages = Math.ceil(teamList.length / contributorsPerPage);

  let currentPage = 0;
  let isTransitioning = false;

  // Filter expansion state
  let frameworkExpanded = false;
  let modelsExpanded = false;
  let selectedRepo = null; // null means "All Projects"

  // Repository mapping - maps display name to repo path in data
  const repoMap = {
    'PyPSA': 'PyPSA/PyPSA',
    'atlite': 'PyPSA/atlite',
    'linopy': 'PyPSA/linopy',
    'powerplantmatching': 'PyPSA/powerplantmatching',
    'technology-data': 'PyPSA/technology-data',
    'PyPSA-Eur': 'PyPSA/pypsa-eur',
    'PyPSA-Earth': 'pypsa-meets-earth/pypsa-earth',
    'PyPSA-USA': 'PyPSA/pypsa-usa',
    'PyPSA-DE': 'PyPSA/pypsa-de'
  };

  function toggleFrameworkExpanded() {
    frameworkExpanded = !frameworkExpanded;
    modelsExpanded = false;
  }

  function toggleModelsExpanded() {
    modelsExpanded = !modelsExpanded;
    frameworkExpanded = false;
  }

  function closeExpanded() {
    frameworkExpanded = false;
    modelsExpanded = false;
  }

  function selectRepo(repoName) {
    selectedRepo = repoName;
    currentPage = 0; // Reset to first page when filtering
    // Don't close the expanded category when selecting a sub-option
  }

  function clearFilter() {
    selectedRepo = null;
    currentPage = 0;
  }

  // Filter and sort contributors based on selected repository
  $: filteredList = selectedRepo
    ? contributorsData
        .filter(c => {
          const repoPath = repoMap[selectedRepo];
          return c.repoContributions && c.repoContributions[repoPath] > 0;
        })
        .map(c => {
          const repoPath = repoMap[selectedRepo];
          const repoContribs = c.repoContributions[repoPath] || 0;
          const repoPrs = c.repoPrs?.[repoPath] || 0;
          const repoIssues = c.repoIssues?.[repoPath] || 0;
          return {
            ...c,
            // Override stats with repo-specific data
            totalContributions: repoContribs,
            totalMergedPrs: repoPrs,
            totalIssuesCreated: repoIssues,
            displayRepoOnly: true
          };
        })
        .sort((a, b) => {
          // Keep Tom Brown first for PyPSA repository only
          if (selectedRepo === 'PyPSA') {
            if (a.firstName === 'Tom' && a.lastName === 'Brown') return -1;
            if (b.firstName === 'Tom' && b.lastName === 'Brown') return 1;
          }
          // Otherwise sort by contributions
          return b.totalContributions - a.totalContributions;
        })
    : sortedByContributions;

  $: teamList = filteredList;

  $: currentContributors = teamList.slice(
    currentPage * contributorsPerPage,
    (currentPage + 1) * contributorsPerPage
  );

  function nextPage() {
    if (isTransitioning) return;
    isTransitioning = true;
    setTimeout(() => {
      currentPage = (currentPage + 1) % totalPages;
      isTransitioning = false;
    }, 50);
  }

  function prevPage() {
    if (isTransitioning) return;
    isTransitioning = true;
    setTimeout(() => {
      currentPage = (currentPage - 1 + totalPages) % totalPages;
      isTransitioning = false;
    }, 50);
  }

  const socialIconMap = {
    LinkedIn: LinkedInIcon,
    Github: GithubIcon,
    X: XIcon,
  };
</script>

<!-- Contributors Section -->
<Tooltip.Provider>
<section id="team" class="container max-w-7xl mx-auto px-4 pt-16 pb-4 sm:pt-24 sm:pb-6 lg:pt-32 lg:pb-8" bind:this={sectionElement}>
  <div class="text-center mb-12">
    <h2 class="text-lg text-primary text-center mb-3 tracking-wider">Contributors</h2>

    <h2 class="text-3xl md:text-4xl text-center font-bold">
      Community
    </h2>

    <p class="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mt-2">
      The people who power PyPSA
    </p>

    <!-- Filter selector -->
    <div class="flex justify-center mt-6">
      <div class="flex items-center gap-2 px-2 py-1 flex-wrap">
        {#if !frameworkExpanded && !modelsExpanded}
          <button
            type="button"
            on:click={clearFilter}
            class="px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border-2 {selectedRepo === null ? 'bg-primary text-primary-foreground border-primary' : 'border-border/50 hover:border-primary hover:bg-primary/10 hover:text-primary'}"
            aria-label="Show all contributors"
          >
            All Projects
          </button>
        {/if}

        <!-- Framework category -->
        {#if !modelsExpanded}
          <button
            type="button"
            on:click={toggleFrameworkExpanded}
            class="px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border-2 {frameworkExpanded ? 'border-[#098754] bg-[#098754]/10 text-[#098754]' : 'border-border/50 hover:border-[#098754] hover:bg-[#098754]/10 hover:text-[#098754]'}"
            style="transition: all 0.2s ease;"
            aria-label="Framework category"
          >
            Framework {frameworkExpanded ? '▴' : '▾'}
          </button>
        {/if}

        <!-- Framework sub-options (expanding inline) -->
        {#if frameworkExpanded}
          <button
            type="button"
            on:click={() => selectRepo('PyPSA')}
            class="px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border border-[#098754]/50 hover:bg-[#098754]/10 hover:text-[#098754] animate-in fade-in slide-in-from-left-2 duration-200 {selectedRepo === 'PyPSA' ? 'bg-[#098754]/20' : ''}"
            aria-label="Filter by PyPSA"
          >
            PyPSA
          </button>
          <button
            type="button"
            on:click={() => selectRepo('atlite')}
            class="px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border border-[#098754]/50 hover:bg-[#098754]/10 hover:text-[#098754] animate-in fade-in slide-in-from-left-2 duration-200 {selectedRepo === 'atlite' ? 'bg-[#098754]/20' : ''}"
            style="animation-delay: 50ms;"
            aria-label="Filter by atlite"
          >
            atlite
          </button>
          <button
            type="button"
            on:click={() => selectRepo('linopy')}
            class="px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border border-[#098754]/50 hover:bg-[#098754]/10 hover:text-[#098754] animate-in fade-in slide-in-from-left-2 duration-200 {selectedRepo === 'linopy' ? 'bg-[#098754]/20' : ''}"
            style="animation-delay: 100ms;"
            aria-label="Filter by linopy"
          >
            linopy
          </button>
          <button
            type="button"
            on:click={() => selectRepo('powerplantmatching')}
            class="px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border border-[#098754]/50 hover:bg-[#098754]/10 hover:text-[#098754] animate-in fade-in slide-in-from-left-2 duration-200 {selectedRepo === 'powerplantmatching' ? 'bg-[#098754]/20' : ''}"
            style="animation-delay: 150ms;"
            aria-label="Filter by powerplantmatching"
          >
            powerplantmatching
          </button>
          <button
            type="button"
            on:click={() => selectRepo('technology-data')}
            class="px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border border-[#098754]/50 hover:bg-[#098754]/10 hover:text-[#098754] animate-in fade-in slide-in-from-left-2 duration-200 {selectedRepo === 'technology-data' ? 'bg-[#098754]/20' : ''}"
            style="animation-delay: 200ms;"
            aria-label="Filter by technology-data"
          >
            technology-data
          </button>
        {/if}

        <!-- Models category -->
        {#if !frameworkExpanded}
          <button
            type="button"
            on:click={toggleModelsExpanded}
            class="px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border-2 {modelsExpanded ? 'border-[#2993B5] bg-[#2993B5]/10 text-[#2993B5]' : 'border-border/50 hover:border-[#2993B5] hover:bg-[#2993B5]/10 hover:text-[#2993B5]'}"
            style="transition: all 0.2s ease;"
            aria-label="Models category"
          >
            Models {modelsExpanded ? '▴' : '▾'}
          </button>
        {/if}

        <!-- Models sub-options (expanding inline) -->
        {#if modelsExpanded}
          <button
            type="button"
            on:click={() => selectRepo('PyPSA-Eur')}
            class="px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border border-[#2993B5]/50 hover:bg-[#2993B5]/10 hover:text-[#2993B5] animate-in fade-in slide-in-from-left-2 duration-200 {selectedRepo === 'PyPSA-Eur' ? 'bg-[#2993B5]/20' : ''}"
            aria-label="Filter by PyPSA-Eur"
          >
            PyPSA-Eur
          </button>
          <button
            type="button"
            on:click={() => selectRepo('PyPSA-Earth')}
            class="px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border border-[#2993B5]/50 hover:bg-[#2993B5]/10 hover:text-[#2993B5] animate-in fade-in slide-in-from-left-2 duration-200 {selectedRepo === 'PyPSA-Earth' ? 'bg-[#2993B5]/20' : ''}"
            style="animation-delay: 50ms;"
            aria-label="Filter by PyPSA-Earth"
          >
            PyPSA-Earth
          </button>
          <button
            type="button"
            on:click={() => selectRepo('PyPSA-USA')}
            class="px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border border-[#2993B5]/50 hover:bg-[#2993B5]/10 hover:text-[#2993B5] animate-in fade-in slide-in-from-left-2 duration-200 {selectedRepo === 'PyPSA-USA' ? 'bg-[#2993B5]/20' : ''}"
            style="animation-delay: 100ms;"
            aria-label="Filter by PyPSA-USA"
          >
            PyPSA-USA
          </button>
          <button
            type="button"
            on:click={() => selectRepo('PyPSA-DE')}
            class="px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border border-[#2993B5]/50 hover:bg-[#2993B5]/10 hover:text-[#2993B5] animate-in fade-in slide-in-from-left-2 duration-200 {selectedRepo === 'PyPSA-DE' ? 'bg-[#2993B5]/20' : ''}"
            style="animation-delay: 150ms;"
            aria-label="Filter by PyPSA-DE"
          >
            PyPSA-DE
          </button>
        {/if}
      </div>
    </div>
  </div>

  <div class="relative py-4" style="position: relative;">
    <!-- Contributors grid -->
    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8 gap-3 md:gap-4 justify-center relative">
      {#key currentPage}
        {#each currentContributors as { imageUrl, firstName, lastName, positions, socialNetworks, totalContributions, totalMergedPrs, totalIssuesCreated, topRepos }, index}
          {@const delay = index * 50}
        <div class="carousel-item relative group/card isolate hover:z-[60] {index === randomBadgeIndex && showTooltipHint ? 'z-[60]' : ''}" style="animation-delay: {delay}ms">
        <a
          href={socialNetworks[0]?.url}
          target="_blank"
          class="block h-full relative z-0 group-hover/card:z-[60]"
          aria-label="Visit {firstName} {lastName}'s GitHub profile"
        >
          <Card class="bg-muted/60 dark:bg-card flex flex-col h-full group/hoverimg cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:-translate-y-1 relative rounded-lg">
            <CardHeader class="p-0 gap-0">
              <div class="h-full overflow-hidden rounded-t-lg">
                <img
                  src={imageUrl}
                  alt={`${firstName} {lastName}`}
                  class="w-full aspect-square object-cover saturate-0 transition-all duration-300 ease-in-out group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-110"
                />
              </div>
              <CardTitle class="px-3 py-2 text-sm flex items-center justify-between min-h-[3rem]">
                <span class="leading-tight" class:text-xs={(firstName + ' ' + lastName).length > 20}>
                  {firstName}
                  <span class="text-primary">{lastName}</span>
                </span>
                {#if totalContributions}
                  <Tooltip.Root open={index === randomBadgeIndex && showTooltipHint ? true : undefined} disableHoverableContent={index === randomBadgeIndex && showTooltipHint}>
                    <Tooltip.Trigger
                      class="ml-2 inline-flex items-center justify-center text-primary cursor-help transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-full p-1 info-badge-trigger"
                      id={`badge-${index}`}
                      aria-label={`${totalContributions} total contributions`}
                    >
                      <span class="relative inline-flex items-center justify-center w-6 h-6 flex-none">
                        <span class="absolute inline-flex h-full w-full items-center justify-center hover-ping" aria-hidden="true">
                          <BarChart3 class="w-4 h-4" aria-hidden="true" />
                        </span>
                        <BarChart3 class="w-4 h-4 relative z-10 transition-colors duration-300" aria-hidden="true" />
                      </span>
                      <span class="sr-only">{totalContributions} total contributions</span>
                    </Tooltip.Trigger>
                    <Tooltip.Content class="bg-popover text-popover-foreground border shadow-md !z-[9999]" sideOffset={5}>
                      <div class="flex flex-col gap-2 text-xs p-1">
                        {#if selectedRepo}
                          <!-- Show repo-specific contributions when filtered -->
                          {#if totalMergedPrs}
                            <div class="flex items-center gap-2">
                              <span class="font-semibold text-primary">{totalMergedPrs}</span>
                              <span>merged PRs</span>
                            </div>
                          {/if}
                          {#if totalIssuesCreated}
                            <div class="flex items-center gap-2">
                              <span class="font-semibold text-primary">{totalIssuesCreated}</span>
                              <span>issues & discussions</span>
                            </div>
                          {/if}
                        {:else}
                          <!-- Show total stats when not filtered -->
                          {#if totalMergedPrs}
                            <div class="flex items-center gap-2">
                              <span class="font-semibold text-primary">{totalMergedPrs}</span>
                              <span>merged PRs</span>
                            </div>
                          {/if}
                          {#if totalIssuesCreated}
                            <div class="flex items-center gap-2">
                              <span class="font-semibold text-primary">{totalIssuesCreated}</span>
                              <span>issues & discussions</span>
                            </div>
                          {/if}
                        {/if}
                        {#if topRepos && topRepos.length > 0 && !selectedRepo}
                          {@const filtered = topRepos.filter(repo => !repo.includes('[bot]') && repo !== 'pypsa-ariadne-batch')}
                          {@const hasDE = filtered.includes('pypsa-de')}
                          {@const filteredRepos = filtered.map(repo => repo === 'pypsa-ariadne' && !hasDE ? 'pypsa-de' : repo).filter(repo => repo !== 'pypsa-ariadne')}
                          {@const isTomBrown = firstName === 'Tom' && lastName === 'Brown'}
                          {@const reposToShow = isTomBrown && !filteredRepos.includes('PyPSA') ? ['PyPSA', ...filteredRepos] : filteredRepos}
                          {#if reposToShow.length > 0}
                            <div class="flex flex-wrap gap-1 mt-1 pt-2 border-t border-border">
                              {#each reposToShow as repo}
                                {@const displayName =
                                  repo === 'pypsa' ? 'PyPSA' :
                                  repo === 'pypsa-eur' ? 'PyPSA-Eur' :
                                  repo === 'pypsa-de' ? 'PyPSA-DE' :
                                  repo === 'pypsa-earth' ? 'PyPSA-Earth' :
                                  repo === 'pypsa-usa' ? 'PyPSA-USA' :
                                  repo === 'pypsa-ariadne' ? 'PyPSA-Ariadne' :
                                  repo === 'pypsa-eur-sec' ? 'PyPSA-Eur-Sec' :
                                  repo === 'pypsa-earth-sec' ? 'PyPSA-Earth-Sec' :
                                  repo === 'pypsa-asean' ? 'PyPSA-ASEAN' :
                                  repo
                                }
                                {@const isFrameworkRepo = ['PyPSA', 'atlite', 'linopy', 'powerplantmatching', 'technology-data'].includes(repo)}
                                {@const isModelRepo = ['pypsa-eur', 'pypsa-usa', 'pypsa-earth', 'pypsa-de', 'pypsa-ariadne', 'pypsa-eur-sec', 'pypsa-earth-sec', 'pypsa-asean'].includes(repo)}
                                {@const meetsEarthRepos = ['pypsa-earth', 'pypsa-earth-sec', 'pypsa-asean']}
                                {@const org = meetsEarthRepos.includes(repo) ? 'pypsa-meets-earth' : 'PyPSA'}
                                <a
                                  href="https://github.com/{org}/{repo}"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class="px-2 py-0.5 rounded text-xs font-medium hover:opacity-80 transition-opacity"
                                  style={isFrameworkRepo ? 'background-color: rgba(9, 135, 84, 0.2); color: #098754;' : isModelRepo ? 'background-color: rgba(41, 147, 181, 0.2); color: #2993B5;' : 'background-color: rgba(255, 192, 0, 0.2); color: #FFC000;'}
                                  on:click|stopPropagation
                                >
                                  {displayName}
                                </a>
                              {/each}
                            </div>
                          {/if}
                        {/if}
                      </div>
                    </Tooltip.Content>
                  </Tooltip.Root>
                {/if}
              </CardTitle>
            </CardHeader>
          </Card>
        </a>
        </div>
      {/each}

      <!-- Floating cursor hint - positioned relative to grid -->
      {#if showCursorHint}
        <svg
          class="floating-cursor pointer-events-none"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M6.3 2.84A1 1 0 0 0 5 3.5v13a1 1 0 0 0 1.74.68l3.14-3.48 1.65 4.62a1 1 0 0 0 1.88-.26l.01-.03 2.46-8.17 1.45-.52a1 1 0 0 0 .12-1.8l-.04-.02-11-5a1 1 0 0 0-.91.04z"/>
        </svg>
      {/if}
      {/key}
    </div>

    <!-- Navigation arrows -->
    <div class="flex justify-center mt-6 gap-4">
      <button
        on:click={prevPage}
        class="p-2 rounded-full bg-background border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
        disabled={totalPages <= 1}
        aria-label="Previous page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>

      <span class="flex items-center text-sm text-muted-foreground px-4">
        Page {currentPage + 1} of {totalPages}
      </span>

      <button
        on:click={nextPage}
        class="p-2 rounded-full bg-background border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
        disabled={totalPages <= 1}
        aria-label="Next page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </button>
    </div>

    <!-- Timestamp -->
    <div class="text-center mt-4 max-w-3xl mx-auto">
      <p class="text-xs text-muted-foreground">
        {#if dataTimestamp}
          Last updated: {new Date(dataTimestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        {/if}
      </p>
    </div>
  </div>
</section>
</Tooltip.Provider>

<!-- Discord Section -->
<section id="community" class="container py-4 sm:py-6 lg:py-8">
    <div class="lg:w-[60%] mx-auto">
      <Card class="bg-background shadow-none text-center flex flex-col items-center justify-center border-0">
        <CardHeader>
          <CardTitle class="text-4xl md:text-5xl font-bold">
            <DiscordIcon class="w-20 h-20 m-auto mb-4" />
            Ready to join our
            <span class="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
              Community?
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent class="lg:w-[80%] text-lg text-muted-foreground">
          Connect with other PyPSA users, developers, and researchers.
          Get help, share ideas, and stay updated on the latest developments.
        </CardContent>

        <CardFooter>
          <Button href="https://discord.gg/AnuJBk23FU" target="_blank" rel="noreferrer" size="lg" class="text-base">
            <DiscordIcon class="w-5 h-5" />
            Join Discord Server
          </Button>
        </CardFooter>
      </Card>
    </div>
</section>

<style>
  @keyframes staggerIn {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes moveToBadge {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }

  :global(.carousel-item) {
    animation: staggerIn 0.6s ease-out forwards;
    opacity: 0;
  }

  .floating-cursor {
    position: absolute;
    width: 24px;
    height: 24px;
    color: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    transition: top 2s ease-out, left 2s ease-out, opacity 0.3s ease-out;
    will-change: top, left;
    top: var(--cursor-top, 50%);
    left: var(--cursor-left, 50%);
  }

  :global(body) {
    overflow-x: clip;
  }

  :global(.dark) .floating-cursor {
    color: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 1279px) {
    .floating-cursor {
      display: none;
    }
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  :global(.info-badge-trigger) {
    position: relative;
  }

  :global(.info-badge-trigger .hover-ping) {
    opacity: 0;
    color: inherit;
    pointer-events: none;
    will-change: transform, opacity;
  }

  :global(.info-badge-trigger:hover .hover-ping),
  :global(.info-badge-trigger:focus-visible .hover-ping) {
    opacity: 0.9;
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  @keyframes ping {
    0% {
      transform: scale(1);
      opacity: 0.75;
    }
    75%,
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }

</style>