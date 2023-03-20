import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { WebSocket } from 'ws';

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: 'multiplayer',
			configureServer() {
				globalThis.WebSocket = WebSocket;
			}
		}
	]
});
