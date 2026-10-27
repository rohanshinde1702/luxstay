import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  LuShare2 as Share2,
  LuClock as Clock,
  LuCalendar as Calendar,
  LuEye as Eye,
  LuHeart as Heart,
  LuMessageSquare as MessageSquare,
  LuQuote as Quote,
  LuArrowLeft as ArrowLeft,
  LuArrowRight as ArrowRight,
  LuBookmark as Bookmark,
  LuCheck as Check,
  LuSparkles as Sparkles,
  LuSend as Send
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Badge from "../../components/common/Badge";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import BlogCard from "../../components/blog/BlogCard";
import { BLOG_DATA } from "../../data/blog";
import { useToast } from "../../hooks/useToast";
import NotFoundPage from "../error/NotFoundPage";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const { addToast } = useToast();

  const post = useMemo(() => {
    return BLOG_DATA.find((p) => p.slug === slug) || BLOG_DATA[0];
  }, [slug]);

  const [likes, setLikes] = useState(post?.likes || 250);
  const [hasLiked, setHasLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Dynamic Comment list
  const [comments, setComments] = useState(post?.comments || []);
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return BLOG_DATA.filter((p) => p.id !== post.id && (p.category === post.category || p.featured)).slice(0, 3);
  }, [post]);

  if (!post) {
    return <NotFoundPage />;
  }

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      addToast({
        title: "Article Liked",
        message: "Thank you for supporting our editorial dispatches.",
        type: "success",
      });
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    addToast({
      title: isBookmarked ? "Removed from Bookmarks" : "Saved to Reading List",
      message: `"${post.title}" ${isBookmarked ? "removed from" : "saved to"} your private reading list.`,
      type: "info",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      addToast({
        title: "Link Copied to Clipboard",
        message: `Direct link to "${post.title}" copied.`,
        type: "success",
      });
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newEntry = {
      id: `c-${Date.now()}`,
      author: newCommentName.trim(),
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      date: "Just now",
      text: newCommentText.trim(),
    };

    setComments((prev) => [newEntry, ...prev]);
    setNewCommentName("");
    setNewCommentText("");

    addToast({
      title: "Comment Published",
      message: "Your thoughts have been added to the editorial discussion.",
      type: "success",
    });
  };

  return (
    <div className="bg-slate-50 dark:bg-[#060913] min-h-screen pb-24 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* -------------------------------------------------------------------------- */}
      {/* 1. TOP BREADCRUMB & UTILITY HEADER                                         */}
      {/* -------------------------------------------------------------------------- */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a1120] sticky top-16 sm:top-20 z-30 transition-colors">
        <Container className="py-3.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#C5A880] transition-colors shrink-0"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>All Stories</span>
              </Link>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate hidden sm:inline">
                {post.title}
              </span>
            </div>

            {/* Quick Actions (Share, Bookmark, Like) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  isBookmarked
                    ? "bg-[#C5A880]/20 border-[#C5A880] text-[#997548] dark:text-[#dfcaa4]"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
                title="Save Article"
                aria-label="Save Article"
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              </button>

              <button
                onClick={handleLike}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                  hasLiked
                    ? "bg-rose-500/15 border-rose-500/40 text-rose-500"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Heart className={`h-4 w-4 ${hasLiked ? "fill-current" : ""}`} />
                <span>{likes}</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Share2 className="h-3.5 w-3.5 text-[#C5A880]" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* 2. ARTICLE HEADER BANNER                                                   */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-24 border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/60 z-0" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            {/* Category & Meta */}
            <div className="inline-flex flex-wrap items-center justify-center gap-3">
              <Badge variant="gold" size="xs">
                {post.category}
              </Badge>
              <span className="text-xs text-slate-400 font-medium">
                {post.date}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Clock className="h-3 w-3 text-[#C5A880]" />
                {post.readTime}
              </span>
              {post.views && (
                <>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Eye className="h-3 w-3 text-[#C5A880]" />
                    {post.views} reads
                  </span>
                </>
              )}
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.12] tracking-tight">
              {post.title}
            </h1>

            {/* Sub-excerpt */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author Byline */}
            {post.author && (
              <div className="flex items-center justify-center gap-3 pt-4 border-t border-white/10 max-w-md mx-auto">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-[#C5A880]/50 shadow-lg"
                />
                <div className="text-left">
                  <p className="text-sm font-bold text-white">{post.author.name}</p>
                  <p className="text-xs text-[#dfcaa4]">{post.author.role}</p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 3. ARTICLE CONTENT & EDITORIAL BODY                                        */}
      {/* -------------------------------------------------------------------------- */}
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Main Article Body (8 Cols) */}
          <article className="lg:col-span-8 space-y-8 bg-white dark:bg-[#0a1120] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
            
            {/* Hero Main Photo */}
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                aspectRatio="aspect-16/10"
                className="w-full object-cover"
              />
            </div>

            {/* Content Sections */}
            <div className="space-y-6 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              {Array.isArray(post.content) ? (
                post.content.map((block, idx) => {
                  if (typeof block === "string") {
                    return (
                      <p key={idx} className={idx === 0 ? "first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#997548] dark:first-letter:text-[#dfcaa4] first-letter:float-left first-letter:mr-3 first-letter:leading-none" : ""}>
                        {block}
                      </p>
                    );
                  }

                  if (block.type === "heading") {
                    return (
                      <h2 key={idx} className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white pt-6 pb-1">
                        {block.text}
                      </h2>
                    );
                  }

                  if (block.type === "quote") {
                    return (
                      <blockquote key={idx} className="my-8 rounded-2xl bg-[#C5A880]/10 dark:bg-[#C5A880]/15 border-l-4 border-[#C5A880] p-6 sm:p-8 space-y-2">
                        <Quote className="h-8 w-8 text-[#C5A880] opacity-80" />
                        <p className="font-serif italic text-lg sm:text-xl text-slate-900 dark:text-white leading-snug">
                          "{block.text}"
                        </p>
                        {block.author && (
                          <cite className="block text-xs font-bold uppercase tracking-widest text-[#997548] dark:text-[#dfcaa4] not-italic pt-2">
                            — {block.author}
                          </cite>
                        )}
                      </blockquote>
                    );
                  }

                  return (
                    <p key={idx} className={idx === 0 ? "first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#997548] dark:first-letter:text-[#dfcaa4] first-letter:float-left first-letter:mr-3 first-letter:leading-none" : ""}>
                      {block.text}
                    </p>
                  );
                })
              ) : (
                <p>{post.excerpt}</p>
              )}
            </div>

            {/* Article Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Topic Tags
                </span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio Card */}
            {post.author && (
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-20 w-20 rounded-full object-cover ring-4 ring-[#C5A880]/30 shadow-md shrink-0"
                />
                <div className="space-y-2 text-center sm:text-left">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                      {post.author.name}
                    </h3>
                    <p className="text-xs text-[#997548] dark:text-[#dfcaa4] font-medium">
                      {post.author.role}
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                    {post.author.bio || "Staff writer and luxury hospitality curator at The LuxStay Journal."}
                  </p>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* COMMENTS & DISCUSSION SECTION                                */}
            {/* ------------------------------------------------------------- */}
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-[#C5A880]" />
                  <span>Discussion ({comments.length})</span>
                </h3>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 p-6 border border-slate-200/80 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#997548] dark:text-[#dfcaa4]">
                  Leave a Thought
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    className="w-full rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#C5A880]"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  placeholder="Share your perspectives or destination inquiries..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#C5A880]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0F172A] dark:bg-[#C5A880] hover:bg-[#C5A880] text-white dark:text-slate-950 font-bold px-6 py-2.5 text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Post Comment</span>
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comm) => (
                  <div key={comm.id} className="rounded-xl bg-slate-50/70 dark:bg-slate-900/40 p-5 border border-slate-200/60 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={comm.avatar}
                          alt={comm.author}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {comm.author}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {comm.date}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed pl-11">
                      {comm.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </article>

          {/* Sticky Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-8 sticky top-36">
            
            {/* Quick Summary Box */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0a1120] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#997548] dark:text-[#dfcaa4]">
                <Sparkles className="h-4 w-4 text-[#C5A880]" />
                <span>Story Overview</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Published in <strong>{post.category}</strong>. Designed for travelers seeking architectural retreats and unhurried luxury.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                <span>Reading Time: {post.readTime}</span>
                <span>{likes} Applauds</span>
              </div>
            </div>

            {/* Newsletter Callout in Sidebar */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white p-7 border border-[#C5A880]/30 shadow-xl space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#dfcaa4] block">
                THE DISPATCH
              </span>
              <h4 className="font-serif text-xl font-bold leading-snug">
                Never Miss a Destination Story
              </h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Join 45,000+ discerning travelers receiving our monthly private editorial digest.
              </p>
              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#C5A880] hover:bg-[#b8986f] text-slate-950 font-bold py-3 text-xs uppercase tracking-wider transition-all"
              >
                <span>Concierge Inquiries</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Explore More Categories */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0a1120] p-6 shadow-xs space-y-3">
              <h4 className="font-serif text-base font-bold text-slate-900 dark:text-white">
                Editorial Categories
              </h4>
              <div className="space-y-1.5">
                {["Travel Guide", "Heritage & Culture", "Gastronomy", "Design & Style", "Wellness & Spa", "Island Escapes"].map((cat) => (
                  <Link
                    key={cat}
                    to="/blog"
                    className="flex items-center justify-between rounded-lg p-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-colors"
                  >
                    <span>{cat}</span>
                    <ArrowRight className="h-3 w-3 opacity-50" />
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </Container>

      {/* -------------------------------------------------------------------------- */}
      {/* 4. RELATED STORIES GRID                                                    */}
      {/* -------------------------------------------------------------------------- */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a1120] py-16">
          <Container className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#997548] dark:text-[#dfcaa4]">
                  CONTINUE READING
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                  Related Editorial Stories
                </h2>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#997548] dark:text-[#dfcaa4] hover:underline"
              >
                <span>View All Journal Posts</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((rPost) => (
                <BlogCard key={rPost.id} post={rPost} variant="grid" />
              ))}
            </div>
          </Container>
        </section>
      )}

    </div>
  );
}
