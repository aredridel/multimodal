<script lang="ts">
import type { MapOptions } from 'leaflet';
import {LeafletMap, Marker, TileLayer} from 'svelte-leafletjs';

export let data;

const mapOptions: MapOptions = {
    center: [41.8240, -71.4128],
    zoom: 11,
};
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tileLayerOptions = {
    minZoom: 0,
    maxZoom: 20,
    maxNativeZoom: 19,
    attribution: "© OpenStreetMap contributors",
};

let leafletMap;

console.log(data);
</script>

<div class="map">
    <LeafletMap bind:this={leafletMap} options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
	{#each data.data as datum}
	  <Marker latLng={[datum.lat, datum.lon]}></Marker>
	{/each}
    </LeafletMap>
</div>

<style>
  .map {
    height: 100%;
  }
</style>
