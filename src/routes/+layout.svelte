<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import "../app.css";
  const { children } = $props();
</script>

<svelte:head>
  <meta name="color-scheme" content="light dark" />
</svelte:head>

<ModeWatcher />

{@render children()}
