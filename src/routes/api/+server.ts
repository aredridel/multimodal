import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	return new Response(JSON.stringify(await (await fetch("https://newengland.pantographapp.com/current")).json()));
}
