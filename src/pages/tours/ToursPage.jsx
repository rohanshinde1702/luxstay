import { useState, useMemo } from "react";
import {
  LuCompass as Compass,
  LuLayoutGrid as Grid,
  LuList as ListIcon,
  LuSlidersHorizontal as SlidersHorizontal,
  LuX as X,
  LuSparkles as Sparkles,
  LuShieldCheck as ShieldCheck,
  LuAward as Award
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import Pagination from "../../components/common/Pagination";
import TourCard from "../../components/tours/TourCard";
import TourFilters from "../../components/tours/TourFilters";
import TourBookingModal from "../../components/tours/TourBookingModal";
import { TOURS_DATA } from "../../data/tours";
import { TOUR_SORT_OPTIONS } from "../../constants/travelFilters";

const ITEMS_PER_PAGE = 6;

export default function ToursPage() {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedTourForBooking, setSelectedTourForBooking] = useState(null);

  const initialFilters = {
    search: "",
    category: "all",
    duration: "all",
    activityLevel: "all",
    priceRange: [0, 100000],
  };

  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
  };

  // Filtered & Sorted Tours
  const filteredTours = useMemo(() => {
    let result = [...TOURS_DATA];

    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.destination.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (filters.category !== "all") {
      result = result.filter((t) => t.category === filters.category);
    }

    // Duration
    if (filters.duration !== "all") {
      result = result.filter((t) => {
        if (filters.duration === "half-day") return t.duration.toLowerCase().includes("half") || t.duration.includes("4 Hours") || t.duration.includes("3 Hours");
        if (filters.duration === "full-day") return t.duration.toLowerCase().includes("full") || t.duration.includes("8 Hours") || t.duration.includes("6 Hours");
        if (filters.duration === "multi-day") return t.duration.toLowerCase().includes("day") && !t.duration.toLowerCase().includes("hour");
        return true;
      });
    }

    // Activity Level
    if (filters.activityLevel !== "all") {
      result = result.filter((t) =>
        t.activityLevel.toLowerCase().includes(filters.activityLevel.toLowerCase())
      );
    }

    // Price
    result = result.filter(
      (t) => t.price >= filters.priceRange[0] && t.price <= filters.priceRange[1]
    );

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "featured") {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredTours.length / ITEMS_PER_PAGE);
  const paginatedTours = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTours.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTours, currentPage]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count++;
    if (filters.category !== "all") count++;
    if (filters.duration !== "all") count++;
    if (filters.activityLevel !== "all") count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100000) count++;
    return count;
  }, [filters]);

  return (
    <div className="bg-slate-50 dark:bg-[#070b14] min-h-screen text-slate-800 dark:text-slate-100 transition-colors">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-24 text-white">
        <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
            alt="Luxury Tours Background"
            className="h-full w-full object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/90 to-slate-950 z-0" />

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Curated Expeditions", to: "/tours" },
              ]}
              className="justify-center text-slate-400"
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#dfcaa4]">
              <Compass className="h-3.5 w-3.5" />
              Bespoke Itineraries & Charters
            </div>
            <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Extraordinary Expeditions
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Step beyond the ordinary with private yacht charters, high-altitude helicopter landings, and master-led cultural journeys curated exclusively for LuxStay guests.
            </p>

            {/* Quick Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#C5A880]" />
                <span>Certified Mountain & Marine Masters</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#C5A880]" />
                <span>Private & VIP Small Groups</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#C5A880]" />
                <span>100% Tailored Experiences</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-6 shadow-xs transition-colors">
              <TourFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>
          </aside>

          {/* Tours Content Column */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-4 shadow-xs transition-colors">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4 text-[#C5A880]" />
                  <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                </Button>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Showing <span className="font-bold text-slate-900 dark:text-white">{filteredTours.length}</span> luxury expeditions
                </p>
              </div>

              {/* Controls: Sort & Grid/List Switcher */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-tours" className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
                    Sort by:
                  </label>
                  <select
                    id="sort-tours"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort tours by"
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070b14] px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 focus:border-[#C5A880] focus:outline-hidden focus:ring-2 focus:ring-[#C5A880]/20 cursor-pointer"
                  >
                    {TOUR_SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="dark:bg-slate-900">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    }`}
                    title="Grid View"
                    aria-label="Grid View"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                      viewMode === "list"
                        ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    }`}
                    title="List View"
                    aria-label="List View"
                  >
                    <ListIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Pill Bar */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-500">Active filters:</span>
                {filters.category !== "all" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#C5A880]/15 px-3 py-1 text-xs font-medium text-[#7d5f34]">
                    Category: {filters.category}
                    <button
                      onClick={() => handleFilterChange("category", "all")}
                      className="hover:text-slate-900 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filters.duration !== "all" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#C5A880]/15 px-3 py-1 text-xs font-medium text-[#7d5f34]">
                    Duration: {filters.duration}
                    <button
                      onClick={() => handleFilterChange("duration", "all")}
                      className="hover:text-slate-900 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filters.activityLevel !== "all" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#C5A880]/15 px-3 py-1 text-xs font-medium text-[#7d5f34]">
                    Level: {filters.activityLevel}
                    <button
                      onClick={() => handleFilterChange("activityLevel", "all")}
                      className="hover:text-slate-900 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-medium text-red-600 hover:underline cursor-pointer ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Tours Grid / List */}
            {paginatedTours.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
                    : "space-y-6"
                }
              >
                {paginatedTours.map((tour) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    variant={viewMode}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Expeditions Found"
                description="We couldn't find any tours matching your active criteria. Try broadening your filter preferences."
                actionLabel="Reset Filters"
                onAction={handleResetFilters}
              />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}

            {/* Custom Expedition CTA Box */}
            <div className="rounded-lg bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 p-8 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
              <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div className="space-y-2 max-w-xl">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#dfcaa4]">
                    Private Concierge Charter
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                    Need a 100% Customized Expedition?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Our lead expedition designers can organize private yacht charters, alpine heli-ski drops, and after-hours museum entries tailored to your party.
                  </p>
                </div>
                <Button
                  to="/activities"
                  variant="primary"
                  size="lg"
                  className="shrink-0"
                >
                  Explore Activities
                </Button>
              </div>
            </div>
          </main>
        </div>
      </Container>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-white p-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Filter Expeditions
              </h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <TourFilters
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
            />
            <div className="pt-6 mt-auto">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Show {filteredTours.length} Results
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tour Booking Modal */}
      <TourBookingModal
        isOpen={!!selectedTourForBooking}
        onClose={() => setSelectedTourForBooking(null)}
        tour={selectedTourForBooking}
      />
    </div>
  );
}
