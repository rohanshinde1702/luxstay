import { useState } from "react";
import {
  LuStar as Star,
  LuMessageSquarePlus as MessageSquarePlus,
  LuAward as Award,
  LuShieldCheck as ShieldCheck,
  LuCircleCheck as CheckCircle2,
  LuHeartHandshake as HeartHandshake
} from "react-icons/lu";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import TestimonialCard from "./TestimonialCard";
import Button from "./Button";
import Modal from "./Modal";
import Input from "./Input";
import Rating from "./Rating";
import { TESTIMONIALS_DATA } from "../../data/testimonials";
import ReviewsSlider from "./ReviewsSlider";
import { useToast } from "../../hooks/useToast";

export default function TestimonialsSection({
  title = "Guest Acclaim & Reviews",
  subtitle = "Exceptional Experiences",
  className = "",
}) {
  const { addToast } = useToast();
  const [reviewsList, setReviewsList] = useState(TESTIMONIALS_DATA);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  
  // New review form states
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [suiteStayed, setSuiteStayed] = useState("");
  const [quote, setQuote] = useState("");
  const [ratingVal, setRatingVal] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) {
      addToast("Please provide your name and review remarks.", "warning");
      return;
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      author,
      role: "Verified Guest",
      location: location || "Global Traveler",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: ratingVal,
      suiteStayed,
      date: "Just now",
      verifiedStay: true,
      quote,
    };

    setReviewsList([newReview, ...reviewsList]);
    setSubmitted(true);
    addToast("Thank you! Your verified guest review has been published.", "success");
    setTimeout(() => {
      setSubmitted(false);
      setReviewModalOpen(false);
      setAuthor("");
      setLocation("");
      setSuiteStayed("");
      setQuote("");
    }, 2000);
  };

  const reviewBreakdown = [
    { label: "Cleanliness & Disinfection", score: "5.0" },
    { label: "Concierge & Butler Attentiveness", score: "5.0" },
    { label: "Location & Sanctuary Views", score: "4.9" },
    { label: "Gastronomy & Room Service", score: "4.9" },
    { label: "Spa & Thermal Facilities", score: "5.0" },
  ];

  return (
    <section className={`py-16 sm:py-24 bg-slate-50/70 border-y border-slate-200/60 ${className}`}>
      <Container>
        <SectionHeading
          eyebrow={subtitle}
          title={title}
          highlight="Unfiltered Acclaim"
          description="Read genuine reflections and awards from distinguished guests, architectural critics, and world travelers who have made LuxStay their home."
          action={
            <Button
              variant="outline"
              size="sm"
              leftIcon={MessageSquarePlus}
              onClick={() => setReviewModalOpen(true)}
            >
              Share Your Reflection
            </Button>
          }
        />

        {/* Rating Score Banner */}
        <div className="rounded-lg border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left overall rating */}
            <div className="text-center lg:text-left space-y-2 border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-8">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#997548]">
                World Luxury Score
              </span>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="font-serif text-5xl sm:text-6xl font-bold text-slate-900">
                  4.98
                </span>
                <div>
                  <div className="flex items-center gap-0.5 text-[#C5A880]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#C5A880]" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Based on 480+ Verified Stays
                  </p>
                </div>
              </div>
            </div>

            {/* Middle metrics breakdown */}
            <div className="space-y-2.5">
              {reviewBreakdown.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#C5A880] h-full rounded-full" style={{ width: `${(parseFloat(item.score) / 5) * 100}%` }} />
                    </div>
                    <span className="font-bold text-slate-900 w-6 text-right">{item.score}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Pillars */}
            <div className="grid grid-cols-2 gap-3 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <Award className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>TripAdvisor Best of the Best 2025</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>100% Verified Guest Reviews</span>
              </div>
              <div className="flex items-start gap-2">
                <HeartHandshake className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>Direct Concierge Follow-Up</span>
              </div>
              <div className="flex items-start gap-2">
                <Star className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>Forbes Travel 5-Star Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Slider */}
        <ReviewsSlider
          items={reviewsList}
          renderItem={(item) => (
            <TestimonialCard testimonial={item} className="h-full" />
          )}
        />

        {/* Modal for Writing a Review */}
        <Modal
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          title="Share Your Sanctuary Experience"
          description="Your reflection helps future travelers choose their dream suite."
        >
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900">
                Review Received!
              </h4>
              <p className="text-xs text-slate-500">
                Thank you for contributing your thoughts to the LuxStay community.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Your Overall Rating
                </label>
                <Rating
                  value={ratingVal}
                  interactive
                  onChange={setRatingVal}
                  size="lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  placeholder="e.g. Lady Genevieve"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <Input
                  label="Your City / Country"
                  placeholder="e.g. Geneva, Switzerland"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Suite or Villa Stayed In <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={suiteStayed}
                  onChange={(e) => setSuiteStayed(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-[#C5A880] focus:outline-none"
                >
                  <option value="" disabled hidden>Select Suite or Villa Stayed In</option>
                  <option value="Deluxe Ocean Panoramic Suite">Deluxe Ocean Panoramic Suite</option>
                  <option value="Royal Presidential Sanctuary Villa">Royal Presidential Sanctuary Villa</option>
                  <option value="Alpine Timber & Stone Chalet">Alpine Timber & Stone Chalet</option>
                  <option value="Metropolitan Skyline Penthouse">Metropolitan Skyline Penthouse</option>
                  <option value="Tropical Beachfront Oasis Bungalow">Tropical Beachfront Oasis Bungalow</option>
                  <option value="Azure Lagoon Overwater Villa">Azure Lagoon Overwater Villa</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Review Reflection <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the hospitality, ambiance, and suite comfort..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white p-3 text-xs text-slate-800 placeholder-slate-400 focus:border-[#C5A880] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReviewModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="gold" size="sm">
                  Publish Review
                </Button>
              </div>
            </form>
          )}
        </Modal>
      </Container>
    </section>
  );
}
