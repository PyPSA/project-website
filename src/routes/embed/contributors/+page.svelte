<script>
  import Community from "$lib/components/Community.svelte";
</script>

<div class="embed-container">
  <Community showDiscord={false} showHeader={false} showFilters={false} showPyPSALink={true} colorfulImages={true} />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  .embed-container {
    min-height: 100vh;
    width: 100%;
  }

  /* Remove extra padding/margins for embedded view */
  :global(.embed-container section) {
    padding-top: 2rem !important;
  }
</style>
