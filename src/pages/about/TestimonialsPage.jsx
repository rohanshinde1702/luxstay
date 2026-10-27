import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import TestimonialsSection from "../../components/common/TestimonialsSection";

export default function TestimonialsPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* Hero Header */}
      <section className="relative bg-slate-950 py-16 sm:py-20 text-white overflow-hidden">
        <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
        <Container>
          <Breadcrumbs
            items={[
              { label: "Pages", path: "/about" },
              { label: "Guest Reflections & Press" },
            ]}
            dark
            className="mb-6"
          />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              Global Recognition & Reflections
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Verified Guest Acclaim & Press Awards
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
              Read authentic feedback from travelers, architectural journalists, and luxury connoisseurs 
              who have experienced the timeless serenity of LuxStay.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Testimonials & Review Section */}
      <TestimonialsSection />
    </div>
  );
}
