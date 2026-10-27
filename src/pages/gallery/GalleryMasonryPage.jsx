import { useState } from "react";
import {
  LuX as X,
  LuChevronLeft as ChevronLeft,
  LuChevronRight as ChevronRight
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Badge from "../../components/common/Badge";
import { GALLERY_DATA } from "../../data/gallery";

const CATEGORIES = ["all", "suites", "dining", "spa", "activities", "destinations"];

export default function GalleryMasonryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = activeCategory === "all"
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-24 text-white">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80"
            alt="Gallery Masonry"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/90 to-slate-950 z-0" />

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Gallery", to: "/gallery" },
                { label: "Masonry Layout", to: "/gallery-masonry" },
              ]}
              className="text-slate-400"
            />
            <span className="text-xs font-bold uppercase tracking-widest text-[#dfcaa4]">
              Visual Anthology
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white">
              Masonry Photo Portfolio
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-light">
              An uncropped, natural-aspect photographic journey through our suites, private wellness spas, and global destinations.
            </p>
          </div>
        </Container>
      </section>

      {/* Masonry Content */}
      <Container className="py-12 lg:py-16">
        {/* Category Filter Pills */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-semibold capitalize transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-slate-900 text-white shadow-xs ring-2 ring-[#C5A880]"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CSS Multi-Column Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative break-inside-avoid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs hover:shadow-2xl transition-all cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <Badge variant="glass" size="xs" className="w-fit mb-2">
                  {item.category}
                </Badge>
                <h4 className="font-serif text-lg font-bold">{item.title}</h4>
                <p className="text-xs text-slate-300">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-lg">
            <img
              src={filteredItems[lightboxIndex].src}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[80vh] w-auto mx-auto object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-3 text-center text-white">
              <h3 className="font-serif text-xl font-bold">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs text-slate-400">
                {filteredItems[lightboxIndex].location} ({lightboxIndex + 1} / {filteredItems.length})
              </p>
            </div>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-6 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
