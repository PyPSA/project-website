<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { base } from "$app/paths";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { Card, CardContent } from "$lib/components/ui/card";
  import { Separator } from "$lib/components/ui/separator";
  import { Popover, PopoverContent, PopoverTrigger } from "$lib/components/ui/popover";
  import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
  } from "$lib/components/ui/command";
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
  } from "$lib/components/ui/carousel";
  import { ExternalLink, ChevronsUpDown, Check } from "lucide-svelte";
  import Autoplay from "embla-carousel-autoplay";

  const { data } = $props();
  const event = data.event;

  const autoplayPlugin = Autoplay({ delay: 4000, stopOnInteraction: true });

  const eventDate = new Date(event.date + "T00:00:00");
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(eventDate);

  const timeMatch = event.time.match(
    /(\d{1,2}):(\d{2})\s*(am|pm)\s*[–-]\s*(\d{1,2}):(\d{2})\s*(am|pm)\s*\((\w+)\)/i
  );
  const timeFmt = new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit" });
  const formattedTime = timeMatch
    ? (() => {
        let sh = parseInt(timeMatch[1]);
        const sm = parseInt(timeMatch[2]);
        if (timeMatch[3].toLowerCase() === "pm" && sh !== 12) sh += 12;
        if (timeMatch[3].toLowerCase() === "am" && sh === 12) sh = 0;
        let eh = parseInt(timeMatch[4]);
        const em = parseInt(timeMatch[5]);
        if (timeMatch[6].toLowerCase() === "pm" && eh !== 12) eh += 12;
        if (timeMatch[6].toLowerCase() === "am" && eh === 12) eh = 0;
        // eslint-disable-next-line svelte/prefer-svelte-reactivity
        const ds = new Date(eventDate);
        ds.setHours(sh, sm);
        // eslint-disable-next-line svelte/prefer-svelte-reactivity
        const de = new Date(eventDate);
        de.setHours(eh, em);
        return `${timeFmt.format(ds)} – ${timeFmt.format(de)} (${timeMatch[7]})`;
      })()
    : event.time;

  function parseUtcOffset(tz: string): number {
    const match = tz.match(/UTC([+-]?\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }

  function parseTime(t: string): { hours: number; minutes: number } {
    const [h, m] = t.split(":").map(Number);
    return { hours: h, minutes: m };
  }

  function formatTime(hours: number, minutes: number): string {
    const h = ((hours % 24) + 24) % 24;
    return `${String(h).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  const berlinTz = event.timezones.find((tz) => tz.city === "Berlin");
  const berlinOffset = berlinTz ? parseUtcOffset(berlinTz.timezone) : 2;
  const eventStart = berlinTz ? parseTime(berlinTz.localTime) : { hours: 16, minutes: 0 };
  const eventEndMinutes = eventStart.hours * 60 + eventStart.minutes + 150;
  const eventEnd = {
    hours: Math.floor(eventEndMinutes / 60),
    minutes: eventEndMinutes % 60,
  };

  function formatLocalizedTime(hours: number, minutes: number): string {
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const d = new Date(eventDate);
    d.setHours(((hours % 24) + 24) % 24, minutes);
    return timeFmt.format(d);
  }

  const heroRefCities = ["New York", "New Delhi"];
  const heroTimezones = heroRefCities
    .map((city) => {
      const tz = event.timezones.find((t) => t.city === city);
      if (!tz) return null;
      const diff = parseUtcOffset(tz.timezone) - berlinOffset;
      const sMin = eventStart.hours * 60 + eventStart.minutes + diff * 60;
      return {
        label: tz.city,
        time: formatLocalizedTime(Math.floor(sMin / 60), sMin % 60),
      };
    })
    .filter(Boolean) as { label: string; time: string }[];

  const daysUntilDeadline = event.talkProposalDeadline
    ? Math.ceil(
        (new Date(event.talkProposalDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )
    : null;

  let selectedCity = $state("Berlin");
  let comboboxOpen = $state(false);

  function formatOffsetDiff(tz: { timezone: string }): string {
    const diff = parseUtcOffset(tz.timezone) - berlinOffset;
    if (diff === 0) return "±0h";
    const sign = diff > 0 ? "+" : "";
    return Number.isInteger(diff) ? `${sign}${diff}h` : `${sign}${diff}h`;
  }

  const convertedStart = $derived.by(() => {
    const tz = event.timezones.find((t) => t.city === selectedCity);
    if (!tz) return berlinTz?.localTime ?? "16:00";
    const offset = parseUtcOffset(tz.timezone) - berlinOffset;
    const mins = eventStart.hours * 60 + eventStart.minutes + offset * 60;
    return formatTime(Math.floor(mins / 60), mins % 60);
  });

  const convertedEnd = $derived.by(() => {
    const tz = event.timezones.find((t) => t.city === selectedCity);
    if (!tz) return formatTime(eventEnd.hours, eventEnd.minutes);
    const offset = parseUtcOffset(tz.timezone) - berlinOffset;
    const mins = eventEnd.hours * 60 + eventEnd.minutes + offset * 60;
    return formatTime(Math.floor(mins / 60), mins % 60);
  });

  const convertedTimezone = $derived.by(() => {
    const tz = event.timezones.find((t) => t.city === selectedCity);
    return tz?.timezone ?? "UTC+2";
  });

  const convertedDate = $derived.by(() => {
    const tz = event.timezones.find((t) => t.city === selectedCity);
    return tz?.date ?? berlinTz?.date ?? "";
  });
</script>

<svelte:head>
  <title>{event.title} — PyPSA</title>
  <meta name="description" content="{event.title} on {formattedDate}, {formattedTime}." />
  <meta property="og:title" content="{event.title} — PyPSA" />
  <meta property="og:description" content="{event.title} on {formattedDate}, {formattedTime}." />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://pypsa.org/img/4th-user-meeting-card.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Navbar />

<main class="container max-w-5xl mx-auto py-20 md:py-32 space-y-10">
  <!-- Hero -->
  <section class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
      <!-- Left column -->
      <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-2">
          {#if event.status === "upcoming"}
            <Badge class="bg-[#c30944] text-white hover:bg-[#c30944] cursor-default">Upcoming</Badge
            >
          {:else}
            <Badge variant="secondary">Past Event</Badge>
          {/if}
          <Badge variant="outline">Online</Badge>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold">{event.title}</h1>

        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        <p class="text-muted-foreground leading-relaxed">{@html event.introHtml}</p>

        <div class="flex items-center gap-2 text-muted-foreground">
          <span class="text-sm">Organized by</span>
          <a
            href="https://www.tu.berlin/en/ensys"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 hover:opacity-80"
          >
            <img src="{base}/img/institutions/tu-berlin.svg" alt="TU Berlin" class="h-4" />
            <span class="text-sm">TU Berlin</span>
          </a>
          <span class="text-xs">&</span>
          <a
            href="https://pypsa-meets-earth.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 hover:opacity-80"
          >
            <img
              src="{base}/img/institutions/pypsa-meets-earth.webp"
              alt="PyPSA meets Earth"
              class="h-4"
            />
            <span class="text-sm">PyPSA meets Earth Initiative</span>
          </a>
        </div>
      </div>

      <!-- Right column: calendar card + CTAs -->
      <div class="flex flex-col items-center gap-3 md:sticky md:top-24 mt-8 md:mt-10">
        <div
          class="flex flex-col items-center justify-center border rounded-xl bg-muted/30 px-6 py-4 min-w-[140px]"
        >
          <span class="text-sm font-medium uppercase tracking-wider text-[#c30944]">
            {new Intl.DateTimeFormat("en", { month: "short" }).format(eventDate)}
          </span>
          <span class="text-4xl font-bold leading-tight">{eventDate.getDate()}</span>
          <span class="text-sm text-muted-foreground">
            {new Intl.DateTimeFormat("en", { weekday: "long" }).format(eventDate)}
          </span>
          <span class="text-sm text-muted-foreground">{eventDate.getFullYear()}</span>
          <div class="mt-3 border-t pt-3 text-center">
            <span class="text-sm font-medium">{formattedTime}</span>
            {#if heroTimezones.length > 0}
              <div class="mt-1 space-y-0.5">
                {#each heroTimezones as ht (ht.label)}
                  <div class="text-xs text-muted-foreground">{ht.time} ({ht.label})</div>
                {/each}
              </div>
            {/if}
          </div>
        </div>
        {#if event.status === "upcoming"}
          <div class="flex flex-col gap-2 w-full">
            {#if event.registrationUrl}
              <Button
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                class="font-bold bg-[#c30944] hover:bg-[#a00738] text-white w-full"
              >
                Register Now
                <ExternalLink class="size-4 ml-2" />
              </Button>
            {/if}
            {#if event.talkProposalUrl}
              <Button
                href={event.talkProposalUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                class="font-medium w-full"
              >
                Submit talk proposal
                <ExternalLink class="size-4 ml-2" />
              </Button>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </section>

  <!-- Call for lightning talks -->
  {#if event.talkProposalUrl && event.status === "upcoming"}
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">Call for Lightning Talks</h2>
      <ul class="space-y-2 text-muted-foreground list-disc list-inside">
        <li>
          All PyPSA users are encouraged to suggest 10-minute lightning talks about your use of the
          PyPSA framework
        </li>
        <li>
          We are especially interested in the types of problems you are tackling and how you employ
          PyPSA to solve them
        </li>
        <li>Any project could be shown! We are keen to see diverse use cases and ideas</li>
      </ul>
      {#if event.talkProposalDeadline}
        <div>
          <p class="text-sm font-medium">Submissions close on {event.talkProposalDeadline}</p>
          {#if daysUntilDeadline !== null && daysUntilDeadline > 0}
            <p class="text-xs text-muted-foreground">{daysUntilDeadline} days left</p>
          {/if}
        </div>
      {/if}
    </section>
  {/if}

  <!-- Agenda -->
  <section class="space-y-4">
    <h2 class="text-2xl font-bold">Agenda</h2>
    <p class="text-muted-foreground">Agenda will be announced soon.</p>
  </section>

  <Separator />

  <!-- Previous meetings videos -->
  {#if event.videos.length > 0}
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">Previous Meetings</h2>
      <p class="text-muted-foreground">Watch recordings from past PyPSA user meetings.</p>
      <Carousel opts={{ align: "start", loop: true }} plugins={[autoplayPlugin]}>
        <CarouselContent class="-ml-4">
          {#each event.videos as video (video.videoId)}
            <CarouselItem class="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <a
                href="https://www.youtube.com/watch?v={video.videoId}"
                target="_blank"
                rel="noopener noreferrer"
                class="group block"
              >
                <Card class="overflow-hidden transition-all duration-200 hover:shadow-md">
                  <div class="relative aspect-video bg-muted">
                    <img
                      src="https://img.youtube.com/vi/{video.videoId}/mqdefault.jpg"
                      alt={video.title}
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardContent class="p-3">
                    <p
                      class="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors"
                    >
                      {video.title}
                    </p>
                  </CardContent>
                </Card>
              </a>
            </CarouselItem>
          {/each}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>

    <Separator />
  {/if}

  <!-- Time converter -->
  {#if event.timezones.length > 0}
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">Around the Globe</h2>
      <p class="text-muted-foreground">Find the meeting time in your local timezone.</p>
      <Card class="overflow-hidden">
        <CardContent class="p-0">
          <div class="grid grid-cols-1 sm:grid-cols-2">
            <div class="p-5 space-y-1">
              <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Event Time
              </p>
              <p class="text-2xl font-bold font-mono">
                {berlinTz?.localTime ?? "16:00"} – {formatTime(eventEnd.hours, eventEnd.minutes)}
                <span class="text-base font-sans font-normal text-muted-foreground">CEST</span>
              </p>
              <p class="text-sm text-muted-foreground">{berlinTz?.date ?? ""}</p>
              <p class="text-sm text-muted-foreground">Berlin</p>
            </div>
            <div class="p-5 space-y-1 border-t sm:border-t-0 sm:border-l bg-muted/30">
              <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Your Time
              </p>
              <p class="text-2xl font-bold font-mono">
                {convertedStart} – {convertedEnd}
                <span class="text-base font-sans font-normal text-muted-foreground">
                  {convertedTimezone}
                </span>
              </p>
              <p class="text-sm text-muted-foreground">{convertedDate}</p>
              <Popover bind:open={comboboxOpen}>
                <PopoverTrigger
                  class="inline-flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground w-56 mt-1"
                >
                  {selectedCity}
                  <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
                </PopoverTrigger>
                <PopoverContent class="w-56 p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search city..." />
                    <CommandEmpty>No city found.</CommandEmpty>
                    <CommandList>
                      {#each event.timezones as tz (tz.city)}
                        <CommandItem
                          value={tz.city}
                          onSelect={() => {
                            selectedCity = tz.city;
                            comboboxOpen = false;
                          }}
                        >
                          <Check
                            class="mr-2 size-4 {selectedCity === tz.city
                              ? 'opacity-100'
                              : 'opacity-0'}"
                          />
                          <span class="flex-1">{tz.city}</span>
                          <span class="text-xs text-muted-foreground ml-2">
                            {formatOffsetDiff(tz)}
                          </span>
                        </CommandItem>
                      {/each}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>

    <Separator />
  {/if}

  <!-- Recording permissions -->
  <section class="space-y-4">
    <h2 class="text-2xl font-bold">Recording Permissions</h2>
    <div class="space-y-3 text-muted-foreground leading-relaxed">
      <p>
        We'd like to record the entire session and, for people who give their consent, make the
        recordings available after the session under a Creative Commons Attribution ({event.license})
        license to those who were not able to make the meeting.
      </p>
      <p>
        Participants can license their contribution under a {event.license} license at the time of registration.
        This will permit the associated video recording to be shared with a wider audience in the open
        modelling community.
      </p>
      <p>
        Presenters can optionally license their presentations under a {event.license} license. This will
        also facilitate their dissemination and reuse.
      </p>
      <p>
        Open licensing is optional. We will not publish anything without the consent of those being
        recorded. You may withdraw your consent afterwards as well.
      </p>
    </div>
  </section>

  <!-- Contact -->
  <section class="space-y-4">
    <h2 class="text-2xl font-bold">Contact</h2>
    <p class="text-muted-foreground">
      For any inquiries, please contact
      <a href="mailto:contact@pypsa.org" class="hover:underline" style="color: #c30944;">
        contact@pypsa.org</a
      >
      or {event.contactName}
      (<a href="mailto:{event.contactEmail}" class="hover:underline" style="color: #c30944;"
        >{event.contactEmail}</a
      >
      /
      <a
        href="https://github.com/{event.contactHandle.replace('@', '')}"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline"
        style="color: #c30944;">{event.contactHandle}</a
      >).
    </p>
  </section>

  <Separator />

  <section class="text-center py-8">
    <p class="text-lg text-muted-foreground">
      We look forward to a fruitful exchange with many of you!
    </p>
  </section>
</main>

<Footer />
