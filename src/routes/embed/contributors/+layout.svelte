<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import "../../../app.css";
  let { children } = $props();
</script>

<svelte:head>
  <title>PyPSA Contributors</title>
  <meta name="description" content="PyPSA Community Contributors" />
  <!-- Prevent indexing of embed pages -->
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<ModeWatcher />

{@render children()}
