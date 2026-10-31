import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import GalleryLightbox from "../../components/gallery/GalleryLightbox";
import { GALLERY_ITEMS } from "../../data/gallery";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 space-y-16 pb-24 transition-colors">
      {/* Hero Header */}
      <section className="relative bg-slate-950 py-16 sm:py-24 text-white overflow-hidden">
        <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
        <Container>
          <Breadcrumbs
            items={[
              { label: "Experiences", path: "/services" },
              { label: "Visual Gallery" },
            ]}
            dark
            className="mb-6"
          />

          <div className="max-w-3xl space-y-4 text-center mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              The LuxStay Visual Journal
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              A Photographic Immersion
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
              Explore high-resolution captures of our suites, private infinity pools, 
              Michelin gastronomic dining, and breathtaking coastal sanctuaries.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Filterable Lightbox Gallery */}
      <Container>
        <GalleryLightbox items={GALLERY_ITEMS} showFilter={true} />
      </Container>
    </div>
  );
}
