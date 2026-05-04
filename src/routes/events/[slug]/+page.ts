import { eventsData } from "$lib/data/events";
import { error } from "@sveltejs/kit";
import type { PageLoad, EntryGenerator } from "./$types";

export const entries: EntryGenerator = () => {
  return eventsData.map((e) => ({ slug: e.slug }));
};

export const load: PageLoad = ({ params }) => {
  const event = eventsData.find((e) => e.slug === params.slug);
  if (!event) {
    error(404, "Event not found");
  }
  return { event };
};
