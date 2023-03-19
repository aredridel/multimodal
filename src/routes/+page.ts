/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
  return {data: await (await fetch("/api")).json()};
}
