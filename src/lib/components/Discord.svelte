<script lang="ts">
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
  } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import DiscordIcon from "$lib/icons/DiscordIcon.svelte";
</script>

<section id="community" class="container py-24 sm:py-32">
  <div class="lg:w-[60%] mx-auto">
    <Card class="bg-background shadow-none text-center flex flex-col items-center justify-center border-0">
      <CardHeader>
        <CardTitle class="text-4xl md:text-5xl font-bold">
          <DiscordIcon class="w-20 h-20 m-auto mb-4" />
          Ready to join this
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
