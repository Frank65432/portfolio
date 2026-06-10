import { useState } from "react";
import { Youtube, ExternalLink, Play, Eye, Calendar, Film, Disc, Monitor, AlertCircle, X } from "lucide-react";
import { YOUTUBE_VIDEOS } from "../data";

export default function YouTubeSection() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const handleOpenVideoSimulator = (id: string) => {
    setActiveVideoId(id);
  };

  const selectedSimVideo = YOUTUBE_VIDEOS.find((v) => v.id === activeVideoId);

  return (
    <div className="space-y-12 animate-fade-in text-[#F1F5F9]">
      
      {/* Editorial Header Section */}
      <div className="bg-[#0A100C]/70 border border-emerald-950/60 rounded-2xl p-6 md:p-8 space-y-5 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden bg-dot-matrix">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-emerald-950/50 pb-4">
          <div className="flex items-center gap-3">
            <Youtube className="w-8 h-8 text-[#10B981]" />
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#10B981] font-semibold">// MEDIA & BROADCAST</span>
              <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white leading-none mt-1">
                02_ Frank Marvin Devlog
              </h2>
            </div>
          </div>
          
          <button
            onClick={() => window.open("https://youtube.com", "_blank")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#10B981] text-[#050807] hover:bg-emerald-400 text-xs font-mono font-bold uppercase tracking-wider rounded-full cursor-pointer transition-all duration-300 shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:scale-105"
          >
            <span>SUBSCRIBE_CHANNEL</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-[#94A3B8] max-w-2xl leading-relaxed font-normal">
          I document software development, UI/UX optimization strategies, design guidelines, and the physical reality of building a streetwear brand. Sharing interactive source files, layout tricks, and workflow telemetry with 240,000+ developers.
        </p>

        {/* Media Grid stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-emerald-950/20">
          <div className="space-y-1">
            <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-500 block">TOTAL REVIEWS</span>
            <span className="text-xl font-display font-bold text-white">240K+ subs</span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-500 block">BROADCAST RATIO</span>
            <span className="text-xl font-display font-bold text-white">4K Resolution</span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-500 block">FREQUENCY</span>
            <span className="text-xl font-display font-bold text-[#10B981]">Weekly Drop</span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-500 block">FORMAT</span>
            <span className="text-xl font-display font-bold text-white">Build Vlogs</span>
          </div>
        </div>
      </div>

      {/* Grid of video list cards */}
      <div className="space-y-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-mono text-[#10B981] font-semibold">// LIVE AIR ARCHIVE</span>
          <h3 className="font-display font-black text-xl text-white uppercase mt-1 flex items-center gap-2">
            <Film className="w-5 h-5 text-[#10B981]" />
            Recent Broadcaster Logs
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {YOUTUBE_VIDEOS.map((video) => (
            <div
              id={`video-${video.id}`}
              key={video.id}
              onClick={() => handleOpenVideoSimulator(video.id)}
              className="group bg-[#0A100C]/70 border border-emerald-950/60 rounded-2xl overflow-hidden hover:border-[#10B981]/30 transition-all duration-300 backdrop-blur-md shadow-[0_5px_20px_rgba(0,0,0,0.5)] flex flex-col cursor-pointer"
            >
              {/* Media Preview Stage */}
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                <img
                  referrerPolicy="no-referrer"
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105 opacity-80"
                />
                
                {/* Duration badge */}
                <div className="absolute bottom-2.5 right-2.5 bg-neutral-950/80 backend-blur-md border border-neutral-800 text-[10px] font-mono font-bold text-white px-2 py-0.5 rounded">
                  {video.duration}
                </div>

                {/* Cover Overlay Play Button banner */}
                <div className="absolute inset-0 bg-[#0A100C]/40 group-hover:bg-[#0A100C]/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#10B981] text-[#050807] flex items-center justify-center shadow-lg border border-emerald-400/30 transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-[#050807] text-[#050807] ml-0.5" />
                  </div>
                </div>

                {/* Metadata tags */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-[#050807]/90 text-[#10B981] border border-emerald-950/80 text-[8px] font-mono px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Description body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <h4 className="font-display font-bold text-sm text-white group-hover:text-[#10B981] transition-colors leading-snug">
                  {video.title}
                </h4>

                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-2 border-t border-emerald-950/20">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#10B981]" />
                    {video.viewCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
                    {video.publishedAt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Stark CTA block */}
      <div className="bg-[#0A100C]/80 border border-emerald-800/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_12px_30px_rgba(0,0,0,0.5)] relative overflow-hidden bg-tech-grid">
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#10B981]/5 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="space-y-3 z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-800/40 text-[#10B981] px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider">
            SIMULATION BROADCAST
          </div>
          <h3 className="font-display font-black text-xl uppercase tracking-tight text-white">WEEKLY INTERACTION LOGS</h3>
          <p className="text-xs text-[#94A3B8] max-w-md font-normal leading-relaxed">
            I compile code design walkthroughs, custom Vite guides, and UI speedruns. Click subscribe to stream in high resolution.
          </p>
        </div>

        <button
          id="yt-sub-btn"
          onClick={() => window.open("https://youtube.com", "_blank")}
          className="px-6 py-3.5 bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-[#22C55E] hover:to-[#059669] text-[#050807] font-bold text-xs uppercase tracking-widest rounded-full cursor-pointer flex items-center justify-center gap-2 shrink-0 transition-all duration-300 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:scale-105"
        >
          <Youtube className="w-4 h-4" />
          <span>SUBSCRIBE_YT // EXPORT_STREAM</span>
        </button>
      </div>

      {/* Simulator Modal Dialog Backdrop */}
      {activeVideoId && selectedSimVideo && (
        <div className="fixed inset-0 z-50 bg-[#050807]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-[#0A100C] border border-emerald-900/60 rounded-2xl overflow-hidden shadow-2xl relative">
            
            {/* Header metadata bar */}
            <div className="flex items-center justify-between p-4 bg-emerald-950/25 border-b border-emerald-950/50 text-white">
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-[#10B981]" />
                <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-emerald-400">02_ EMULATOR CLIENT CLIENT</span>
              </div>
              <button
                onClick={() => setActiveVideoId(null)}
                className="w-7 h-7 rounded-full bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated Live Player Frame */}
            <div className="p-6 space-y-4">
              <div className="relative aspect-video w-full border border-emerald-950/60 rounded-xl bg-neutral-950 flex flex-col justify-between p-6 overflow-hidden">
                <div className="w-full flex justify-between items-start">
                  <span className="bg-[#10B981] text-[#050807] text-[8px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    DECODING_MATRIX_LIVE
                  </span>
                  <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 text-[9px] text-[#F5F5F0] font-mono border border-white/10 rounded">
                    <Disc className="w-3 h-3 text-red-500 animate-spin" />
                    <span>0:00 / {selectedSimVideo.duration}</span>
                  </div>
                </div>

                <div className="self-center flex flex-col items-center text-center space-y-4 z-10">
                  <div className="w-16 h-16 rounded-full bg-[#10B981]/90 hover:bg-emerald-400 text-[#050807] flex items-center justify-center border border-emerald-400 animate-pulse cursor-pointer transition-colors shadow-lg">
                    <Play className="w-6 h-6 text-[#050807] fill-[#050807] ml-1" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#10B981]/70 block">SIMULATION PROTOCOL ACTIVE</span>
                    <span className="text-white text-xs block font-bold mt-1 text-center max-w-md">{selectedSimVideo.title}</span>
                  </div>
                </div>

                {/* Video Playback Progress bar */}
                <div className="w-full bg-neutral-900 border border-neutral-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#10B981] h-full w-[4%] rounded-full"></div>
                </div>
              </div>

              {/* Simulator Specifications list */}
              <div className="bg-[#050807] p-4 rounded-xl border border-emerald-950/40 text-xs font-mono space-y-2">
                <div className="text-neutral-500">// SIMULATED_STREAM_INFO_RECORDS</div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div><span className="text-neutral-500">VIDEO_ID_NODE:</span> <span className="text-[#10B981]">{selectedSimVideo.id}</span></div>
                  <div><span className="text-neutral-500">PLAYLIST_STRETCH:</span> <span className="text-white">TRUE</span></div>
                  <div><span className="text-neutral-500">EMISSION_PRESET:</span> <span className="text-white">VP9 Decoders</span></div>
                  <div><span className="text-neutral-500">ACTIVE:</span> <span className="text-[#10B981]">ONLINE</span></div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}
