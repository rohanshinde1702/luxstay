import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuSearch as Search
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import BlogCard from "../../components/blog/BlogCard";
import { BLOG_DATA } from "../../data/blog";

const ALL_TAGS = Array.from(new Set(BLOG_DATA.flatMap((p) => p.tags || [])));

export default function BlogListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  const filteredPosts = BLOG_DATA.filter((p) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      p.title.toLowerCase().includes(query) ||
      p.excerpt.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(query)));

    const matchesTag = !selectedTag || (p.tags && p.tags.includes(selectedTag));

    return matchesSearch && matchesTag;
  });

  return (
    <div className="bg-slate-50 dark:bg-[#060913] min-h-screen pb-24 text-slate-900 dark:text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-24 text-white">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80"
            alt="Journal List"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/90 to-slate-950 z-0" />

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Journal", to: "/blog" },
                { label: "List with Sidebar", to: "/blog-list" },
              ]}
              className="text-slate-400"
            />
            <span className="text-xs font-bold uppercase tracking-widest text-[#dfcaa4]">
              Curated Articles
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white">
              The LuxStay Dispatches
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-light">
              Explorations of culture, wine, design, and secluded global sanctuaries.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main List Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {selectedTag && (
              <div className="flex items-center justify-between rounded-lg bg-[#C5A880]/15 dark:bg-[#C5A880]/10 p-4 text-xs font-semibold text-[#7d5f34] dark:text-[#D4B68A]">
                <span>Showing posts tagged with "#{selectedTag}"</span>
                <button
                  onClick={() => setSelectedTag(null)}
                  className="underline hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  Clear Tag
                </button>
              </div>
            )}

            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} variant="list" />
            ))}

            {filteredPosts.length === 0 && (
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-12 text-center space-y-3">
                <p className="font-serif text-xl font-bold text-slate-800 dark:text-white">
                  No articles found
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Try adjusting your search keywords or tag filters.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-8 sticky top-28">
            {/* Search Widget */}
            <div className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-6 shadow-xs space-y-3">
              <label htmlFor="blog-search" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Search Articles
              </label>
              <div className="relative">
                <input
                  id="blog-search"
                  type="text"
                  required
                  placeholder="Keywords, Italy, wine..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 pl-9 text-xs font-medium text-slate-800 dark:text-white focus:border-[#C5A880] focus:outline-hidden"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Recent Posts */}
            <div className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-6 shadow-xs space-y-4">
              <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                Recent Highlights
              </h4>
              <div className="space-y-3">
                {BLOG_DATA.slice(0, 3).map((p) => (
                  <Link
                    key={p.id}
                    to={`/blog/${p.slug}`}
                    className="group block space-y-1"
                  >
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors line-clamp-2">
                      {p.title}
                    </h5>
                    <span className="text-[11px] text-slate-400">{p.date} • {p.readTime}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tag Cloud */}
            <div className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-6 shadow-xs space-y-4">
              <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                Curated Tags
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {ALL_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                      selectedTag === tag
                        ? "bg-slate-900 dark:bg-[#C5A880] text-white dark:text-slate-950 font-bold"
                        : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription Box */}
            <div className="rounded-lg bg-slate-950 dark:bg-[#0c1322] p-6 text-white shadow-xl space-y-4 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#dfcaa4]">
                The Private Gazette
              </span>
              <h4 className="font-serif text-xl font-bold text-white">
                Subscribe to Weekly Editorial Letters
              </h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Receive confidential hotel openings, sommelier recommendations, and invite-only retreat drops.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full rounded-md border border-slate-800 bg-slate-900 p-2.5 text-xs text-white placeholder-slate-500 focus:border-[#C5A880] focus:outline-hidden"
                />
                <Button variant="primary" size="sm" className="w-full justify-center">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
