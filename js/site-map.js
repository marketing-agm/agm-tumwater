/* ================================================================
   Tumwater Brewery — interactive 3D site map (MapLibre GL JS)
   Loaded only on the home page. Coordinates are APPROXIMATE and
   meant to be refined against the ALTA survey / Thurston County GIS.
   Edit CENTER and the FEATURES[].lng/lat below to reposition.
   ================================================================ */
(function () {
  "use strict";

  var el = document.getElementById("site-map");
  if (!el || typeof maplibregl === "undefined") return;

  // --- Approximate site geography (refine with real survey data) ---
  var CENTER = [-122.9035, 47.0150];

  var FEATURES = [
    {
      lng: -122.9035, lat: 47.0148,
      title: "The 1906 Brewhouse",
      tag: "Parcel B · Primary development parcel",
      body: "The brick-and-tile brewhouse complex, built 1905–1906 and run by the Olympia Brewing Company for most of the 20th century. The anchor for adaptive reuse — destination F&amp;B, tasting room, interpretive space, and event venue."
    },
    {
      lng: -122.9046, lat: 47.0156,
      title: "Parcel A — Custer Way Frontage",
      tag: "Tax 45700700001 · 1.253 ac",
      body: "Custer Way SW frontage parcel with an abandoned warehouse. The primary arterial access point into the assemblage."
    },
    {
      lng: -122.9050, lat: 47.0151,
      title: "Parcels C West &amp; East",
      tag: "0.464 + 0.398 ac",
      body: "Existing asphalt parking lots flanking the lower site — candidates for structured / valet parking and day-use access in the concept work."
    },
    {
      lng: -122.9043, lat: 47.0159,
      title: "Deschutes River &amp; Tumwater Falls",
      tag: "Type F fish-bearing stream",
      body: "The site’s defining natural amenity and its defining regulatory constraint — direct frontage on the lower falls, subject to federal ESA review and treaty fishing rights."
    },
    {
      lng: -122.9029, lat: 47.0142,
      title: "Schmidt House &amp; Historical Park",
      tag: "Preserved · excluded from sale",
      body: "The Schmidt House (Olympia Tumwater Foundation) sits directly south and is not part of the transaction. Tumwater Historical Park lies across the river — a heritage and open-space context for destination programming."
    },
    {
      lng: -122.9039, lat: 47.0176,
      title: "Deschutes Estuary — South Basin",
      tag: "Planned 260-acre restoration",
      body: "With the 5th Avenue Dam removal, tidal flow returns and ~260 acres of estuary are restored immediately downstream. The site becomes the gateway parcel to the largest estuary restoration in South Puget Sound."
    },
    {
      lng: -122.9019, lat: 47.0150,
      title: "Boston Street SE Descent",
      tag: "≈110 ft vertical · 8–15% grade",
      body: "Primary access descends ~110 vertical feet from Custer Way to the brewhouse plateau. KPFF identifies widening to fire-apparatus standards as the principal infrastructure investment at acquisition."
    }
  ];

  var map = new maplibregl.Map({
    container: el,
    style: "https://tiles.openfreemap.org/styles/liberty",
    center: CENTER,
    zoom: 16.1,
    pitch: 58,
    bearing: -22,
    maxBounds: [[-122.916, 47.005], [-122.891, 47.025]],
    attributionControl: { compact: true },
    // Two-finger / ctrl-scroll to interact, so the page still scrolls past the map
    cooperativeGestures: true
  });

  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
  map.addControl(new maplibregl.FullscreenControl(), "top-right");

  map.on("load", function () {
    // 3D building extrusions from the OpenMapTiles vector source
    try {
      var layers = map.getStyle().layers || [];
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === "symbol" && layers[i].layout && layers[i].layout["text-field"]) {
          labelLayerId = layers[i].id; break;
        }
      }
      if (map.getSource("openmaptiles") && !map.getLayer("3d-buildings")) {
        map.addLayer({
          id: "3d-buildings",
          source: "openmaptiles",
          "source-layer": "building",
          type: "fill-extrusion",
          minzoom: 14,
          paint: {
            "fill-extrusion-color": "#dad5c9",
            "fill-extrusion-height": ["coalesce", ["get", "render_height"], 8],
            "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0],
            "fill-extrusion-opacity": 0.92
          }
        }, labelLayerId);
      }
    } catch (e) { /* style without buildings — map still works */ }

    // Clickable feature markers with branded info popups
    FEATURES.forEach(function (f) {
      var html =
        '<div class="map-pop">' +
        '<div class="map-pop-tag">' + f.tag + "</div>" +
        '<h3 class="map-pop-title">' + f.title + "</h3>" +
        '<p class="map-pop-body">' + f.body + "</p>" +
        "</div>";
      var popup = new maplibregl.Popup({ offset: 26, maxWidth: "320px" }).setHTML(html);
      new maplibregl.Marker({ color: "#0A2540" })
        .setLngLat([f.lng, f.lat])
        .setPopup(popup)
        .addTo(map);
    });
  });
})();
