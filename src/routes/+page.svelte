<script>
  import Community from "$lib/components/Community.svelte";
  import Faq from "$lib/components/FAQ.svelte";
  import Features from "$lib/components/Features.svelte";
  import Ecosystem from "$lib/components/Ecosystem.svelte";
  import Models from "$lib/components/Models.svelte";
  import References from "$lib/components/References.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import { siteConfig } from "$lib/config/meta";
</script>

<svelte:head>
  <title>{siteConfig.name}</title>
  <meta name="description" content={siteConfig.description} />
  <meta name="keywords" content={siteConfig.keywords.join(", ")} />
  <meta property="og:title" content={siteConfig.name} />
  <meta property="og:description" content={siteConfig.description} />
  <meta property="og:image" content={siteConfig.ogImage} />
  <meta property="og:url" content={siteConfig.url} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content={siteConfig.name} />
  <meta property="twitter:description" content={siteConfig.description} />
  <meta property="twitter:image" content={siteConfig.ogImage} />
</svelte:head>

<Navbar />
<Hero />
<Features />
<Ecosystem />
<Models />
<Community />
<References />
<Faq />
<Footer />
