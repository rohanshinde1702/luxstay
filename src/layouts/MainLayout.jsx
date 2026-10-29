import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import ThemeCustomizer from "../components/common/ThemeCustomizer";
import PagePopupModal from "../components/common/PagePopupModal";
import PagePopupFloatingTrigger from "../components/common/PagePopupFloatingTrigger";
import BookingModal from "../components/booking/BookingModal";
import { PagePopupProvider } from "../context/PagePopupContext";
import { usePagePopup } from "../hooks/usePagePopup";

function MainLayoutContent() {
  const location = useLocation();
  const isLanding =
    location.pathname === "/" ||
    location.pathname === "/demos" ||
    location.pathname === "/home-demos";

  const {
    isBookingModalOpen,
    closeBookingModal,
    bookingModalRoom,
    bookingModalPromo,
  } = usePagePopup();

  if (isLanding) {
    return (
      <div className="flex min-h-screen flex-col bg-white text-slate-800 antialiased selection:bg-[#E5C39C] selection:text-slate-900">
        <ScrollToTop />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FCFBFA] dark:bg-[#080D1A] text-slate-800 dark:text-slate-100 antialiased transition-colors duration-300">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ThemeCustomizer />
      <PagePopupModal />
      <PagePopupFloatingTrigger />

      {/* Central Booking Modal triggered directly from contextual popups */}
      {isBookingModalOpen && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={closeBookingModal}
          room={bookingModalRoom}
          initialPromoCode={bookingModalPromo}
        />
      )}
    </div>
  );
}

export default function MainLayout() {
  return (
    <PagePopupProvider>
      <MainLayoutContent />
    </PagePopupProvider>
  );
}
