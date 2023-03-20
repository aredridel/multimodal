import { error } from '@sveltejs/kit';
import { get, writable, type Writable } from 'svelte/store';
import type { RequestHandler } from '$types';

if (!globalThis.data) globalThis.data = writable({});
const data = globalThis.data as Writable<Record<string, {}>>;

if (globalThis.ws) globalThis.ws.close();
const ws = (globalThis.ws = new WebSocket('wss://stream.aisstream.io/v0/stream'));
ws.addEventListener('open', () => {
	console.log('connected websocket');
	ws.send(
		JSON.stringify({
			APIKey: process.env.AISKEY,
			BoundingBoxes: [
				[
					[43.824, -73.4128],
					[39.824, -69.4128]
				]
			]
		})
	);

	ws.addEventListener('message', (m) => {
		const message = JSON.parse(m.data);
		if (message.MessageType === 'StandardClassBPositionReport') {
			console.log(message);
			const id = `mmsi:${message.MetaData.MMSI}`;
			data.update((data) => {
				const { Latitude: lat, Longitude: lon } = message.Message.StandardClassBPositionReport;
				data[id] = { lat, lon, type: 'mmsi', id, message };
				return data;
			});
		}
	});
});

console.log('connecting websocket');

export const GET = async function ({ url }) {
	const p = await (await fetch('https://newengland.pantographapp.com/current')).json();
	for (const vehicle of p) {
		data.update((data) => {
			const id = `vehicle:${vehicle.unique_id}`;
			data[id] = { lat: vehicle.lat, lon: vehicle.lon, id, type: 'vehicle' };
			return data;
		});
	}
	return new Response(JSON.stringify(Object.values(get(data))));
} satisfies RequestHandler;
