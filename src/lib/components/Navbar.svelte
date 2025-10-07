<script lang="ts">
  import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "$lib/components/ui/sheet";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import { Menu, ExternalLink } from "lucide-svelte";
  import GithubIcon from "$lib/icons/GithubIcon.svelte";
  import DiscordIcon from "$lib/icons/DiscordIcon.svelte";
  import ToggleTheme from "$lib/components/ToggleTheme.svelte";
  import { DOCS_BASE_URL } from '$lib/config';

  interface RouteProps {
    href: string;
    label: string;
  }


  const routeList: RouteProps[] = [
    { href: "#features", label: "Features" },
    { href: "#frameworks", label: "Ecosystem" },
    { href: "#implementations", label: "Models" },
    { href: DOCS_BASE_URL, label: "Documentation" },
  ];


  let isOpen = false;
  let activeSection = "";

  // Track scroll position to highlight active section
  function updateActiveSection() {
    const sections = ["features", "frameworks", "implementations"];
    const scrollPosition = window.scrollY + 150; // Offset for navbar height

    // Check if we're at or past the team/contributors section
    const teamElement = document.getElementById("team");
    if (teamElement && scrollPosition >= teamElement.offsetTop) {
      activeSection = ""; // Clear active section when in team/contributors
      return;
    }

    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i]);
      if (element && scrollPosition >= element.offsetTop) {
        activeSection = sections[i];
        return;
      }
    }

    activeSection = ""; // Clear if not in any section
  }

  // Add scroll listener when component mounts
  import { onMount } from 'svelte';

  onMount(() => {
    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection);
    return () => window.removeEventListener('scroll', updateActiveSection);
  });
</script>

<header
  class="w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky z-40 rounded-2xl flex justify-between items-center p-2 glass-morphism"
>
  <a href="/" class="font-bold text-lg flex items-center">
    <img src="https://raw.githubusercontent.com/PyPSA/PyPSA/v1-docs/docs/assets/logo/logo.svg" alt="PyPSA Logo" class="w-9 h-9 mr-2" />
    PyPSA
  </a>

  <!-- Mobile -->
  <div class="flex items-center lg:hidden">
    <Sheet bind:open={isOpen}>
      <SheetTrigger>
        <Menu on:click={() => (isOpen = true)} class="cursor-pointer" />
      </SheetTrigger>

      <SheetContent side="left" class="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card">
        <div>
          <SheetHeader class="mb-4 ml-4">
            <SheetTitle class="flex items-center">
              <a href="/" class="flex items-center">
                <img src="https://raw.githubusercontent.com/PyPSA/PyPSA/v1-docs/docs/assets/logo/logo.svg" alt="PyPSA Logo" class="size-9 mr-2" />
                PyPSA
              </a>
            </SheetTitle>
          </SheetHeader>

          <div class="flex flex-col gap-2">
            {#each routeList as { href, label }}
              {@const sectionId = href.replace('#', '')}
              {@const isExternal = href.startsWith('http')}
              <a on:click={() => (isOpen = false)} {href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}>
                <Button variant="ghost" class="justify-start text-base w-full transition-all duration-300 {isExternal ? 'hover:bg-[#098754] hover:text-white' : 'hover:bg-primary hover:text-primary-foreground'} {activeSection === sectionId ? 'bg-primary/10 text-primary border border-primary/20' : ''}">
                  {label}
                  {#if isExternal}
                    <ExternalLink class="ml-1 size-3" />
                  {/if}
                </Button>
              </a>
            {/each}
          </div>
        </div>

        <SheetFooter class="flex-col sm:flex-col justify-start items-start">
          <Separator class="mb-2" />
          <ToggleTheme />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
  <div class="hidden lg:flex items-center gap-1">
    <!-- Navigation Links -->
    {#each routeList as { href, label }}
      {@const sectionId = href.replace('#', '')}
      {@const isExternal = href.startsWith('http')}
      <a {href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined} class="{buttonVariants({ variant: "ghost", size: "default" })} transition-all duration-300 {activeSection === sectionId && !isExternal ? 'bg-primary/10 text-primary border border-primary/20' : ''}" style={isExternal ? 'transition: all 0.3s;' : ''} on:mouseenter={(e) => isExternal && (e.currentTarget.style.backgroundColor = '#098754', e.currentTarget.style.color = 'white')} on:mouseleave={(e) => isExternal && (e.currentTarget.style.backgroundColor = '', e.currentTarget.style.color = '')}>
        {label}
        {#if isExternal}
          <ExternalLink class="ml-1 size-3" />
        {/if}
      </a>
    {/each}
  </div>

  <div class="hidden lg:flex">
    <ToggleTheme />
    <a
      aria-label="Join Discord"
      href="https://discord.gg/AnuJBk23FU"
      target="_blank"
      class="{buttonVariants({ variant: 'ghost', size: 'sm' })} hover:bg-primary hover:text-primary-foreground"
    >
      <DiscordIcon class="size-5" />
    </a>
    <a
      aria-label="View on GitHub"
      href="https://github.com/pypsa"
      target="_blank"
      class="{buttonVariants({ variant: 'ghost', size: 'sm' })} hover:bg-primary hover:text-primary-foreground"
    >
      <GithubIcon class_="size-5" />
    </a>
  </div>
</header>

<style>
  .glass-morphism {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }

  :global(.dark) .glass-morphism {
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }

  .shadow-light {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.085);
  }

  .shadow-dark {
    box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.141);
  }
</style>
