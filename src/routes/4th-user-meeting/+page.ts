import { eventsData } from "$lib/data/events";

export const prerender = true;

const target = "4th-user-meeting";

export function load() {
  const event = eventsData.find((e) => e.slug === target);
  return { event, target };
}
