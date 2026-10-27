import { Link } from "react-router-dom";
import {
  LuArrowRight as ArrowRight,
  LuSparkles as Sparkles,
  LuCalendar as Calendar,
  LuClock as Clock,
  LuEye as Eye,
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import { BLOG_DATA } from "../../data/blog";

export default function BlogModernPage() {
  const featuredPost = BLOG_DATA[0];
  const remainingPosts = BLOG_DATA.slice(1);

  return (
    <div className="bg-slate-50 dark:bg-[#060913] min-h-screen pb-24 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c1322]/80 backdrop-blur-md">
        <Container className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Journal", to: "/blog" },
                { label: "Modern Magazine Spreads", to: "/blog-modern" },
              ]}
            />
            <Badge variant="gold" size="xs">
              Layout: Magazine Editorial Spreads
            </Badge>
          </div>
        </Container>
      </div>

      <Container className="py-8 lg:py-12">
        {/* Featured Large Hero Article */}
        {featuredPost && (
          <div className="mb-16 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="lg:col-span-7 relative aspect-16/10 lg:aspect-auto lg:h-[480px] block overflow-hidden group"
              >
                <ImageWithFallback
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2">
                  <Badge variant="gold" size="xs">
                    <Sparkles className="h-3 w-3 mr-1 inline" />
                    Editor's Lead Essay
                  </Badge>
                </div>
              </Link>

              <div className="lg:col-span-5 p-8 sm:p-10 space-y-5">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="font-bold text-[#997548] dark:text-[#dfcaa4] uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-[#C5A880]" />
                    {featuredPost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-[#C5A880]" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-[#C5A880]/30"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{featuredPost.author.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{featuredPost.author.role}</p>
                    </div>
                  </div>

                  <Button
                    to={`/blog/${featuredPost.slug}`}
                    variant="primary"
                    size="sm"
                    rightIcon={ArrowRight}
                  >
                    Read Essay
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2-Column Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {remainingPosts.map((post) => (
            <div
              key={post.id}
              className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] shadow-xs hover:border-[#C5A880]/40 transition-all duration-300"
            >
              <Link to={`/blog/${post.slug}`} className="relative aspect-16/10 overflow-hidden block">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <Badge variant="glass" size="xs">
                    {post.category}
                  </Badge>
                </div>
              </Link>

              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-[#C5A880]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-[#C5A880]" />
                      {post.readTime}
                    </span>
                    {post.views && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3 text-[#C5A880]" />
                          {post.views}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-7 w-7 rounded-full object-cover ring-1 ring-[#C5A880]/30"
                    />
                    <span className="font-medium text-slate-800 dark:text-slate-200">{post.author.name}</span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold text-slate-900 dark:text-slate-200 group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] uppercase tracking-wider flex items-center gap-1"
                  >
                    <span>Read Story</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

