// Initialize the map and set its view to Göteborg
var map = L.map('map').setView([57.7089, 11.9746], 12);

// Add OpenStreetMap base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Geolocation button
L.control.locate({
    position: 'topright',
    strings: {
        title: "Show me where I am!"
    }
}).addTo(map);

// GeoSearch control
const provider = new GeoSearch.OpenStreetMapProvider();
const searchControl = new GeoSearch.GeoSearchControl({
    provider: provider,
    style: 'bar',
    autoComplete: true,
    autoCompleteDelay: 250,
    showMarker: true,
    keepResult: true
});
map.addControl(searchControl);

// GeoJSON data as JavaScript variables
var bibliotekLayer = L.geoJSON(bibliotek, {
    style: { color: 'blue' },
    onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
        }
    }
});

var centroidLayer = L.geoJSON(centroid, {
    style: { color: 'green' },
    onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
        }
    }
});

var mellanLayer = L.geoJSON(mellan, {
    style: { color: 'purple' },
    onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
        }
    }
});

var walkDistLayer = L.geoJSON(walkDist, {
    style: { color: 'orange' },
    onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
        }
    }
});

// Base layers
var baseLayers = {
    "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map)
};

// Overlay layers
var overlayLayers = {
    "Bibliotek": bibliotekLayer,
    "Centroid": centroidLayer,
    "Mellan": mellanLayer,
    "Walk Distance": walkDistLayer
};

// Add the layers control panel
L.control.layers(baseLayers, overlayLayers, {
    collapsed: false // Expand the layer control panel by default
}).addTo(map);
