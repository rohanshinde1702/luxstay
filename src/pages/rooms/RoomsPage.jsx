import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  LuLayoutGrid as LayoutGrid,
  LuList as List,
  LuArrowUpDown as ArrowUpDown,
  LuSlidersHorizontal as SlidersHorizontal
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import RoomCard from "../../components/rooms/RoomCard";
import RoomTable from "../../components/rooms/RoomTable";
import RoomFilters from "../../components/rooms/RoomFilters";
import RoomTopFilters from "../../components/rooms/RoomTopFilters";
import BookingSearchWidget from "../../components/booking/BookingSearchWidget";
import BookingModal from "../../components/booking/BookingModal";
import EmptyState from "../../components/common/EmptyState";
import Pagination from "../../components/common/Pagination";
import { ROOMS_DATA } from "../../data/rooms";

export default function RoomsPage({ initialView = "grid" }) {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState(initialView);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);

  // Synchronize viewMode whenever initialView prop changes (e.g. from navbar navigation)
  useEffect(() => {
    setViewMode(initialView);
  }, [initialView]);

  // Filters State synced with searchParams
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
    destination: searchParams.get("dest") || searchParams.get("destination") || "all",
    maxPrice: Number(searchParams.get("maxPrice")) || 80000,
    minGuests: Number(searchParams.get("guests")) || 1,
    selectedAmenities: [],
  });

  useEffect(() => {
    const paramCategory = searchParams.get("category") || "all";
    const paramDest = searchParams.get("dest") || searchParams.get("destination") || "all";
    const paramGuests = Number(searchParams.get("guests")) || 1;
    const paramMaxPrice = Number(searchParams.get("maxPrice")) || 80000;

    setFilters((prev) => ({
      ...prev,
      category: paramCategory,
      destination: paramDest,
      minGuests: paramGuests,
      maxPrice: paramMaxPrice,
    }));
    setCurrentPage(1);
  }, [searchParams]);

  const handleResetFilters = () => {
    setFilters({
      category: "all",
      destination: "all",
      maxPrice: 80000,
      minGuests: 1,
      selectedAmenities: [],
    });
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredRooms = useMemo(() => {
    return ROOMS_DATA.filter((room) => {
      // Category filter
      if (filters.category !== "all" && room.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
      // Destination / keyword filter
      if (filters.destination && filters.destination !== "all") {
        const dQuery = filters.destination.toLowerCase();
        const matchesDest =
          (room.destination && room.destination.toLowerCase().includes(dQuery)) ||
          (room.tagline && room.tagline.toLowerCase().includes(dQuery)) ||
          (room.description && room.description.toLowerCase().includes(dQuery)) ||
          (room.name && room.name.toLowerCase().includes(dQuery));
        if (!matchesDest) return false;
      }
      // Price filter
      if (room.price > filters.maxPrice) {
        return false;
      }
      // Guests filter
      if (room.guests < filters.minGuests) {
        return false;
      }
      // Amenities filter
      if (filters.selectedAmenities.length > 0) {
        const hasAllAmenities = filters.selectedAmenities.every((amenityKey) =>
          room.amenityKeys ? room.amenityKeys.includes(amenityKey) : true
        );
        if (!hasAllAmenities) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.featured ? 1 : -1; // Default featured
    });
  }, [filters, sortBy]);

  // Pagination (6 per page)
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage) || 1;
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="relative bg-slate-950 py-16 sm:py-20 text-white z-30">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
        </div>
        <Container className="relative z-20">
          <Breadcrumbs
            items={[
              { label: "Suites & Villas", path: "/rooms" },
              { label: "All Accommodations" },
            ]}
            dark
            className="mb-6"
          />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              Accommodations Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Curated Suites, Chalets & Private Villas
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
              Each accommodation is an architectural statement offering absolute privacy, 
              panoramic views, and dedicated 24/7 butler service.
            </p>
          </div>

          {/* Quick Search Widget */}
          <div className="mt-10 relative z-30">
            <BookingSearchWidget />
          </div>
        </Container>
      </section>

      {/* Main Listing Content & Filters */}
      <Container className="relative z-10">
        {viewMode === "list" ? (
          /* ========================================================================= */
          /* LIST VIEW: Full-Width Layout with Top Filter Bar Above Room Library       */
          /* ========================================================================= */
          <div className="space-y-8">
            {/* Top Filter Bar Component exclusively for List View */}
            <RoomTopFilters
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              totalResults={filteredRooms.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {/* List Results */}
            {filteredRooms.length === 0 ? (
              <EmptyState
                title="No Stays Found"
                description="We could not find any sanctuaries matching your selected filters. Please adjust your price or amenities."
                actionLabel="Reset All Criteria"
                onAction={handleResetFilters}
              />
            ) : (
              <RoomTable
                rooms={paginatedRooms}
                onBook={(room) => setSelectedRoomForBooking(room)}
              />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        ) : (
          /* ========================================================================= */
          /* GRID VIEW: Original Layout with Left Sidebar Filters                      */
          /* ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block lg:col-span-1 sticky top-24">
              <RoomFilters
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
              />
            </div>

            {/* Listing Grid & Results */}
            <div className="lg:col-span-3 space-y-6">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-4 shadow-xs transition-colors">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                    className="lg:hidden flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200"
                  >
                    <SlidersHorizontal className="h-4 w-4 text-[#C5A880]" />
                    <span>Filters ({filteredRooms.length})</span>
                  </button>

                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Showing <span className="font-bold text-slate-900 dark:text-white">{filteredRooms.length}</span> luxury suites & villas
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070b14] py-1.5 pl-2.5 pr-8 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:border-[#C5A880] focus:outline-none cursor-pointer"
                    >
                      <option value="featured">Featured Suites</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>

                  {/* View Switcher */}
                  <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setViewMode("grid")}
                      className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                        viewMode === "grid"
                          ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      }`}
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
                  <RoomFilters
                    filters={filters}
                    onChange={setFilters}
                    onReset={handleResetFilters}
                  />
                </div>
              )}

              {/* Room Cards Output in Grid View */}
              {filteredRooms.length === 0 ? (
                <EmptyState
                  title="No Stays Found"
                  description="We could not find any sanctuaries matching your selected filters. Please adjust your price or amenities."
                  actionLabel="Reset All Criteria"
                  onAction={handleResetFilters}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {paginatedRooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      variant="grid"
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </Container>

      {/* Booking Modal */}
      {selectedRoomForBooking && (
        <BookingModal
          isOpen={Boolean(selectedRoomForBooking)}
          onClose={() => setSelectedRoomForBooking(null)}
          room={selectedRoomForBooking}
        />
      )}
    </div>
  );
}
