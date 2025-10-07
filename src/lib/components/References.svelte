<script lang="ts">
  import { Card, CardContent } from "$lib/components/ui/card";
  import { onMount } from 'svelte';
  import { referencesData, dataTimestamp } from "$lib/data/references";

  interface Publication {
    title: string;
    authors: string;
    year: number;
    citations: number;
    link: string;
    snippet: string;
  }

  type SortMode = 'citations' | 'latest';
  let sortMode: SortMode = 'citations';

  // Sort publications based on selected mode
  $: sortedPublications = [...referencesData].sort((a, b) => {
    if (sortMode === 'citations') {
      return b.citations - a.citations;
    } else {
      // Sort by year (latest first)
      return b.year - a.year;
    }
  });

  const publications: Publication[] = referencesData;

  // Responsive publications per page
  let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
  let publicationsPerPage = 5; // Default for desktop

  function updatePublicationsPerPage() {
    if (typeof window === 'undefined') return;
    windowWidth = window.innerWidth;

    if (windowWidth < 640) {
      // Mobile (1 card): 3 publications per page
      publicationsPerPage = 3;
    } else if (windowWidth < 1024) {
      // Tablet (2 cards): 4 publications per page
      publicationsPerPage = 4;
    } else {
      // Desktop (3 cards): 5 publications per page
      publicationsPerPage = 5;
    }
  }

  // Initialize on mount
  onMount(() => {
    updatePublicationsPerPage();
    window.addEventListener('resize', updatePublicationsPerPage);
    return () => window.removeEventListener('resize', updatePublicationsPerPage);
  });

  $: totalPages = Math.ceil(sortedPublications.length / publicationsPerPage);

  let currentPage = 0;

  // Reset to first page if current page exceeds new total pages or sort mode changes
  $: if (currentPage >= totalPages && totalPages > 0) {
    currentPage = 0;
  }
  $: if (sortMode) {
    currentPage = 0;
  }

  $: currentPublications = sortedPublications.slice(
    currentPage * publicationsPerPage,
    (currentPage + 1) * publicationsPerPage
  );

  function nextPage() {
    currentPage = (currentPage + 1) % totalPages;
  }

  function prevPage() {
    currentPage = (currentPage - 1 + totalPages) % totalPages;
  }
</script>

<section id="references" class="container max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-32">
  <div class="text-center mb-12">
    <h2 class="text-lg text-center mb-3 tracking-wider" style="color: #098754;">References</h2>

    <h2 class="text-3xl md:text-4xl text-center font-bold">
      Related Research
    </h2>

    <p class="text-muted-foreground mt-4 max-w-3xl mx-auto">
      Numerous research publications are built on the PyPSA environment. Here we highlight some of them.
      For an extended list, have a look at the up-to-date
      <a href="https://scholar.google.com/scholar?q=pypsa" target="_blank" rel="noreferrer" class="hover:underline" style="color: #098754;">
        Google Scholar query
      </a>.
    </p>
  </div>

  <div class="relative">
    <!-- Sort buttons -->
    <div class="flex justify-center mb-6 gap-2">
      <button
        on:click={() => sortMode = 'citations'}
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all border"
        class:bg-primary={sortMode === 'citations'}
        class:text-primary-foreground={sortMode === 'citations'}
        class:border-primary={sortMode === 'citations'}
        class:bg-background={sortMode !== 'citations'}
        class:border-border={sortMode !== 'citations'}
        style={sortMode === 'citations' ? 'background-color: #098754; border-color: #098754;' : ''}
        on:mouseenter={(e) => {
          if (sortMode !== 'citations') {
            e.currentTarget.style.borderColor = '#098754';
            e.currentTarget.style.color = '#098754';
          }
        }}
        on:mouseleave={(e) => {
          if (sortMode !== 'citations') {
            e.currentTarget.style.borderColor = '';
            e.currentTarget.style.color = '';
          }
        }}
      >
        Most Cited
      </button>
      <button
        on:click={() => sortMode = 'latest'}
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all border"
        class:bg-primary={sortMode === 'latest'}
        class:text-primary-foreground={sortMode === 'latest'}
        class:border-primary={sortMode === 'latest'}
        class:bg-background={sortMode !== 'latest'}
        class:border-border={sortMode !== 'latest'}
        style={sortMode === 'latest' ? 'background-color: #098754; border-color: #098754;' : ''}
        on:mouseenter={(e) => {
          if (sortMode !== 'latest') {
            e.currentTarget.style.borderColor = '#098754';
            e.currentTarget.style.color = '#098754';
          }
        }}
        on:mouseleave={(e) => {
          if (sortMode !== 'latest') {
            e.currentTarget.style.borderColor = '';
            e.currentTarget.style.color = '';
          }
        }}
      >
        Latest
      </button>
    </div>

    <!-- Publications list -->
    <div class="space-y-3 max-w-5xl mx-auto">
      {#key currentPage}
        {#each currentPublications as pub, index}
          {@const delay = index * 100}
        <Card class="hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 carousel-item" style="animation-delay: {delay}ms">
          <CardContent class="p-4">
            <div class="flex items-start gap-4">
              <span class="text-lg font-bold text-muted-foreground/50 mt-0.5 min-w-[2rem]">
                {String(currentPage * publicationsPerPage + index + 1).padStart(2, '0')}
              </span>
              <div class="flex-1">
                {#if pub.link}
                  <a href={pub.link} target="_blank" rel="noreferrer" class="text-foreground transition-colors"
                     on:mouseenter={(e) => e.target.style.color = '#098754'}
                     on:mouseleave={(e) => e.target.style.color = ''}>
                    <h3 class="font-semibold text-sm mb-1.5 hover:underline">
                      {pub.title}
                    </h3>
                  </a>
                {:else}
                  <h3 class="font-semibold text-sm mb-1.5">
                    {pub.title}
                  </h3>
                {/if}
                <p class="text-xs text-muted-foreground mb-1">
                  {pub.authors}
                </p>
                <p class="text-xs text-muted-foreground">
                  {pub.year} · {pub.citations} citations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/each}
      {/key}
    </div>

    <!-- Navigation arrows -->
    {#if totalPages > 1}
      <div class="flex justify-center mt-6 gap-4">
        <button
          on:click={prevPage}
          class="p-2 rounded-full bg-background border border-border hover:text-white transition-colors"
          on:mouseenter={(e) => e.target.style.backgroundColor = '#098754'}
          on:mouseleave={(e) => e.target.style.backgroundColor = ''}
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
          class="p-2 rounded-full bg-background border border-border hover:text-white transition-colors"
          on:mouseenter={(e) => e.target.style.backgroundColor = '#098754'}
          on:mouseleave={(e) => e.target.style.backgroundColor = ''}
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
    {/if}

    <!-- Timestamp -->
    <div class="text-center mt-6 max-w-3xl mx-auto">
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