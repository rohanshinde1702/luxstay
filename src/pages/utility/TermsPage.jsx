import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-slate-950 text-white py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Terms of Service" },
              ]}
              className="justify-center text-slate-400"
            />
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Terms & Conditions
            </h1>
            <p className="text-xs text-slate-400">
              Last updated: October 02, 2026
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="max-w-3xl mx-auto rounded-lg border border-slate-200/80 bg-white p-8 sm:p-12 shadow-xs prose prose-slate text-xs sm:text-sm text-slate-600 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">1. Reservation & Guarantee Policy</h2>
            <p>
              Direct reservations placed through LuxStay are confirmed instantly upon verification of guest credentials. All room rates include complimentary daily breakfast, high-speed fiber internet, and 24/7 dedicated butler liaison.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">2. Cancellation & Alteration</h2>
            <p>
              Reservations may be cancelled or modified without fee up to 48 hours prior to scheduled 15:00 check-in. In cases of marine or alpine weather disruptions affecting private charters, alternative itineraries or full credit vouchers will be issued.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">3. Privacy & Discretion</h2>
            <p>
              LuxStay maintains strict nondisclosure protocols regarding all guest identities, room assignments, and private event bookings. No personal information is disclosed to third parties without explicit authorization.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
