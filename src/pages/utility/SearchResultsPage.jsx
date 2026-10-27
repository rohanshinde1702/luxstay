import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  LuSearch as Search
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import RoomCard from "../../components/rooms/RoomCard";
import TourCard from "../../components/tours/TourCard";
import DestinationCard from "../../components/destinations/DestinationCard";
import { ROOMS_DATA } from "../../data/rooms";
import { TOURS_DATA } from "../../data/tours";
import { DESTINATIONS_DATA } from "../../data/destinations";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'rooms' | 'tours' | 'destinations'

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        rooms: ROOMS_DATA.slice(0, 3),
        tours: TOURS_DATA.slice(0, 2),
        destinations: DESTINATIONS_DATA.slice(0, 3),
      };
    }

    const matchedRooms = ROOMS_DATA.filter(
      (r) =>
        (r.name && r.name.toLowerCase().includes(q)) ||
        (r.title && r.title.toLowerCase().includes(q)) ||
        r.category.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.tagline && r.tagline.toLowerCase().includes(q))
    );

    const matchedTours = TOURS_DATA.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.destination.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );

    const matchedDestinations = DESTINATIONS_DATA.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q)
    );

    return {
      rooms: matchedRooms,
      tours: matchedTours,
      destinations: matchedDestinations,
    };
  }, [query]);

  const totalResults =
    results.rooms.length + results.tours.length + results.destinations.length;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Search Header */}
      <section className="bg-slate-950 text-white py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Universal Search" },
              ]}
              className="justify-center text-slate-400"
            />
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Search Sanctuary & Expeditions
            </h1>

            {/* Universal Search Input */}
            <div className="relative max-w-2xl mx-auto pt-4">
              <input
                type="text"
                required
                placeholder="Search suites, villas, destinations, yachts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-md py-4 pl-12 pr-4 text-sm text-white placeholder-slate-400 focus:border-[#C5A880] focus:outline-hidden shadow-2xl"
              />
              <Search className="absolute left-4 top-8 h-5 w-5 text-slate-400" />
            </div>
          </div>
        </Container>
      </section>

      {/* Results Container */}
      <Container className="py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-10">
          <div className="flex gap-2">
            {[
              { id: "all", label: `All (${totalResults})` },
              { id: "rooms", label: `Suites & Villas (${results.rooms.length})` },
              { id: "tours", label: `Expeditions (${results.tours.length})` },
              { id: "destinations", label: `Destinations (${results.destinations.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500">
            {query ? `Search results for "${query}"` : "Featured recommendations"}
          </span>
        </div>

        <div className="space-y-16">
          {/* Rooms Section */}
          {(activeTab === "all" || activeTab === "rooms") && results.rooms.length > 0 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Suites & Villas ({results.rooms.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.rooms.map((room) => (
                  <RoomCard key={room.id} room={room} variant="grid" />
                ))}
              </div>
            </div>
          )}

          {/* Tours Section */}
          {(activeTab === "all" || activeTab === "tours") && results.tours.length > 0 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Private Expeditions & Tours ({results.tours.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {results.tours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} variant="list" />
                ))}
              </div>
            </div>
          )}

          {/* Destinations Section */}
          {(activeTab === "all" || activeTab === "destinations") && results.destinations.length > 0 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Destinations ({results.destinations.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {results.destinations.map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} variant="overlay" />
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
