import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="bg-slate-950 text-white py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Privacy Policy" },
              ]}
              className="justify-center text-slate-400"
            />
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Privacy & Data Protection Policy
            </h1>
            <p className="text-xs text-slate-400">
              Last updated: October 02, 2026
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="max-w-3xl mx-auto rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-xs text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white">1. Information We Collect</h2>
            <p>
              We collect information provided directly by guests during booking inquiry, member portal registration, and special preference requests (such as dietary requirements, allergen notices, and transfer coordination).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white">2. Utilization of Guest Data</h2>
            <p>
              Your data is exclusively utilized to curate and fulfill your personalized hospitality experience, verify member privileges, and manage your private itinerary requests with the utmost confidentiality.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white">3. Security Standards</h2>
            <p>
              All guest profile information is encrypted using industry-standard TLS 1.3 encryption protocols and stored on isolated private enterprise data repositories.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
