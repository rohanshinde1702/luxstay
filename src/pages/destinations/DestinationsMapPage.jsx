import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  LuMapPin as MapPin,
  LuArrowRight as ArrowRight,
  LuGlobe as Globe2,
  LuSparkles as Sparkles,
  LuPlane as Plane,
  LuCompass as Compass,
  LuStar as Star,
  LuClock as Clock,
  LuThermometer as Thermometer,
  LuLayers as Layers,
  LuChevronRight as ChevronRight,
  LuNavigation as Navigation,
  LuCircleCheck as CheckCircle2,
  LuCalendar as Calendar,
  LuBuilding2 as Building2,
  LuShieldCheck as ShieldCheck,
  LuSearch as Search,
  LuMaximize2 as Maximize2,
  LuRotateCcw as RotateCcw,
  LuSlidersHorizontal as SlidersHorizontal,
  LuSun as Sun,
  LuMoon as Moon
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import Rating from "../../components/common/Rating";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import { DESTINATIONS_DATA } from "../../data/destinations";
import { ROOMS_DATA } from "../../data/rooms";
import { TOURS_DATA } from "../../data/tours";
import { useTheme } from "../../hooks/useTheme";

// Enhanced Geo-Coordinates & Telemetry for real Leaflet Map
const DESTINATIONS_GEO = DESTINATIONS_DATA.map((dest) => {
  const geoLookup = {
    "amalfi-coast-italy": { lat: 40.6340, lng: 14.6027, tz: "GMT+2", climate: "26°C Sunny", airportCode: "NAP" },
    "bali-indonesia": { lat: -8.5069, lng: 115.2625, tz: "GMT+8", climate: "29°C Tropical", airportCode: "DPS" },
    "swiss-alps-zermatt": { lat: 45.9765, lng: 7.7491, tz: "GMT+2", climate: "14°C Alpine", airportCode: "GVA" },
    "santorini-greece": { lat: 36.4618, lng: 25.3753, tz: "GMT+3", climate: "27°C Sunny", airportCode: "JTR" },
    "kyoto-japan": { lat: 35.0116, lng: 135.7681, tz: "GMT+9", climate: "22°C Temperate", airportCode: "KIX" },
    "aspen-colorado": { lat: 39.1911, lng: -106.8175, tz: "GMT-6", climate: "16°C Crisp", airportCode: "ASE" },
    "maldives-baa-atoll": { lat: 5.1432, lng: 73.0805, tz: "GMT+5", climate: "30°C Tropical", airportCode: "MLE" },
    "bora-bora-french-polynesia": { lat: -16.5004, lng: -151.7415, tz: "GMT-10", climate: "28°C Island Breeze", airportCode: "BOB" },
    "serengeti-tanzania": { lat: -2.3333, lng: 34.8333, tz: "GMT+3", climate: "27°C Savannah Warm", airportCode: "JRO" },
    "iceland-reykjavik": { lat: 64.1466, lng: -21.9426, tz: "GMT+0", climate: "6°C Cool Arctic", airportCode: "KEF" },
    "queenstown-new-zealand": { lat: -45.0312, lng: 168.6626, tz: "GMT+12", climate: "17°C Alpine Crisp", airportCode: "ZQN" },
    "banff-lake-louise-canada": { lat: 51.1784, lng: -115.5708, tz: "GMT-7", climate: "18°C Mountain Pine", airportCode: "YYC" },
    "cappadocia-turkey": { lat: 38.6431, lng: 34.8289, tz: "GMT+3", climate: "23°C Semi-Arid", airportCode: "NAV" },
    "egypt-cairo-giza": { lat: 29.9792, lng: 31.1342, tz: "GMT+2", climate: "31°C Golden Sun", airportCode: "CAI" },
    "maui-hawaii": { lat: 20.7984, lng: -156.3319, tz: "GMT-10", climate: "28°C Pacific Breeze", airportCode: "OGG" },
    "lapland-finland": { lat: 66.5039, lng: 25.7294, tz: "GMT+2", climate: "-4°C Arctic Snow", airportCode: "RVN" },
    "dubai-emirates": { lat: 25.2048, lng: 55.2708, tz: "GMT+4", climate: "33°C Sunny Desert", airportCode: "DXB" },
    "st-moritz-switzerland": { lat: 46.4908, lng: 9.8355, tz: "GMT+2", climate: "12°C Alpine Sun", airportCode: "SMV" },
    "whitsundays-australia": { lat: -20.2104, lng: 148.9582, tz: "GMT+10", climate: "26°C Ocean Breeze", airportCode: "HTI" },
    "galapagos-ecuador": { lat: -0.9538, lng: -90.9656, tz: "GMT-6", climate: "25°C Marine Subtropical", airportCode: "GPS" },
    "patagonia-chile": { lat: -51.2532, lng: -72.8817, tz: "GMT-3", climate: "13°C Glacial Wind", airportCode: "PNT" },
  };
  const extra = geoLookup[dest.id] || { lat: 20.0, lng: 0.0, tz: "GMT", climate: "24°C", airportCode: "INTL" };
  return { ...dest, ...extra };
});

const REGIONS = [
  "All Regions",
  "Southern Europe",
  "Western Europe",
  "Southeast Asia",
  "East Asia",
  "North America",
  "Africa & Middle East",
  "Oceania & Pacific",
  "South America",
  "Nordic & Arctic",
];

const MAP_LAYERS = {
  voyager: {
    name: "Light Voyager",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: "abcd",
  },
  dark: {
    name: "Dark Matter",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: "abcd",
  },
  satellite: {
    name: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
    subdomains: "",
  },
  osm: {
    name: "Clean Street",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: "abc",
  },
};

export default function DestinationsMapPage() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const [selectedDestination, setSelectedDestination] = useState(DESTINATIONS_GEO[0]);
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLayer, setActiveLayer] = useState(isDark ? "dark" : "voyager");

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersRef = useRef({});

  // Synchronize default map layer with theme when theme changes
  useEffect(() => {
    if (theme === "dark" && activeLayer === "voyager") {
      setActiveLayer("dark");
    } else if (theme === "light" && activeLayer === "dark") {
      setActiveLayer("voyager");
    }
  }, [theme]);

  // Filtered destinations
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS_GEO.filter((dest) => {
      const matchesRegion = selectedRegion === "All Regions" || dest.region === selectedRegion;
      const matchesSearch =
        dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.region.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [selectedRegion, searchQuery]);

  // Associated rooms and tours
  const destinationRooms = useMemo(() => {
    if (selectedDestination.roomIds && selectedDestination.roomIds.length > 0) {
      return ROOMS_DATA.filter((r) => selectedDestination.roomIds.includes(r.id));
    }
    return ROOMS_DATA.slice(0, 2);
  }, [selectedDestination]);

  const destinationTours = useMemo(() => {
    if (selectedDestination.tourIds && selectedDestination.tourIds.length > 0) {
      return TOURS_DATA.filter((t) => selectedDestination.tourIds.includes(t.id));
    }
    return TOURS_DATA.filter((t) => t.destinationSlug === selectedDestination.slug).slice(0, 2);
  }, [selectedDestination]);

  // Initialize Real Leaflet Map
  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: [selectedDestination.lat, selectedDestination.lng],
        zoom: 4,
        minZoom: 2,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: true,
      });

      // Add Tile Layer
      const currentLayerConfig = MAP_LAYERS[activeLayer] || MAP_LAYERS.voyager;
      const tileLayer = L.tileLayer(currentLayerConfig.url, {
        attribution: currentLayerConfig.attribution,
        subdomains: currentLayerConfig.subdomains,
        maxZoom: 19,
      }).addTo(map);

      tileLayerRef.current = tileLayer;
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((m) => map.removeLayer(m));
    markersRef.current = {};

    // Add Custom HTML Pin Markers
    DESTINATIONS_GEO.forEach((dest) => {
      const isSelected = dest.id === selectedDestination.id;
      const priceText = typeof dest.startingPrice === "number" ? dest.startingPrice.toLocaleString() : dest.startingPrice;

      const customIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
          <div class="lux-pin-wrapper ${isSelected ? "active" : ""}">
            <div class="lux-pin-tag">
              <span class="lux-pin-dot"></span>
              <strong>${dest.title}</strong>
              <span class="lux-pin-price">₹${priceText}</span>
            </div>
            <div class="lux-pin-arrow"></div>
          </div>
        `,
        iconSize: [160, 48],
        iconAnchor: [80, 48],
        popupAnchor: [0, -50],
      });

      const marker = L.marker([dest.lat, dest.lng], { icon: customIcon }).addTo(map);

      // Popup Content
      const popupHtml = `
        <div class="lux-map-popup">
          <div class="lux-popup-img-wrap">
            <img src="${dest.image}" alt="${dest.title}" class="lux-popup-img" />
            <span class="lux-popup-badge">${dest.country}</span>
          </div>
          <div class="lux-popup-body">
            <h4 class="lux-popup-title">${dest.title}</h4>
            <p class="lux-popup-sub">${dest.tagline || dest.region}</p>
            <div class="lux-popup-footer">
              <span class="lux-popup-price">From <strong>₹${priceText}</strong> / night</span>
              <a href="/destination/${dest.slug}" class="lux-popup-btn">View Guide &rarr;</a>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: "lux-custom-leaflet-popup",
        maxWidth: 280,
        minWidth: 260,
      });

      marker.on("click", () => {
        setSelectedDestination(dest);
        map.flyTo([dest.lat, dest.lng], 8, { duration: 1.2 });
      });

      markersRef.current[dest.id] = marker;
    });

    return () => {
      // Cleanup
    };
  }, []);

  // Update Tile Layer when layer switcher is changed
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }
    const currentLayerConfig = MAP_LAYERS[activeLayer] || MAP_LAYERS.voyager;
    tileLayerRef.current = L.tileLayer(currentLayerConfig.url, {
      attribution: currentLayerConfig.attribution,
      subdomains: currentLayerConfig.subdomains,
      maxZoom: 19,
    }).addTo(map);
  }, [activeLayer]);

  // Update active marker visual state when selectedDestination changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Refresh icon classes
    DESTINATIONS_GEO.forEach((dest) => {
      const marker = markersRef.current[dest.id];
      if (marker) {
        const isSelected = dest.id === selectedDestination.id;
        const priceText = typeof dest.startingPrice === "number" ? dest.startingPrice.toLocaleString() : dest.startingPrice;

        const updatedIcon = L.divIcon({
          className: "custom-leaflet-marker",
          html: `
            <div class="lux-pin-wrapper ${isSelected ? "active" : ""}">
              <div class="lux-pin-tag">
                <span class="lux-pin-dot"></span>
                <strong>${dest.title}</strong>
                <span class="lux-pin-price">₹${priceText}</span>
              </div>
              <div class="lux-pin-arrow"></div>
            </div>
          `,
          iconSize: [160, 48],
          iconAnchor: [80, 48],
          popupAnchor: [0, -50],
        });
        marker.setIcon(updatedIcon);

        if (isSelected) {
          marker.setZIndexOffset(1000);
        } else {
          marker.setZIndexOffset(0);
        }
      }
    });
  }, [selectedDestination]);

  // Fly to destination on selection
  const handleSelectDestination = (dest) => {
    setSelectedDestination(dest);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([dest.lat, dest.lng], 8, { duration: 1.2 });
      const marker = markersRef.current[dest.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  // Toggle View Modes (Light vs Dark)
  const handleToggleThemeMode = (mode) => {
    setTheme(mode);
    if (mode === "dark") {
      setActiveLayer("dark");
    } else {
      setActiveLayer("voyager");
    }
  };

  // Reset to Global Overview
  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([25, 15], 2.5, { duration: 1.4 });
    }
  };

  // Zoom In / Out
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };
  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  return (
    <div className="bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 min-h-screen pb-24 transition-colors duration-300">
      
      {/* Top Header & Breadcrumbs Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 sticky top-16 z-30 shadow-xs backdrop-blur-md transition-colors">
        <Container className="py-3.5 sm:py-4">
          <Breadcrumbs
            items={[
              { label: "Destinations", to: "/destinations" },
              { label: "Interactive World Atlas" },
            ]}
            className="text-slate-500 dark:text-slate-400"
          />
        </Container>
      </div>

      {/* Hero Intro Section */}
      <Container className="pt-8 sm:pt-10 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/40 bg-[#C5A880]/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#997548] dark:text-[#dfcaa4]">
              <Globe2 className="h-3.5 w-3.5 text-[#997548] dark:text-[#C5A059]" />
              Global Sanctuaries Matrix
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Interactive Destinations Atlas
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
              Explore our handpicked collection of ultra-luxury estates, mountain chalets, and private island retreats on a real dynamic world map with real-time GPS telemetry, flight hubs, and sanctuary details in both light and dark perspectives.
            </p>
          </div>

          {/* Region Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  selectedRegion === region
                    ? "bg-[#997548] dark:bg-[#C5A059] text-white dark:text-slate-950 shadow-md font-bold"
                    : "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </Container>

      {/* Main Map Explorer Split Section */}
      <Container className="py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: Real Leaflet Interactive Map Container */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-lg space-y-3 transition-colors">
              
              {/* Map Top Bar Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C5A880]/15 text-[#997548] dark:text-[#C5A059] border border-[#C5A880]/30 shadow-xs">
                    <Navigation className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Live GPS Geonavigator
                    </span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      {selectedDestination.title} • {selectedDestination.lat.toFixed(4)}° N, {selectedDestination.lng.toFixed(4)}° E
                    </span>
                  </div>
                </div>

                {/* Map Layer Switcher & Zoom Controls */}
                <div className="flex items-center gap-2">
                  {/* Layer Select */}
                  <div className="flex items-center bg-slate-100 dark:bg-slate-950 rounded-lg p-0.5 border border-slate-200 dark:border-slate-800 text-xs">
                    {Object.entries(MAP_LAYERS).map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => setActiveLayer(key)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                          activeLayer === key
                            ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {config.name.split(" ")[0]}
                      </button>
                    ))}
                  </div>

                  {/* Zoom Controls */}
                  <div className="flex items-center bg-slate-100 dark:bg-slate-950 rounded-lg p-0.5 border border-slate-200 dark:border-slate-800 text-xs">
                    <button
                      onClick={handleZoomIn}
                      className="h-6 w-6 rounded flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-bold transition-colors cursor-pointer"
                      title="Zoom In"
                    >
                      +
                    </button>
                    <button
                      onClick={handleZoomOut}
                      className="h-6 w-6 rounded flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-bold transition-colors cursor-pointer"
                      title="Zoom Out"
                    >
                      -
                    </button>
                    <button
                      onClick={handleResetView}
                      className="px-2 py-0.5 rounded text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                      title="Reset World View"
                    >
                      <RotateCcw className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* REAL LEAFLET MAP ELEMENT */}
              <div className="relative w-full h-[380px] sm:h-[460px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner z-10">
                <div ref={mapRef} className="w-full h-full" />

                {/* Floating Map Watermark Badge */}
                <div className="absolute bottom-3 left-3 z-[1000] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-lg px-3 py-1.5 shadow-sm pointer-events-none flex items-center gap-2 text-[10px] text-slate-700 dark:text-slate-300 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Real-time GPS Active • {filteredDestinations.length} Sanctuaries</span>
                </div>
              </div>

              {/* Quick Pin Jump Carousel */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Fast Sanctuary Navigator:</span>
                  <span className="text-[#997548] dark:text-[#C5A059] font-semibold">{filteredDestinations.length} Locations</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {filteredDestinations.map((dest) => {
                    const isSelected = selectedDestination.id === dest.id;
                    const priceFormatted = typeof dest.startingPrice === "number" ? dest.startingPrice.toLocaleString() : dest.startingPrice;
                    return (
                      <button
                        key={dest.id}
                        onClick={() => handleSelectDestination(dest)}
                        className={`flex items-center gap-2.5 rounded-lg p-2.5 text-left transition-all cursor-pointer border ${
                          isSelected
                            ? "bg-[#C5A880]/20 dark:bg-[#C5A880]/25 border-[#997548] dark:border-[#C5A059] text-slate-900 dark:text-white font-bold shadow-xs ring-1 ring-[#997548]/30"
                            : "bg-slate-50 dark:bg-slate-950 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                        }`}
                      >
                        <MapPin className={`h-4 w-4 shrink-0 ${isSelected ? "text-[#997548] dark:text-[#C5A059]" : "text-slate-400"}`} />
                        <div className="overflow-hidden">
                          <span className="block text-xs font-semibold truncate text-slate-900 dark:text-white">{dest.title}</span>
                          <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {dest.country} • ₹{priceFormatted}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT 5 COLS: Dynamic Destination Spotlight Dossier */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-lg transition-colors">
              
              {/* Destination Photo Frame */}
              <Link to={`/destination/${selectedDestination.slug}`} className="relative aspect-16/10 block overflow-hidden group">
                <ImageWithFallback
                  src={selectedDestination.image}
                  alt={selectedDestination.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <Badge variant="glass" size="xs">
                    {selectedDestination.region}
                  </Badge>
                  {selectedDestination.featured && (
                    <Badge variant="gold" size="xs">
                      Featured Sanctuary
                    </Badge>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#dfcaa4]">
                    {selectedDestination.country}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight drop-shadow-xs">
                    {selectedDestination.title}
                  </h3>
                </div>
              </Link>

              {/* Dossier Details */}
              <div className="p-6 space-y-5">
                
                {/* Rating & Pricing */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <Rating
                    value={selectedDestination.rating}
                    reviewsCount={selectedDestination.reviewsCount}
                    size="sm"
                  />
                  <div className="text-right">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Starting From</span>
                    <span className="text-base font-bold text-[#997548] dark:text-[#dfcaa4]">
                      ₹{typeof selectedDestination.startingPrice === "number" ? selectedDestination.startingPrice.toLocaleString() : selectedDestination.startingPrice} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/ night</span>
                    </span>
                  </div>
                </div>

                {/* Overview Text */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {selectedDestination.overview}
                </p>

                {/* Telemetry Matrix Grid */}
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                      <Calendar className="h-3.5 w-3.5 text-[#997548] dark:text-[#C5A059]" />
                      <span>Best Season</span>
                    </div>
                    <p className="text-slate-900 dark:text-slate-100 font-semibold text-xs truncate">
                      {selectedDestination.quickFacts?.bestTime || "Year-Round"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                      <Plane className="h-3.5 w-3.5 text-[#997548] dark:text-[#C5A059]" />
                      <span>Gateway Hub</span>
                    </div>
                    <p className="text-slate-900 dark:text-slate-100 font-semibold text-xs truncate">
                      {selectedDestination.quickFacts?.airport || selectedDestination.airportCode}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                      <Thermometer className="h-3.5 w-3.5 text-[#997548] dark:text-[#C5A059]" />
                      <span>Avg Climate</span>
                    </div>
                    <p className="text-slate-900 dark:text-slate-100 font-semibold text-xs truncate">
                      {selectedDestination.quickFacts?.climate || selectedDestination.climate}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                      <Clock className="h-3.5 w-3.5 text-[#997548] dark:text-[#C5A059]" />
                      <span>Timezone</span>
                    </div>
                    <p className="text-slate-900 dark:text-slate-100 font-semibold text-xs">
                      {selectedDestination.tz} Active
                    </p>
                  </div>
                </div>

                {/* Landmarks Tag Pills */}
                {selectedDestination.topLandmarks && selectedDestination.topLandmarks.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="block text-[11px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                      Highlights & Sacred Landmarks
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDestination.topLandmarks.map((landmark, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[11px] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 font-medium"
                        >
                          {landmark.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary Action Button */}
                <div className="pt-2 space-y-2">
                  <Button
                    to={`/destination/${selectedDestination.slug}`}
                    variant="primary"
                    size="md"
                    className="w-full justify-center shadow-md font-bold"
                    rightIcon={ArrowRight}
                  >
                    Explore Complete Destination Guide
                  </Button>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Button
                      to="/rooms"
                      variant="outline"
                      size="sm"
                      className="justify-center border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Browse Suites ({selectedDestination.propertiesCount})
                    </Button>
                    <Button
                      to="/tours"
                      variant="outline"
                      size="sm"
                      className="justify-center border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Bespoke Tours ({selectedDestination.toursCount})
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </Container>

      {/* Global Concierge Guidance Banner */}
      <Container className="pt-10">
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-[#0d1527] dark:to-slate-900 p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#997548] dark:text-[#C5A059]">
              <ShieldCheck className="h-4 w-4" />
              <span>Private Aviation & Superyacht Transfers</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
              Need Bespoke Flight or Tender Coordination?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              Our 24/7 Chief Concierge manages direct private jet charters, helicopter transfers to mountain helipads, and luxury yacht tender arrivals across all sanctuaries.
            </p>
          </div>

          <Button
            to="/contact"
            variant="primary"
            size="md"
            className="shrink-0 font-bold shadow-md"
            rightIcon={ArrowRight}
          >
            Speak with Air & Sea Concierge
          </Button>
        </div>
      </Container>

      {/* Injected CSS for Custom Leaflet Luxury Gold Pins and Popups (Light & Dark Support) */}
      <style>{`
        .custom-leaflet-marker {
          background: transparent !important;
          border: none !important;
        }
        .lux-pin-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .lux-pin-wrapper:hover,
        .lux-pin-wrapper.active {
          transform: translateY(-4px) scale(1.08);
          z-index: 1000 !important;
        }
        .lux-pin-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border: 1.5px solid #997548;
          color: #0f172a;
          padding: 5px 10px;
          border-radius: 9999px;
          font-size: 11px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
          white-space: nowrap;
        }
        .dark .lux-pin-tag {
          background: #0f172a;
          border: 1.5px solid #C5A059;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(0,0,0,0.5);
        }
        .lux-pin-wrapper.active .lux-pin-tag {
          background: #997548;
          color: #ffffff;
          border-color: #ffffff;
          box-shadow: 0 6px 20px rgba(153,117,72,0.45);
        }
        .dark .lux-pin-wrapper.active .lux-pin-tag {
          background: #C5A059;
          color: #0f172a;
          border-color: #ffffff;
          box-shadow: 0 6px 20px rgba(197,160,89,0.55);
        }
        .lux-pin-dot {
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background: #997548;
        }
        .dark .lux-pin-dot {
          background: #C5A059;
        }
        .lux-pin-wrapper.active .lux-pin-dot {
          background: #ffffff;
        }
        .dark .lux-pin-wrapper.active .lux-pin-dot {
          background: #0f172a;
        }
        .lux-pin-price {
          font-size: 10px;
          opacity: 0.85;
          font-weight: 500;
        }
        .lux-pin-arrow {
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid #997548;
          margin-top: -1px;
        }
        .dark .lux-pin-arrow {
          border-top-color: #C5A059;
        }
        .lux-pin-wrapper.active .lux-pin-arrow {
          border-top-color: #997548;
        }
        .dark .lux-pin-wrapper.active .lux-pin-arrow {
          border-top-color: #C5A059;
        }
        .lux-custom-leaflet-popup .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 12px !important;
          overflow: hidden !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.18) !important;
          border: 1px solid #e2e8f0 !important;
        }
        .dark .lux-custom-leaflet-popup .leaflet-popup-content-wrapper {
          background: #0f172a !important;
          border: 1px solid #1e293b !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6) !important;
        }
        .lux-custom-leaflet-popup .leaflet-popup-content {
          margin: 0 !important;
          line-height: 1.4 !important;
        }
        .lux-map-popup {
          font-family: inherit;
        }
        .lux-popup-img-wrap {
          position: relative;
          height: 110px;
          overflow: hidden;
        }
        .lux-popup-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .lux-popup-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .lux-popup-body {
          padding: 10px 12px;
        }
        .lux-popup-title {
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .dark .lux-popup-title {
          color: #ffffff;
        }
        .lux-popup-sub {
          font-size: 10px;
          color: #64748b;
          margin: 2px 0 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dark .lux-popup-sub {
          color: #94a3b8;
        }
        .lux-popup-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #f1f5f9;
          padding-top: 6px;
        }
        .dark .lux-popup-footer {
          border-top: 1px solid #1e293b;
        }
        .lux-popup-price {
          font-size: 10px;
          color: #64748b;
        }
        .dark .lux-popup-price {
          color: #94a3b8;
        }
        .lux-popup-price strong {
          color: #997548;
          font-size: 11px;
        }
        .dark .lux-popup-price strong {
          color: #dfcaa4;
        }
        .lux-popup-btn {
          font-size: 10px;
          font-weight: 700;
          color: #997548;
          text-decoration: none;
        }
        .dark .lux-popup-btn {
          color: #dfcaa4;
        }
        .lux-popup-btn:hover {
          text-decoration: underline;
        }
      `}</style>

    </div>
  );
}
