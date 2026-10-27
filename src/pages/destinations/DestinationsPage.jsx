import { useState, useMemo, useEffect, useRef } from "react";
import {
  LuLayoutGrid as LayoutGrid,
  LuLayers as Layers,
  LuList as List,
  LuMapPin as MapPin,
  LuArrowUpDown as ArrowUpDown,
  LuSlidersHorizontal as SlidersHorizontal
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import DestinationCard from "../../components/destinations/DestinationCard";
import DestinationSidebarFilters from "../../components/destinations/DestinationSidebarFilters";
import DestinationTopFilters from "../../components/destinations/DestinationTopFilters";
import DestinationTable from "../../components/destinations/DestinationTable";
import Pagination from "../../components/common/Pagination";
import EmptyState from "../../components/common/EmptyState";
import { DESTINATIONS_DATA } from "../../data/destinations";

const ITEMS_PER_PAGE = 9;

export default function DestinationsPage({ initialLayout, initialView = "grid" }) {
  const [viewMode, setViewMode] = useState(initialView || "grid");
  const [layout, setLayout] = useState(initialLayout || "overlay"); // overlay (magazine), standard
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    region: "all",
    searchQuery: "",
    maxPrice: 80000,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const gridTopRef = useRef(null);

  useEffect(() => {
    if (initialView) {
      setViewMode(initialView);
    }
  }, [initialView]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({ region: "all", searchQuery: "", maxPrice: 80000 });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Filtered & Sorted Destinations
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS_DATA.filter((dest) => {
      // Region filter
      if (filters.region !== "all" && dest.region !== filters.region) {
        return false;
      }
      // Search keyword filter
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = dest.title?.toLowerCase().includes(q);
        const matchesCountry = dest.country?.toLowerCase().includes(q);
        const matchesTagline = dest.tagline?.toLowerCase().includes(q);
        const matchesRegion = dest.region?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCountry && !matchesTagline && !matchesRegion) {
          return false;
        }
      }
      // Max price filter
      if (dest.startingPrice && dest.startingPrice > filters.maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return (a.startingPrice || 0) - (b.startingPrice || 0);
      if (sortBy === "price-high") return (b.startingPrice || 0) - (a.startingPrice || 0);
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "properties") return (b.propertiesCount || 0) - (a.propertiesCount || 0);
      return b.featured ? 1 : -1;
    });
  }, [filters, sortBy]);

  // Pagination Calculation
  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
  const paginatedDestinations = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDestinations.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDestinations, currentPage]);

  const startItem = filteredDestinations.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredDestinations.length);

  return (
    <div className="space-y-12 pb-24 bg-transparent text-slate-900 dark:text-slate-100">
      {/* Hero Banner */}
      <section className="relative bg-slate-950 py-16 sm:py-24 text-white z-30">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
        </div>
        <Container className="relative z-20">
          <Breadcrumbs
            items={[
              { label: "Travel & Tours", path: "/destinations" },
              { label: "Curated Destinations" },
            ]}
            dark
            className="mb-6"
          />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              Global Sanctuaries & Escapes
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Curated Worldwide Destinations
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
              From sun-drenched Mediterranean sea cliffs to mystical Balinese valleys, pristine 
              Swiss alpine glaciers, and remote Polynesian coral lagoons. Discover 21 extraordinary sanctuaries.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content & Destination Listings */}
      <Container className="relative z-10">
        <div ref={gridTopRef}>
          {viewMode === "list" ? (
            /* ======================================================================= */
            /* LIST VIEW: Full-Width Layout with Top Filter Bar Above Destination List  */
            /* ======================================================================= */
            <div className="space-y-8">
              <DestinationTopFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                totalResults={filteredDestinations.length}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />

              {filteredDestinations.length === 0 ? (
                <EmptyState
                  title="No Destinations Found"
                  description="No sanctuaries match your selected filters. Please adjust your search keyword or price range."
                  actionLabel="View All Destinations"
                  onAction={handleResetFilters}
                />
              ) : (
                <DestinationTable destinations={paginatedDestinations} />
              )}

              {totalPages > 1 && (
                <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          ) : (
            /* ======================================================================= */
            /* GRID VIEW: 4-Column Layout with Sidebar Filter at Side                  */
            /* ======================================================================= */
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              {/* Desktop Filter Sidebar */}
              <div className="hidden lg:block lg:col-span-1 sticky top-24">
                <DestinationSidebarFilters
                  filters={filters}
                  onChange={handleFilterChange}
                  onReset={handleResetFilters}
                  totalResults={filteredDestinations.length}
                />
              </div>

              {/* Grid Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Grid Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-4 shadow-xs">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                      className="lg:hidden flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      <SlidersHorizontal className="h-4 w-4 text-[#C5A880]" />
                      <span>Filters ({filteredDestinations.length})</span>
                    </button>

                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Showing <strong className="text-slate-900 dark:text-white">{startItem}–{endItem}</strong> of <strong className="text-slate-900 dark:text-white">{filteredDestinations.length}</strong> destinations
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-[#070b14] py-1.5 pl-2.5 pr-8 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:border-[#C5A880] focus:outline-none cursor-pointer"
                      >
                        <option value="featured">Featured Destinations</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="properties">Most Stays</option>
                      </select>
                    </div>

                    {/* Magazine / Grid Style Switcher */}
                    <div className="hidden sm:flex items-center rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 text-xs">
                      <button
                        type="button"
                        onClick={() => setLayout("overlay")}
                        className={`rounded-lg px-2 py-1 transition-colors cursor-pointer ${
                          layout === "overlay"
                            ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold"
                            : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        Magazine
                      </button>
                      <button
                        type="button"
                        onClick={() => setLayout("standard")}
                        className={`rounded-lg px-2 py-1 transition-colors cursor-pointer ${
                          layout === "standard"
                            ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold"
                            : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        Card
                      </button>
                    </div>

                    {/* Grid / List Switcher */}
                    <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => setViewMode("grid")}
                        className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                          viewMode === "grid"
                            ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                            : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        }`}
                        title="Grid View"
                        aria-label="Grid View"
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("list")}
                        className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                          viewMode === "list"
                            ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                            : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        }`}
                        title="List View"
                        aria-label="List View"
                      >
                        <List className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Filter Drawer */}
                {mobileFiltersOpen && (
                  <div className="lg:hidden mb-6">
                    <DestinationSidebarFilters
                      filters={filters}
                      onChange={handleFilterChange}
                      onReset={handleResetFilters}
                      totalResults={filteredDestinations.length}
                    />
                  </div>
                )}

                {/* Grid Output */}
                {filteredDestinations.length === 0 ? (
                  <EmptyState
                    title="No Destinations Found"
                    description="No sanctuaries match your selected filters. Please adjust your search keyword or price range."
                    actionLabel="View All Destinations"
                    onAction={handleResetFilters}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedDestinations.map((dest) => (
                      <DestinationCard
                        key={dest.id}
                        destination={dest}
                        variant={layout}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

