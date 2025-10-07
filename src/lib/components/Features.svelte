<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { onMount } from 'svelte';
  import { DOCS_BASE_URL } from '$lib/config';
  import MdiIcon from '$lib/components/MdiIcon.svelte';
  import {
    mdiPowerPlugBatteryOutline,
    mdiTransmissionTower,
    mdiSecurity,
    mdiCrane,
    mdiRoad,
    mdiRollerblade,
    mdiCrosshairsQuestion,
    mdiDiversify,
    mdiBankOutline,
    mdiScrewdriver,
    mdiDotsSquare,
    mdiHeatPump,
    mdiLightbulb,
    mdiViewModule,
    mdiCarCruiseControl,
    mdiGridLarge,
    mdiDataMatrix,
    mdiRunFast,
    mdiNotebook,
    mdiLockOpen
  } from '@mdi/js';
  import {
    Battery,
    PlugZap,
    Zap,
    Shield,
    Building,
    Route,
    RotateCcw,
    TrendingUp,
    Search,
    BookOpen,
    ArrowRight,
    ArrowLeft,
    Settings,
    Wrench,
    Grid3X3,
    Thermometer,
    Lightbulb,
    Network,
    Activity,
    Layers,
    Settings2,
    Database,
    Gauge,
    BarChart3,
    Brush,
    Users,
    UsersRound,
    Lock,
    DollarSign,
    Sheet,
    Paintbrush,
    CircleDollarSign,
  } from "lucide-svelte";

  interface FeaturesProps {
    icon: 'battery' | 'mdiPowerPlugBattery' | 'mdiTransmissionTower' | 'mdiSecurity' | 'mdiCrane' | 'mdiRoad' | 'mdiRollerblade' | 'mdiCrosshairsQuestion' | 'mdiDiversify' | 'mdiBuildingColumns' | 'mdiScrewdriver' | 'mdiDotsSquare' | 'mdiHeatPump' | 'mdiLightbulb' | 'mdiTransmissionTowerApp' | 'mdiViewModule' | 'mdiCarCruiseControl' | 'mdiGridLarge' | 'mdiDataMatrix' | 'mdiRunFast' | 'mdiNotebook' | 'mdiLockOpen' | 'simpleGraphql' | 'simpleShadow' | 'simpleGoogleSheets' | 'octiconsPaintbrush' | 'peopleGroup' | 'plugZap' | 'zap' | 'shield' | 'building' | 'route' | 'rotateCcw' | 'trendingUp' | 'trendingUpArrow' | 'search' | 'bookOpen' | 'settings' | 'wrench' | 'grid3X3' | 'thermometer' | 'lightbulb' | 'network' | 'activity' | 'layers' | 'settings2' | 'database' | 'gauge' | 'barChart3' | 'brush' | 'users' | 'lock' | 'dollarSign';
    title: string;
    description: string;
    link?: string;
    docsUrl?: string;
  }

  let activeTab = 'optimization';

  const featureCategories = {
    optimization: [
      {
        icon: "mdiPowerPlugBattery",
        title: "Economic Dispatch (ED)",
        description:
          "Model short-term market dispatch with unit commitment, renewables, storage, multi-carrier conversion, and more.",
        docsUrl: `${DOCS_BASE_URL}/examples/example-1/`,
      },
      {
        icon: "mdiTransmissionTower",
        title: "Linear Optimal Power Flow (LOPF)",
        description:
          "Optimize power flow in AC-DC networks using linearized KVL/KCL constraints with optional loss approximations.",
        docsUrl: `${DOCS_BASE_URL}/user-guide/linear-power-flow/`,
      },
      {
        icon: "mdiSecurity",
        title: "Security-Constrained LOPF (SCLOPF)",
        description:
          "Ensure system reliability by accounting for line outage contingencies under N-1 conditions.",
        docsUrl: `${DOCS_BASE_URL}/examples/scigrid-sclopf/`,
      },
      {
        icon: "mdiCrane",
        title: "Capacity Expansion Planning (CEP)",
        description:
          "Plan long-term infrastructure investments for generation, storage, transmission, and conversion with continuous or discrete options.",
        docsUrl: `${DOCS_BASE_URL}/examples/capacity-expansion-planning-single-node/`,
      },
      {
        icon: "mdiRoad",
        title: "Pathway Planning",
        description:
          "Co-optimize multi-period investments to design energy transition pathways with perfect foresight planning.",
        docsUrl: `${DOCS_BASE_URL}/user-guide/optimization/pathway-planning/`,
      },
      {
        icon: "mdiRollerblade",
        title: "Rolling-Horizon Optimisation",
        description:
          "Solve large-scale problems sequentially with myopic foresight and dynamic updates across time horizons.",
        docsUrl: `${DOCS_BASE_URL}/examples/rolling-horizon/`,
      },
      {
        icon: "mdiCrosshairsQuestion",
        title: "Stochastic Optimisation",
        description:
          "Two-stage stochastic programming for uncertainty handling with weighted scenarios and separate investment-dispatch decisions.",
        docsUrl: `${DOCS_BASE_URL}/user-guide/optimization/stochastic/`,
      },
      {
        icon: "mdiDiversify",
        title: "Modelling-to-Generate-Alternatives (MGA)",
        description:
          "Explore alternative system designs with similar costs to understand trade-offs and decision flexibility.",
        docsUrl: `${DOCS_BASE_URL}/user-guide/optimization/modelling-to-generate-alternatives/`,
      },
      {
        icon: "mdiBuildingColumns",
        title: "Policy Constraints",
        description:
          "Built-in support for CO₂ limits, subsidies, resource limits, expansion limits, and growth constraints.",
        docsUrl: `${DOCS_BASE_URL}/user-guide/optimization/global-constraints/`,
      },
      {
        icon: "mdiScrewdriver",
        title: "Custom Constraints",
        description:
          "Impose custom objectives, variables and constraints using Linopy for specialized requirements.",
        docsUrl: `${DOCS_BASE_URL}/user-guide/optimization/custom-constraints/`,
      },
      {
        icon: "mdiDotsSquare",
        title: "Solver Flexibility",
        description:
          "Support for wide range of LP, MILP, and QP solvers from open-source to commercial solutions.",
        docsUrl: `${DOCS_BASE_URL}/home/installation/#solvers`,
      },
    ],
    applications: [
      {
        icon: "mdiHeatPump",
        title: "Sector-Coupling",
        description:
          "Model integrated multi-carrier energy systems with heat pumps, electrolysers, EVs, and synthetic fuels.",
        docsUrl: `${DOCS_BASE_URL}/examples/sector-coupling-single-node/`,
      },
      {
        icon: "mdiTransmissionTowerApp",
        title: "Standard Grid Components",
        description:
          "Includes standard types for lines and transformers from pandapower for realistic grid modeling.",
        docsUrl: `${DOCS_BASE_URL}/user-guide/design/#network-components`,
      },
      {
        icon: "simpleGraphql",
        title: "Static Power Flow Analysis",
        description:
          "Compute non-linear and linearised load flows for AC-DC grids using Newton-Raphson method.",
        docsUrl: `${DOCS_BASE_URL}/examples/minimal-example-pf/?h=power+flow`,
      },
      {
        icon: "mdiLightbulb",
        title: "Diverse Applications",
        description:
          "Support strategic energy analyses from technology assessment to decarbonisation pathway planning.",
        docsUrl: `${DOCS_BASE_URL}/examples/examples/`,
      },
    ],
    performance: [
      {
        icon: "mdiViewModule",
        title: "Modular Design",
        description:
          "Clean separation between data and modeling code enables flexible scenario development.",
      },
      {
        icon: "mdiCarCruiseControl",
        title: "Resolution Control",
        description:
          "Flexible control over temporal, spatial, and sectoral scope and detail for any analysis needs.",
      },
      {
        icon: "mdiGridLarge",
        title: "Spatial Clustering",
        description:
          "Reduce model size for large networks via spatial aggregation strategies and network simplification.",
        docsUrl: `${DOCS_BASE_URL}/user-guide/clustering/`,
      },
      {
        icon: "mdiDataMatrix",
        title: "Data Backbone",
        description:
          "Uses pandas for data handling and linopy for optimization with efficient solver interfacing.",
      },
      {
        icon: "mdiRunFast",
        title: "Performance",
        description:
          "Designed to scale with high-resolution networks, minimizing memory usage and solver overhead.",
        docsUrl: "https://linopy.readthedocs.io/en/latest/benchmark.html",
      },
      {
        icon: "trendingUpArrow",
        title: "Scalability",
        description:
          "Handle models from small prototypes to continent-scale systems on high-performance clusters.",
      },
    ],
    analysis: [
      {
        icon: "simpleShadow",
        title: "Shadow Prices",
        description:
          "Output dual values including nodal prices, storage values, scarcity and CO₂ pricing.",
      },
      {
        icon: "simpleGoogleSheets",
        title: "Statistics",
        description:
          "Built-in tools for energy balances, capacities, costs, market values, and component revenues.",
        docsUrl: `${DOCS_BASE_URL}/user-guide/statistics/`,
      },
      {
        icon: "octiconsPaintbrush",
        title: "Visualisations",
        description:
          "Plot statistics, time series, spatial distributions of line loadings and dispatch decisions.",
        docsUrl: `${DOCS_BASE_URL}/user-guide/plotting/charts/`,
      },
      {
        icon: "mdiNotebook",
        title: "Documentation",
        description:
          "Comprehensive user guide, API reference, and plenty of examples are available.",
      },
      {
        icon: "peopleGroup",
        title: "Community Support",
        description:
          "Active community on GitHub and Discord for user support and development discussions.",
        docsUrl: `${DOCS_BASE_URL}/user-guide/support/`,
      },
      {
        icon: "mdiLockOpen",
        title: "MIT License",
        description:
          "Fully open-source and free for commercial and academic use with no restrictions.",
        docsUrl: `${DOCS_BASE_URL}/home/license/`,
      },
    ],
  };

  const tabs = [
    { id: 'optimization', label: 'Optimization', count: featureCategories.optimization.length },
    { id: 'applications', label: 'Applications', count: featureCategories.applications.length },
    { id: 'analysis', label: 'Analysis', count: featureCategories.analysis.length },
    { id: 'performance', label: 'Performance', count: featureCategories.performance.length },
  ];

  $: currentFeatures = featureCategories[activeTab] || [];

  // Carousel logic with responsive items per page
  let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
  let currentPage = 0;
  let featuresPerPage = 12;

  function updateWindowSize() {
    if (typeof window === 'undefined') return;
    windowWidth = window.innerWidth;

    // Determine features per page based on breakpoints
    // 1 col (< 640px): max 2 rows = 2 items
    // 2 col (640px - 1024px): max 3 rows = 6 items
    // 4 col (>= 1024px): max 4 rows = 16 items
    if (windowWidth < 640) {
      featuresPerPage = 2;
    } else if (windowWidth < 1024) {
      featuresPerPage = 6;
    } else {
      featuresPerPage = 16;
    }

    // Reset to first page when switching tabs or screen size
    if (currentPage > 0) {
      currentPage = 0;
    }
  }

  onMount(() => {
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  });

  $: totalPages = Math.ceil(currentFeatures.length / featuresPerPage);

  $: displayedFeatures = currentFeatures.slice(
    currentPage * featuresPerPage,
    (currentPage + 1) * featuresPerPage
  );

  function nextPage() {
    currentPage = (currentPage + 1) % totalPages;
  }

  function prevPage() {
    currentPage = (currentPage - 1 + totalPages) % totalPages;
  }

  // Reset page when switching tabs
  $: if (activeTab) {
    currentPage = 0;
  }

  const iconMap = {
    battery: Battery,
    plugZap: PlugZap,
    zap: Zap,
    shield: Shield,
    building: Building,
    route: Route,
    rotateCcw: RotateCcw,
    trendingUp: TrendingUp,
    trendingUpArrow: TrendingUp, // Using TrendingUp for scalability
    search: Search,
    bookOpen: BookOpen,
    settings: Settings,
    wrench: Wrench,
    grid3X3: Grid3X3,
    thermometer: Thermometer,
    lightbulb: Lightbulb,
    network: Network,
    simpleGraphql: Network, // Using Network as placeholder for GraphQL icon
    simpleShadow: CircleDollarSign, // Using CircleDollarSign for shadow prices
    simpleGoogleSheets: Sheet, // Using Sheet for statistics
    octiconsPaintbrush: Paintbrush, // Using Paintbrush for visualisations
    peopleGroup: UsersRound, // Using UsersRound for community
    activity: Activity,
    layers: Layers,
    settings2: Settings2,
    database: Database,
    gauge: Gauge,
    barChart3: BarChart3,
    brush: Brush,
    users: Users,
    lock: Lock,
    dollarSign: DollarSign,
  };
</script>

<section id="features" class="container py-24 sm:py-32">
  <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
    Features
  </h2>

  <h2 class="text-3xl md:text-4xl text-center font-bold mb-4">
    PyPSA Framework
  </h2>

  <h3 class="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
    An open-source Python framework for optimising modern power systems with conventional generators, renewable energy, storage, and multi-sector coupling - designed for researchers and planners.
  </h3>

  <!-- Tabs Navigation -->
  <div class="flex flex-wrap justify-center gap-2 mb-8">
    {#each tabs as tab}
      <button
        class="px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 {activeTab === tab.id
          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
          : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'}"
        onclick={() => activeTab = tab.id}
      >
        {tab.label}
      </button>
    {/each}
  </div>

  <!-- Features Grid -->
  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
    {#key activeTab + '-' + currentPage}
      {#each displayedFeatures as { icon, title, description, docsUrl }, index}
        <div
          class="transition-transform duration-300 {docsUrl ? 'hover:-translate-y-1 focus-visible:-translate-y-1 cursor-pointer' : ''}"
          style={`animation-delay: ${index * 50}ms`}
          onclick={() => {
            if (docsUrl) {
              window.open(docsUrl, '_blank', 'noopener,noreferrer');
            }
          }}
          onkeydown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && docsUrl) {
              window.open(docsUrl, '_blank', 'noopener,noreferrer');
            }
          }}
          role={docsUrl ? 'button' : undefined}
          tabindex={docsUrl ? 0 : undefined}
        >
        <Card
          class="h-full bg-muted/50 dark:bg-card border border-border/50 shadow-lg shadow-black/10 dark:shadow-white/10 transition-all duration-300 rounded-2xl relative overflow-hidden group carousel-item flex flex-col {docsUrl ? 'hover:shadow-xl hover:shadow-black/20 dark:hover:shadow-white/20' : ''}"
        >
          <CardHeader class="flex justify-center items-center">
            <CardTitle class="text-xl mb-2 flex items-center gap-3">
              <div class="bg-gradient-to-br from-primary/30 to-primary/10 p-3 rounded-full flex-shrink-0">
                {#if icon === 'mdiPowerPlugBattery'}
                  <MdiIcon path={mdiPowerPlugBatteryOutline} class="size-7 text-primary" />
                {:else if icon === 'mdiTransmissionTower'}
                  <MdiIcon path={mdiTransmissionTower} class="size-7 text-primary" />
                {:else if icon === 'mdiSecurity'}
                  <MdiIcon path={mdiSecurity} class="size-7 text-primary" />
                {:else if icon === 'mdiCrane'}
                  <MdiIcon path={mdiCrane} class="size-7 text-primary" />
                {:else if icon === 'mdiRoad'}
                  <MdiIcon path={mdiRoad} class="size-7 text-primary" />
                {:else if icon === 'mdiRollerblade'}
                  <MdiIcon path={mdiRollerblade} class="size-7 text-primary" />
                {:else if icon === 'mdiCrosshairsQuestion'}
                  <MdiIcon path={mdiCrosshairsQuestion} class="size-7 text-primary" />
                {:else if icon === 'mdiDiversify'}
                  <MdiIcon path={mdiDiversify} class="size-7 text-primary" />
                {:else if icon === 'mdiBuildingColumns'}
                  <MdiIcon path={mdiBankOutline} class="size-7 text-primary" />
                {:else if icon === 'mdiScrewdriver'}
                  <MdiIcon path={mdiScrewdriver} class="size-7 text-primary" />
                {:else if icon === 'mdiDotsSquare'}
                  <MdiIcon path={mdiDotsSquare} class="size-7 text-primary" />
                {:else if icon === 'mdiHeatPump'}
                  <MdiIcon path={mdiHeatPump} class="size-7 text-primary" />
                {:else if icon === 'mdiLightbulb'}
                  <MdiIcon path={mdiLightbulb} class="size-7 text-primary" />
                {:else if icon === 'mdiTransmissionTowerApp'}
                  <MdiIcon path={mdiTransmissionTower} class="size-7 text-primary" />
                {:else if icon === 'mdiViewModule'}
                  <MdiIcon path={mdiViewModule} class="size-7 text-primary" />
                {:else if icon === 'mdiCarCruiseControl'}
                  <MdiIcon path={mdiCarCruiseControl} class="size-7 text-primary" />
                {:else if icon === 'mdiGridLarge'}
                  <MdiIcon path={mdiGridLarge} class="size-7 text-primary" />
                {:else if icon === 'mdiDataMatrix'}
                  <MdiIcon path={mdiDataMatrix} class="size-7 text-primary" />
                {:else if icon === 'mdiRunFast'}
                  <MdiIcon path={mdiRunFast} class="size-7 text-primary" />
                {:else if icon === 'mdiNotebook'}
                  <MdiIcon path={mdiNotebook} class="size-7 text-primary" />
                {:else if icon === 'mdiLockOpen'}
                  <MdiIcon path={mdiLockOpen} class="size-7 text-primary" />
                {:else}
                  <svelte:component
                    this={iconMap[icon]}
                    class="size-7 text-primary"
                  />
                {/if}
              </div>
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent class="text-muted-foreground text-center px-6 flex-grow flex flex-col justify-between">
            <p class="text-sm leading-relaxed">{description}</p>
          </CardContent>
        </Card>
        </div>
      {/each}
    {/key}
  </div>

  <!-- Navigation Arrows -->
  {#if totalPages > 1}
    <div class="flex justify-center mt-6 gap-4">
      <button
        onclick={prevPage}
        class="p-2 rounded-full bg-background border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="Previous page"
      >
        <ArrowLeft class="size-4" />
      </button>

      <span class="flex items-center text-sm text-muted-foreground px-4">
        Page {currentPage + 1} of {totalPages}
      </span>

      <button
        onclick={nextPage}
        class="p-2 rounded-full bg-background border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="Next page"
      >
        <ArrowRight class="size-4" />
      </button>
    </div>
  {/if}

  <!-- Documentation CTA -->
  <div class="mt-8 flex justify-center">
    <Button href={DOCS_BASE_URL} target="_blank" rel="noopener noreferrer" class="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-medium rounded-full group/arrow transition-colors duration-300">
      Explore Documentation
      <ArrowRight class="ml-2 group-hover/arrow:translate-x-1 transition-transform duration-300" style="width: 1rem; height: 1rem;" />
    </Button>
  </div>
</section>
