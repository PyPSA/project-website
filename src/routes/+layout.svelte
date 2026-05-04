<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import { siteConfig } from "$lib/config/meta";
  import "../app.css";
  let { children } = $props();
</script>

<svelte:head>
  <meta name="color-scheme" content="light dark" />
</svelte:head>

<ModeWatcher />

{@render children()}
