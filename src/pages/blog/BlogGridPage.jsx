import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { LuSearch as Search, LuLayoutGrid as LayoutGrid, LuList as ListIcon, LuClock as Clock, LuArrowRight as ArrowRight, 
  LuSparkles as Sparkles, LuMail as Mail, LuChevronLeft as ChevronLeft, LuChevronRight as ChevronRight,
  LuSlidersHorizontal as SlidersHorizontal } from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import BlogCard from "../../components/blog/BlogCard";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import Badge from "../../components/common/Badge";
import { BLOG_DATA, BLOG_CATEGORIES } from "../../data/blog";
import { useToast } from "../../hooks/useToast";

const POSTS_PER_PAGE = 6;

export default function BlogGridPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [sortBy, setSortBy] = useState("latest"); // "latest" | "popular" | "readTime"
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { addToast } = useToast();

  // Lead / Featured Post
  const leadPost = useMemo(() => {
    return BLOG_DATA.find((p) => p.featured) || BLOG_DATA[0];
  }, []);

  // Filtered & Sorted Posts
  const filteredPosts = useMemo(() => {
    let list = BLOG_DATA.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchQuery =
        searchQuery.trim() === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchCat && matchQuery;
    });

    if (sortBy === "popular") {
      list = [...list].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else if (sortBy === "readTime") {
      list = [...list].sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
    }
    // "latest" is default order

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    addToast({
      title: "Welcome to The LuxStay Journal",
      message: `You're now subscribed with ${newsletterEmail}. Monthly private dispatches will be delivered to your inbox.`,
      type: "success",
    });
    setNewsletterEmail("");
  };

  return (
    <div className="bg-slate-50 dark:bg-[#060913] min-h-screen pb-24 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* -------------------------------------------------------------------------- */}
      {/* 1. HERO BANNER                                                             */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-24 text-white border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="/images/heritage/lake-palace.jpg"
            alt="LuxStay Journal Editorial Background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60 z-0" />

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-5">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Editorial Journal", to: "/blog" },
              ]}
              className="text-slate-400"
            />
            
            <div className="inline-flex items-center gap-2 rounded-full bg-[#C5A880]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#dfcaa4] border border-[#C5A880]/30">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>THE LUXSTAY DISPATCHES</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-tight">
              Stories of Travel, Heritage &amp;{" "}
              <span className="font-serif italic text-[#dfcaa4]">Sanctuary Living</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-light">
              Immerse in curated essays, architectural retrospectives, sommelier secrets, and insider destination guides from our global editors.
            </p>

            {/* Quick Live Search Bar in Hero */}
            <div className="pt-2 max-w-lg">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search articles by title, destination, or theme..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full rounded-full bg-white/10 border border-white/20 pl-11 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-slate-400 backdrop-blur-md focus:outline-hidden focus:ring-2 focus:ring-[#C5A880] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 text-xs text-slate-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 2. FEATURED LEAD ARTICLE SPOTLIGHT (If no search query active)             */}
      {/* -------------------------------------------------------------------------- */}
      {!searchQuery && activeCategory === "All" && leadPost && (
        <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a1120]">
          <Container className="py-12 lg:py-16">
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#C5A880] animate-ping" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#997548] dark:text-[#dfcaa4]">
                  Editor's Spotlight
                </span>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shadow-xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <Link
                  to={`/blog/${leadPost.slug}`}
                  className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[440px] block overflow-hidden"
                >
                  <ImageWithFallback
                    src={leadPost.image}
                    alt={leadPost.title}
                    aspectRatio="h-full w-full"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant="gold" size="xs">
                      {leadPost.category}
                    </Badge>
                  </div>
                </Link>

                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span>{leadPost.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-[#C5A880]" />
                        {leadPost.readTime}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors">
                      <Link to={`/blog/${leadPost.slug}`}>{leadPost.title}</Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                      {leadPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    {leadPost.author && (
                      <div className="flex items-center gap-3">
                        <img
                          src={leadPost.author.avatar}
                          alt={leadPost.author.name}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-[#C5A880]/40"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            {leadPost.author.name}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {leadPost.author.role}
                          </p>
                        </div>
                      </div>
                    )}

                    <Link
                      to={`/blog/${leadPost.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#0F172A] dark:bg-[#C5A880] hover:bg-[#C5A880] text-white dark:text-slate-950 px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:scale-105"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* 3. MAIN ARTICLES FEED WITH CONTROLS & FILTERS                              */}
      {/* -------------------------------------------------------------------------- */}
      <Container className="py-12 lg:py-16 space-y-10">
        
        {/* Category Pills Navigation & View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {BLOG_CATEGORIES.map((cat) => {
              const count = cat === "All"
                ? BLOG_DATA.length
                : BLOG_DATA.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-slate-900 dark:bg-[#C5A880] text-white dark:text-slate-950 shadow-md ring-2 ring-[#C5A880]/50"
                      : "bg-white dark:bg-[#0c1322] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat
                      ? "bg-white/20 text-white dark:text-slate-950 font-bold"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode & Sort Dropdowns */}
          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#C5A880]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-[#C5A880] cursor-pointer"
              >
                <option value="latest">Latest Stories</option>
                <option value="popular">Most Popular</option>
                <option value="readTime">Shortest Read</option>
              </select>
            </div>

            {/* Layout Toggles */}
            <div className="flex items-center bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-slate-900 dark:bg-[#C5A880] text-white dark:text-slate-950"
                    : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
                title="Grid Layout"
                aria-label="Grid layout"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === "list"
                    ? "bg-slate-900 dark:bg-[#C5A880] text-white dark:text-slate-950"
                    : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
                title="List Layout"
                aria-label="List layout"
              >
                <ListIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Showing <strong>{paginatedPosts.length}</strong> of <strong>{filteredPosts.length}</strong> articles
            {activeCategory !== "All" && ` in "${activeCategory}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          <div className="flex items-center gap-3">
            <Link to="/blog-list" className="hover:text-[#C5A880] transition-colors underline">
              Sidebar &amp; Tag View
            </Link>
            <span>•</span>
            <Link to="/blog-modern" className="hover:text-[#C5A880] transition-colors underline">
              Magazine Spreads
            </Link>
          </div>
        </div>

        {/* Dynamic Grid / List Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} variant="grid" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {paginatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} variant="list" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-16 text-center space-y-4">
            <div className="h-16 w-16 mx-auto rounded-full bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-800 dark:text-white">
              No matching stories found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              We couldn't find any articles matching "{searchQuery}". Try searching for destinations like "Amalfi", "Rajasthan", "Maldives", or select another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#C5A880] hover:bg-[#b8986f] text-slate-950 font-bold px-6 py-2.5 text-xs uppercase tracking-wider shadow-sm transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-10 w-10 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === pageNum
                      ? "bg-slate-900 dark:bg-[#C5A880] text-white dark:text-slate-950 shadow-md ring-2 ring-[#C5A880]/50"
                      : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </Container>

      {/* -------------------------------------------------------------------------- */}
      {/* 4. VIP EDITORIAL NEWSLETTER BANNER                                         */}
      {/* -------------------------------------------------------------------------- */}
      <Container className="pt-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white p-8 sm:p-12 lg:p-16 border border-[#C5A880]/30 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#C5A880]/20 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#dfcaa4]">
              <Mail className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>PRIVATE DISPATCHES</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-light text-white leading-tight">
              Receive the Monthly{" "}
              <span className="font-serif italic text-[#dfcaa4]">Curator's Journal</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Unpublished travel itineraries, sommelier allocations, and private invitations to exclusive resort openings delivered directly to your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="email"
                required
                placeholder="Enter your private email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 rounded-xl bg-white/10 border border-white/20 px-4 py-3.5 text-xs sm:text-sm text-white placeholder-slate-400 backdrop-blur-md focus:outline-hidden focus:ring-2 focus:ring-[#C5A880] transition-all"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#C5A880] hover:bg-[#b8986f] text-slate-950 font-bold px-7 py-3.5 text-xs uppercase tracking-wider shadow-lg transition-all duration-200 cursor-pointer shrink-0"
              >
                Subscribe to Journal
              </button>
            </form>
          </div>
        </div>
      </Container>

    </div>
  );
}
