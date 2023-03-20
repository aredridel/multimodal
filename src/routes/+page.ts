import type { PageLoad } from './$types';

export const load = (async function ({ params, fetch }) {
  return {data: await (await fetch("/api")).json()};
}) satisfies PageLoad;
