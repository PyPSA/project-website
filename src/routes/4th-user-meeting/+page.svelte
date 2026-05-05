<script lang="ts">
  import { onMount } from "svelte";

  const { data } = $props();
  const event = data.event;
  const target = data.target;

  onMount(() => {
    window.location.href = `/events/${target}`;
  });
</script>

<svelte:head>
  {#if event}
    <title>{event.title} — PyPSA</title>
    <meta name="description" content="{event.title} on {event.date}, {event.time}." />
    <meta property="og:title" content="{event.title} — PyPSA" />
    <meta property="og:description" content="{event.title} on {event.date}, {event.time}." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://pypsa.org/img/{target}-card.jpg" />
    <meta property="og:url" content="https://pypsa.org/{target}" />
    <meta name="twitter:card" content="summary_large_image" />
  {/if}
  <meta http-equiv="refresh" content="0;url=/events/{target}" />
</svelte:head>

<p class="hidden">Redirecting to <a href="/events/{target}">/events/{target}</a>…</p>
