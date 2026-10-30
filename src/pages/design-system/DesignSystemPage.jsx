import { useState } from "react";
import {
  LuSparkles as Sparkles,
  LuSearch as Search,
  LuCalendar as Calendar,
  LuMail as Mail,
  LuArrowRight as ArrowRight,
  LuDownload as Download,
  LuHeart as Heart,
  LuCircleCheck as CheckCircle2,
  LuFilter as Filter,
  LuEye as Eye
} from "react-icons/lu";
import Container from "../../components/common/Container";
import SectionHeading from "../../components/common/SectionHeading";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import Rating from "../../components/common/Rating";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Modal from "../../components/common/Modal";
import Tabs from "../../components/common/Tabs";
import Pagination from "../../components/common/Pagination";
import EmptyState from "../../components/common/EmptyState";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";

// Card Foundations
import RoomCard from "../../components/rooms/RoomCard";
import ServiceCard from "../../components/services/ServiceCard";
import DestinationCard from "../../components/destinations/DestinationCard";
import TourCard from "../../components/tours/TourCard";
import TestimonialCard from "../../components/common/TestimonialCard";
import BlogCard from "../../components/blog/BlogCard";

// Mock data
import { ROOMS_DATA } from "../../data/rooms";
import { SERVICES_DATA } from "../../data/services";
import { DESTINATIONS_DATA } from "../../data/destinations";
import { TOURS_DATA } from "../../data/tours";
import { TESTIMONIALS_DATA } from "../../data/testimonials";
import ReviewsSlider from "../../components/common/ReviewsSlider";
import { BLOG_DATA } from "../../data/blog";
import { useToast } from "../../hooks/useToast";

export default function DesignSystemPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [activeTabVariant, setActiveTabVariant] = useState("pills");
  const [interactiveRating, setInteractiveRating] = useState(4.5);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("villa");

  const showcaseTabs = [
    { id: "all", label: "All Components", badge: "Live" },
    { id: "primitives", label: "UI Primitives" },
    { id: "forms", label: "Forms & Controls" },
    { id: "cards", label: "Hospitality Cards" },
    { id: "feedback", label: "States & Feedback" },
  ];

  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container>
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Overview", path: "/about" },
            { label: "Design System Showcase" },
          ]}
          className="mb-8"
        />

        {/* Header */}
        <SectionHeading
          eyebrow="Living Component Library"
          title="LuxStay Reusable"
          highlight="Component Foundation"
          description="Explore the unified design tokens, accessible UI primitives, and hospitality card templates built with Tailwind CSS v4 and React 19."
          align="left"
          action={
            <Button
              variant="gold"
              size="sm"
              leftIcon={Eye}
              onClick={() => setModalOpen(true)}
            >
              Test Modal Dialog
            </Button>
          }
        />

        {/* Interactive Filter Tabs */}
        <div className="border-b border-slate-200 pb-4 mb-10">
          <Tabs
            tabs={showcaseTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="contained"
          />
        </div>

        {/* SECTION 1: BUTTONS & BADGES */}
        {(activeTab === "all" || activeTab === "primitives") && (
          <section className="space-y-8 rounded-lg border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xs mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#997548]">
                UI Primitives
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                Buttons & Interactive Controls
              </h3>
            </div>

            {/* Button Variants */}
            <div className="space-y-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Button Styles & Variants
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary Slate</Button>
                <Button variant="gold">Gold Luxury</Button>
                <Button variant="accent">Accent Hover</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost Link</Button>
                <Button variant="dark">Dark Slate</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>

            {/* Button Sizes & Icons */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Button Sizes, Icons & Loading States
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="xs" leftIcon={Sparkles}>Extra Small</Button>
                <Button size="sm" leftIcon={Calendar}>Small Button</Button>
                <Button size="md" rightIcon={ArrowRight}>Medium Default</Button>
                <Button size="lg" leftIcon={Download}>Large Action</Button>
                <Button isLoading variant="primary">Processing</Button>
              </div>
            </div>

            {/* Badges */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Status & Category Badges
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="gold" dot>Gold Verified</Badge>
                <Badge variant="navy" icon={Sparkles}>Navy Elite</Badge>
                <Badge variant="emerald" dot>Instant Booking</Badge>
                <Badge variant="amber" icon={Heart}>Best Seller</Badge>
                <Badge variant="rose">Only 1 Left</Badge>
                <Badge variant="slate">Standard</Badge>
                <Badge variant="outline">Bordered</Badge>
                <Badge variant="glass">Glassmorphism Overlay</Badge>
              </div>
            </div>

            {/* Ratings */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Ratings (Display & Interactive)
              </p>
              <div className="flex flex-wrap items-center gap-8">
                <div>
                  <span className="block text-[11px] text-slate-400 mb-1">Display Mode</span>
                  <Rating value={4.98} reviewsCount={142} size="md" />
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400 mb-1">
                    Interactive Selector (Current: {interactiveRating} Stars)
                  </span>
                  <Rating
                    value={interactiveRating}
                    interactive
                    onChange={setInteractiveRating}
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: FORMS & CONTROLS */}
        {(activeTab === "all" || activeTab === "forms") && (
          <section className="space-y-8 rounded-lg border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xs mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#997548]">
                Form Controls
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                Inputs, Selects & Tab Navigation
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Input
                label="Full Name"
                placeholder="e.g. Lord Alexander"
                required
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <Input
                label="Email Address"
                type="email"
                required
                icon={Mail}
                placeholder="concierge@luxstay.com"
                helperText="We will send your reservation confirmation here."
              />

              <Input
                label="Promo Code"
                required
                icon={Sparkles}
                placeholder="LUXURY2026"
                error="Invalid promotional code"
              />

              <Select
                label="Accommodation Category"
                required
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                options={[
                  { value: "villa", label: "Private Sanctuary Villa" },
                  { value: "suite", label: "Deluxe Panoramic Suite" },
                  { value: "chalet", label: "Alpine Timber Chalet" },
                  { value: "penthouse", label: "Skyline Penthouse" },
                ]}
              />

              <Select
                label="Filter by Amenity"
                required
                icon={Filter}
                options={[
                  "Infinity Pool",
                  "Butler Service",
                  "Ski-in / Ski-out",
                  "Private Chef",
                ]}
              />

              <Input
                label="Search Keyword"
                required
                icon={Search}
                placeholder="Search villas..."
              />
            </div>

            {/* Tab Styles Showcase */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Tab Styles (Pills, Luxury, Underline, Contained)
              </p>
              <div className="space-y-4">
                <Tabs
                  tabs={[
                    { id: "pills", label: "Pills Variant" },
                    { id: "luxury", label: "Luxury Gold" },
                    { id: "underline", label: "Underline Indicator" },
                    { id: "contained", label: "Contained Pill" },
                  ]}
                  activeTab={activeTabVariant}
                  onChange={setActiveTabVariant}
                  variant={activeTabVariant}
                />
              </div>
            </div>

            {/* Pagination Component */}
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Pagination Component
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={8}
                onPageChange={setCurrentPage}
              />
            </div>
          </section>
        )}

        {/* SECTION 3: HOSPITALITY CARDS */}
        {(activeTab === "all" || activeTab === "cards") && (
          <div className="space-y-16 mb-12">
            {/* Rooms Cards */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#997548]">
                    Room Card Foundations
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                    Suites & Villas (Grid & List Views)
                  </h3>
                </div>
              </div>

              {/* Grid 2-cols */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ROOMS_DATA.slice(0, 3).map((room) => (
                  <RoomCard key={room.id} room={room} variant="grid" />
                ))}
              </div>

              {/* List View Example */}
              <div className="pt-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  Room Card — List Layout Variant
                </p>
                <RoomCard room={ROOMS_DATA[0]} variant="list" />
              </div>
            </div>

            {/* Destinations & Tours */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#997548]">
                  Travel Card Foundations
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  Destinations & Curated Tours
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {DESTINATIONS_DATA.slice(0, 3).map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} variant="overlay" />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {TOURS_DATA.slice(0, 3).map((tour) => (
                  <TourCard key={tour.id} tour={tour} variant="grid" />
                ))}
              </div>
            </div>

            {/* Services & Testimonials */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#997548]">
                  Experiences & Reviews
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  Services & Guest Testimonials
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SERVICES_DATA.slice(0, 2).map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              <div className="pt-4">
                <ReviewsSlider
                  items={TESTIMONIALS_DATA}
                  renderItem={(item) => (
                    <TestimonialCard testimonial={item} className="h-full" />
                  )}
                />
              </div>
            </div>

            {/* Blog Cards */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#997548]">
                  Editorial Journal
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  Travel & Hospitality Blog Cards
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BLOG_DATA.map((post) => (
                  <BlogCard key={post.id} post={post} variant="grid" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: FEEDBACK & APPLICATION STATES */}
        {(activeTab === "all" || activeTab === "feedback") && (
          <section className="space-y-12 rounded-lg border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xs mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#997548]">
                Application States
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                Empty, Loading & Error Feedback States
              </h3>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Empty State
                </p>
                <EmptyState
                  title="No Matching Suites in Aspen"
                  description="Try selecting different dates or clearing your minimum bedroom requirement."
                  actionLabel="Clear All Filters"
                  onAction={() => addToast("Filters reset successfully", "info")}
                />
              </div>

              <div className="pt-6 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Loading Skeleton Grid
                </p>
                <LoadingState type="skeleton-grid" count={3} />
              </div>

              <div className="pt-6 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Error Recovery State
                </p>
                <ErrorState
                  title="Unable to Retrieve Rates"
                  message="Our booking server is temporarily undergoing scheduled maintenance. Please retry in a few moments."
                  onRetry={() => addToast("Retrying request...", "info")}
                />
              </div>
            </div>
          </section>
        )}

        {/* Interactive Modal Demo */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Reserve Presidential Sanctuary Villa"
          description="Complimentary VIP airport transfer & 24/7 butler service included with direct booking."
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="gold"
                size="sm"
                rightIcon={CheckCircle2}
                onClick={() => {
                  addToast("Reservation simulated successfully!", "success");
                  setModalOpen(false);
                }}
              >
                Confirm Direct Reservation
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs text-slate-600">
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-2">
              <div className="flex justify-between font-medium">
                <span className="text-slate-500">Suite Rate:</span>
                <span className="font-bold text-slate-900">₹24,500 / night</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-500">Duration:</span>
                <span className="font-bold text-slate-900">3 Nights (Oct 12 – Oct 15)</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-500">Concierge Fee:</span>
                <span className="font-bold text-emerald-600">Complimentary (₹0.00)</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                <span>Total Estimated:</span>
                <span className="text-[#997548] font-serif text-lg">₹73,500.00</span>
              </div>
            </div>

            <Input
              label="Special Guest Requests"
              placeholder="e.g. Vegan breakfast preference, late check-in..."
            />
          </div>
        </Modal>
      </Container>
    </div>
  );
}
