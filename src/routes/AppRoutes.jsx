import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Home variations
import HomeHotel from "../pages/home/HomeHotel";
import HomeResort from "../pages/home/HomeResort";
import HomeTravel from "../pages/home/HomeTravel";
import HomeBoutique from "../pages/home/HomeBoutique";
import HomeVilla from "../pages/home/HomeVilla";
import HomeModern from "../pages/home/HomeModern";
import HomeBeach from "../pages/home/HomeBeach";
import HomeDark from "../pages/home/HomeDark";
import LandingPage from "../pages/landing/LandingPage";

// About variations
import AboutPage from "../pages/about/AboutPage";
import AboutModernPage from "../pages/about/AboutModernPage";
import AboutTeamPage from "../pages/about/AboutTeamPage";
import TestimonialsPage from "../pages/about/TestimonialsPage";

// Rooms & Suites variations
import RoomsPage from "../pages/rooms/RoomsPage";
import RoomsModernPage from "../pages/rooms/RoomsModernPage";
import RoomsEditorialPage from "../pages/rooms/RoomsEditorialPage";
import RoomDetailsPage from "../pages/rooms/RoomDetailsPage";
import RoomDetailsAmenitiesPage from "../pages/rooms/RoomDetailsAmenitiesPage";
import RoomDetailsSplitPage from "../pages/rooms/RoomDetailsSplitPage";

// Services & Facilities variations
import ServicesPage from "../pages/services/ServicesPage";
import ServicesDiningPage from "../pages/services/ServicesDiningPage";
import FacilitiesPage from "../pages/services/FacilitiesPage";
import OffersPage from "../pages/services/OffersPage";

// Destinations variations
import DestinationsPage from "../pages/destinations/DestinationsPage";
import DestinationsMapPage from "../pages/destinations/DestinationsMapPage";
import DestinationDetailsPage from "../pages/destinations/DestinationDetailsPage";

// Tours & Activities variations
import ToursPage from "../pages/tours/ToursPage";
import ToursModernPage from "../pages/tours/ToursModernPage";
import TourDetailsPage from "../pages/tours/TourDetailsPage";
import ActivitiesPage from "../pages/tours/ActivitiesPage";

// Gallery variations
import GalleryPage from "../pages/gallery/GalleryPage";
import GalleryMasonryPage from "../pages/gallery/GalleryMasonryPage";
import GalleryVideoPage from "../pages/gallery/GalleryVideoPage";

// Blog variations
import BlogGridPage from "../pages/blog/BlogGridPage";
import BlogListPage from "../pages/blog/BlogListPage";
import BlogModernPage from "../pages/blog/BlogModernPage";
import BlogDetailsPage from "../pages/blog/BlogDetailsPage";

// Contact variations
import ContactPage from "../pages/contact/ContactPage";
import ContactMapPage from "../pages/contact/ContactMapPage";
import ContactInquiryPage from "../pages/contact/ContactInquiryPage";

// Auth variations
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";

// Utility pages
import SearchResultsPage from "../pages/utility/SearchResultsPage";
import TermsPage from "../pages/utility/TermsPage";
import PrivacyPage from "../pages/utility/PrivacyPage";
import DesignSystemPage from "../pages/design-system/DesignSystemPage";
import NotFoundPage from "../pages/error/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      // 8 Home Variations & Master Landing
      { index: true, element: <LandingPage /> },
      { path: "/", element: <LandingPage /> },
      { path: "demos", element: <LandingPage /> },
      { path: "home-beach", element: <HomeBeach /> },
      { path: "home-hotel", element: <HomeHotel /> },
      { path: "home-resort", element: <HomeResort /> },
      { path: "home-travel", element: <HomeTravel /> },
      { path: "home-boutique", element: <HomeBoutique /> },
      { path: "home-villa", element: <HomeVilla /> },
      { path: "home-modern", element: <HomeModern /> },
      { path: "home-dark", element: <HomeDark /> },
      { path: "home-demos", element: <LandingPage /> },

      // About Variations
      { path: "about", element: <AboutPage /> },
      { path: "about-v2", element: <AboutModernPage /> },
      { path: "about-v3", element: <AboutTeamPage /> },
      { path: "testimonials", element: <TestimonialsPage /> },

      // Rooms Variations
      { path: "rooms", element: <RoomsPage initialView="grid" /> },
      { path: "rooms-list", element: <RoomsPage initialView="list" /> },
      { path: "rooms-modern", element: <RoomsModernPage /> },
      { path: "rooms-editorial", element: <RoomsEditorialPage /> },
      { path: "room/:slug", element: <RoomDetailsPage /> },
      { path: "room-details-v2/:slug", element: <RoomDetailsAmenitiesPage /> },
      { path: "room-details-v3/:slug", element: <RoomDetailsSplitPage /> },

      // Services & Facilities Variations
      { path: "services", element: <ServicesPage /> },
      { path: "services-dining", element: <ServicesDiningPage /> },
      { path: "facilities", element: <FacilitiesPage /> },
      { path: "offers", element: <OffersPage /> },

      // Destinations Variations
      { path: "destinations", element: <DestinationsPage initialView="grid" /> },
      { path: "destinations-list", element: <DestinationsPage initialView="list" /> },
      { path: "destinations-map", element: <DestinationsMapPage /> },
      { path: "destination/:slug", element: <DestinationDetailsPage /> },

      // Tours & Activities Variations
      { path: "tours", element: <ToursPage /> },
      { path: "tours-modern", element: <ToursModernPage /> },
      { path: "tour/:slug", element: <TourDetailsPage /> },
      { path: "activities", element: <ActivitiesPage /> },

      // Gallery Variations
      { path: "gallery", element: <GalleryPage /> },
      { path: "gallery-masonry", element: <GalleryMasonryPage /> },
      { path: "gallery-video", element: <GalleryVideoPage /> },

      // Blog Variations
      { path: "blog", element: <BlogGridPage /> },
      { path: "blog-list", element: <BlogListPage /> },
      { path: "blog-modern", element: <BlogModernPage /> },
      { path: "blog/:slug", element: <BlogDetailsPage /> },

      // Contact Variations
      { path: "contact", element: <ContactPage /> },
      { path: "contact-v2", element: <ContactMapPage /> },
      { path: "contact-v3", element: <ContactInquiryPage /> },

      // Auth Variations
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },

      // Utility Pages
      { path: "search", element: <SearchResultsPage /> },
      { path: "terms", element: <TermsPage /> },
      { path: "privacy", element: <PrivacyPage /> },
      { path: "design-system", element: <DesignSystemPage /> },
      { path: "404", element: <NotFoundPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
