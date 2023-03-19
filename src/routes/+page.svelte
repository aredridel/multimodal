<script>
    import {LeafletMap, TileLayer} from 'svelte-leafletjs';

    const mapOptions = {
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
</script>

<div class="example">
    <LeafletMap bind:this={leafletMap} options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
    </LeafletMap>
</div>

<style>
  .example {
    height: 100%;
  }
</style>
