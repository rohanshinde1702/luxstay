import { useState, useRef, useEffect, useMemo } from "react";
import {
  LuPlay as Play,
  LuPause as Pause,
  LuX as X,
  LuVolume2 as Volume2,
  LuVolumeX as VolumeX,
  LuMaximize as Maximize,
  LuFilm as Film,
  LuSparkles as Sparkles,
  LuClock as Clock,
  LuMapPin as MapPin,
  LuCamera as Camera,
  LuRadio as Radio,
  LuCheck as Check,
  LuRotateCcw as RotateCcw
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import { VIDEO_STORIES_DATA, VIDEO_CATEGORIES } from "../../data/gallery";

export default function GalleryVideoPage() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState("0:00");
  const [durationFormatted, setDurationFormatted] = useState("0:00");

  const modalVideoRef = useRef(null);

  // Filtered films
  const filteredVideos = useMemo(() => {
    if (selectedCategory === "all") return VIDEO_STORIES_DATA;
    return VIDEO_STORIES_DATA.filter((v) => v.category === selectedCategory);
  }, [selectedCategory]);

  const featuredFilm = useMemo(() => {
    return VIDEO_STORIES_DATA.find((v) => v.featured) || VIDEO_STORIES_DATA[0];
  }, []);

  // Sync player events
  useEffect(() => {
    if (!activeVideo || !modalVideoRef.current) return;

    const video = modalVideoRef.current;

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const progress = (video.currentTime / video.duration) * 100;
      setVideoProgress(progress);

      const curM = Math.floor(video.currentTime / 60);
      const curS = Math.floor(video.currentTime % 60);
      setCurrentTimeFormatted(`${curM}:${curS < 10 ? "0" : ""}${curS}`);

      const durM = Math.floor(video.duration / 60);
      const durS = Math.floor(video.duration % 60);
      setDurationFormatted(`${durM}:${durS < 10 ? "0" : ""}${durS}`);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Auto play on open
    video.play().catch(() => {
      // Autoplay might require mute in some browsers
      video.muted = true;
      setIsMuted(true);
      video.play().catch((e) => console.log("Playback interaction required", e));
    });

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [activeVideo]);

  // ESC key listener for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && activeVideo) {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideo]);

  const togglePlayPause = () => {
    if (!modalVideoRef.current) return;
    if (modalVideoRef.current.paused) {
      modalVideoRef.current.play();
    } else {
      modalVideoRef.current.pause();
    }
  };

  const toggleMute = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalVideoRef.current.muted;
    setIsMuted(modalVideoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (!modalVideoRef.current) return;
    if (modalVideoRef.current.requestFullscreen) {
      modalVideoRef.current.requestFullscreen();
    }
  };

  const jumpToChapter = (timeString) => {
    if (!modalVideoRef.current) return;
    const parts = timeString.split(":").map(Number);
    let seconds = 0;
    if (parts.length === 2) {
      seconds = parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    modalVideoRef.current.currentTime = seconds;
    modalVideoRef.current.play();
  };

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#070b14] min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-24">
      {/* 1. Cinematic Hero Header */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* Background ambient video stream placeholder */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <img src="/images/placeholders/1920x1080.svg"
            alt="Cinematic Video Ambient Background (1920x1080 Placeholder)"
            className="h-full w-full object-cover scale-105" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/80 to-slate-950/60 z-1" />

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-6">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Visual Gallery", to: "/gallery" },
                { label: "Cinematic Films", to: "/gallery-video" },
              ]}
              className="text-slate-400"
            />

            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#dfcaa4] backdrop-blur-md">
              <Radio className="h-3.5 w-3.5 text-[#C5A880] animate-pulse" />
              <span>4K Ultra HD Cinema Showcase</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Short Films & Atmospheric Stories
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-light">
              Immerse yourself in high-definition cinematography, ambient binaural soundscapes, 
              and authentic moments across LuxStay’s sanctuaries before you arrive.
            </p>

            {/* Quick Specs Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="rounded-md border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-mono font-semibold text-slate-200 backdrop-blur-md">
                4K 60FPS HDR
              </span>
              <span className="rounded-md border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-mono font-semibold text-slate-200 backdrop-blur-md">
                DOLBY ATMOS 7.1
              </span>
              <span className="rounded-md border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-mono font-semibold text-slate-200 backdrop-blur-md">
                DIRECTOR'S CUT
              </span>
            </div>

            {/* Featured Play Action */}
            <div className="pt-4">
              <button
                onClick={() => setActiveVideo(featuredFilm)}
                className="group inline-flex items-center gap-3 rounded-full bg-[#C5A880] text-slate-950 px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-[#d8c29d] transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-[#C5A880]">
                  <Play className="h-4 w-4 fill-current ml-0.5" />
                </div>
                <span>Watch Featured Film: {featuredFilm.title}</span>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Category Filter Bar */}
      <Container className="pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-2 flex items-center gap-1.5">
              <Film className="h-4 w-4 text-[#C5A880]" />
              <span>Filter Films:</span>
            </span>

            {VIDEO_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 dark:bg-[#C5A880] text-white dark:text-slate-950 shadow-md font-bold"
                      : "bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing <strong className="text-slate-900 dark:text-white">{filteredVideos.length}</strong> cinematic releases
          </div>
        </div>
      </Container>

      {/* 3. Cinematic Film Grid */}
      <Container className="pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVideos.map((video) => {
            const isHovered = hoveredVideoId === video.id;

            return (
              <div
                key={video.id}
                onMouseEnter={() => setHoveredVideoId(video.id)}
                onMouseLeave={() => setHoveredVideoId(null)}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#0c1322] border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all duration-500"
              >
                {/* Video / Poster Frame Container */}
                <div className="relative aspect-16/9 overflow-hidden bg-slate-950">
                  {/* Poster Image */}
                  <ImageWithFallback
                    src={video.poster}
                    alt={video.title}
                    className={`h-full w-full object-cover transition-all duration-700 ${
                      isHovered ? "scale-105" : "scale-100"
                    }`}
                  />

                  {/* Auto Mini-Video Preview on Hover */}
                  {isHovered && video.videoUrl && (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover animate-fade-in"
                    >
                      <source src={video.videoUrl} type="video/mp4" />
                    </video>
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <Badge variant="glass" size="xs" icon={MapPin}>
                      {video.location}
                    </Badge>
                  </div>

                  <div className="absolute top-4 right-4 z-20">
                    <span className="rounded-md bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono font-bold text-amber-300 border border-white/10 shadow-lg">
                      {video.resolution}
                    </span>
                  </div>

                  {/* Duration Badge Bottom */}
                  <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-md bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono font-bold text-white border border-white/10">
                    <Clock className="h-3 w-3 text-[#C5A880]" />
                    <span>{video.duration}</span>
                  </div>

                  {/* Big Luxury Play Button Overlay */}
                  <div
                    onClick={() => setActiveVideo(video)}
                    className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center cursor-pointer z-10"
                    title={`Play ${video.title}`}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="absolute h-20 w-20 rounded-full bg-[#C5A880]/30 animate-ping" />
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 dark:bg-[#C5A880] text-slate-950 shadow-2xl backdrop-blur-md group-hover:scale-115 transition-transform duration-300">
                        <Play className="h-6 w-6 fill-current ml-1 text-slate-950" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="text-[#997548] dark:text-[#dfcaa4] font-semibold uppercase tracking-wider">
                        {video.category}
                      </span>
                      {video.cinematographer && (
                        <span className="flex items-center gap-1 text-[11px]">
                          <Camera className="h-3 w-3 text-slate-400" />
                          <span>Cinematography: {video.cinematographer}</span>
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => setActiveVideo(video)}
                      className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors cursor-pointer"
                    >
                      {video.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                      {video.desc}
                    </p>
                  </div>

                  {/* Chapter Timestamps Pills */}
                  {video.chapters && video.chapters.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Film Chapters:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {video.chapters.map((chap, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => {
                              setActiveVideo(video);
                              setTimeout(() => jumpToChapter(chap.time), 300);
                            }}
                            className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-slate-800/60 px-2 py-1 text-[11px] text-slate-600 dark:text-slate-300 hover:bg-[#C5A880]/20 hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-colors cursor-pointer"
                          >
                            <span className="font-mono font-bold text-[#997548] dark:text-[#dfcaa4]">{chap.time}</span>
                            <span className="truncate max-w-[130px]">{chap.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Play Action CTA */}
                  <div className="pt-1 flex items-center justify-between">
                    <button
                      onClick={() => setActiveVideo(video)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#997548] dark:text-[#dfcaa4] hover:underline uppercase tracking-wider cursor-pointer"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Watch in 4K Cinema</span>
                    </button>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {video.audioFormat}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* 4. Fullscreen Master Video Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 sm:p-6 lg:p-8 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="player-modal-title"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer backdrop-blur-md border border-white/20 hover:scale-105"
            aria-label="Close cinema player"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Modal Content Box */}
          <div className="relative w-full max-w-5xl rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-white/15 shadow-2xl flex flex-col">
            
            {/* Real HTML5 Video Player / Placeholder Showcase */}
            <div className="relative aspect-16/9 bg-black overflow-hidden group flex items-center justify-center">
              <img src={activeVideo.poster || "/images/placeholders/1200x800.svg"}
                alt={activeVideo.title}
                className="h-full w-full object-contain" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
              {activeVideo.videoUrl ? (
                <video
                  ref={modalVideoRef}
                  controls={false}
                  playsInline
                  poster={activeVideo.poster}
                  onClick={togglePlayPause}
                  className="absolute inset-0 h-full w-full object-contain cursor-pointer"
                >
                  <source src={activeVideo.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-center text-white backdrop-blur-[2px]">
                  <div className="w-16 h-16 rounded-full bg-[#C5A880] text-slate-950 flex items-center justify-center mb-4 shadow-xl">
                    <Play className="h-7 w-7 fill-current ml-1" />
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                    {activeVideo.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md font-light">
                    ThemeForest Video Stream Placeholder (1200 × 800). Easily connect your MP4 or video CDN stream URL in <code className="bg-white/10 px-2 py-0.5 rounded text-[#C5A880] font-mono text-xs">src/data/gallery.js</code>.
                  </p>
                </div>
              )}

              {/* Top Video Overlay Bar */}
              <div className="absolute top-0 inset-x-0 p-4 sm:p-6 bg-linear-to-b from-black/80 to-transparent flex items-center justify-between text-white pointer-events-none">
                <div>
                  <h3 id="player-modal-title" className="font-serif text-lg sm:text-2xl font-bold">
                    {activeVideo.title}
                  </h3>
                  <p className="text-xs text-slate-300 flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#C5A880]" />
                    <span>{activeVideo.location}</span>
                    <span>•</span>
                    <span className="text-[#dfcaa4] font-mono">{activeVideo.resolution}</span>
                    <span>•</span>
                    <span>{activeVideo.audioFormat}</span>
                  </p>
                </div>
              </div>

              {/* Bottom Custom Playback Controls Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-linear-to-t from-black/90 via-black/60 to-transparent space-y-3">
                {/* Progress Bar */}
                <div
                  onClick={(e) => {
                    if (!modalVideoRef.current || !modalVideoRef.current.duration) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newProgress = clickX / rect.width;
                    modalVideoRef.current.currentTime = newProgress * modalVideoRef.current.duration;
                  }}
                  className="relative h-1.5 w-full bg-white/20 rounded-full cursor-pointer overflow-hidden group/bar"
                >
                  <div
                    style={{ width: `${videoProgress}%` }}
                    className="h-full bg-gradient-to-r from-[#C5A880] to-amber-300 rounded-full transition-all duration-100"
                  />
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlayPause}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4 fill-current" />
                      ) : (
                        <Play className="h-4 w-4 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>

                    <span className="font-mono text-[11px] text-slate-300">
                      {currentTimeFormatted} / {durationFormatted}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-block rounded-md bg-[#C5A880]/20 text-[#dfcaa4] border border-[#C5A880]/40 px-2.5 py-0.5 text-[10px] font-mono font-bold">
                      STREAMING 4K
                    </span>

                    <button
                      onClick={toggleFullscreen}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                      title="Fullscreen"
                    >
                      <Maximize className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Chapter Selector & Information in Modal */}
            <div className="bg-[#0f172a] p-4 sm:p-6 border-t border-slate-800 text-white space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Jump to Scene Chapter:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeVideo.chapters?.map((chap, i) => (
                      <button
                        key={i}
                        onClick={() => jumpToChapter(chap.time)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/90 border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:bg-[#C5A880] hover:text-slate-950 transition-all cursor-pointer font-medium"
                      >
                        <span className="font-mono font-bold text-[#dfcaa4] group-hover:text-slate-950">
                          {chap.time}
                        </span>
                        <span>{chap.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveVideo(null)}
                  className="self-end sm:self-auto text-white border-white/20 hover:bg-white/10"
                >
                  Close Theater
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
