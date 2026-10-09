'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectVideo } from '@/types/portfolio';

const platformName = (platform: ProjectVideo['platform']) => platform === 'youtube' ? 'YouTube' : platform === 'tiktok' ? 'TikTok' : platform === 'instagram' ? 'Instagram' : 'Website';

function embedUrl(video: ProjectVideo) {
  if (video.platform === 'youtube') {
    const id = video.url.match(/(?:youtu\.be\/|[?&]v=|embed\/)([\w-]{11})/)?.[1];
    return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1` : null;
  }
  if (video.platform === 'tiktok') {
    const id = video.url.match(/video\/(\d+)/)?.[1];
    return id ? `https://www.tiktok.com/player/v1/${id}?autoplay=1&controls=1&music_info=0&description=0&rel=0` : null;
  }
  if (video.platform === 'instagram') {
    const match = video.url.match(/instagram\.com\/(reel|p)\/([^/?#]+)/);
    return match ? `https://www.instagram.com/${match[1]}/${match[2]}/embed/` : null;
  }
  return null;
}

export default function VideoPreviewPopup({ videos, index, projectTitle, poster, onClose, onChange }: { videos: ProjectVideo[]; index: number; projectTitle: string; poster?: string; onClose: () => void; onChange: (index: number) => void }) {
  const video = videos[index];
  const [loaded, setLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const src = video.previewSrc || embedUrl(video);
  const portrait = video.platform === 'instagram' || video.platform === 'tiktok';
  useEffect(() => { closeRef.current?.focus(); setLoaded(false); const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, [index, onClose]);
  return <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={`${projectTitle}, ${video.label}`} onClick={onClose}>
    <div className="relative w-full max-w-4xl max-h-[94dvh] overflow-auto rounded-2xl bg-[#0e0e0e] border border-white/15 p-3 sm:p-5" onClick={e => e.stopPropagation()}>
      <button ref={closeRef} onClick={onClose} aria-label="Close preview" className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/80 p-2 text-white"><X className="h-5 w-5" /></button>
      <div className={`relative mx-auto overflow-hidden rounded-xl bg-black ${portrait ? 'max-w-[420px] aspect-[9/16]' : 'aspect-video max-w-3xl'}`}>
        {!loaded && <div className="absolute inset-0 grid place-items-center text-xs font-mono text-gray-400">Loading preview</div>}
        {video.previewSrc ? <video src={video.previewSrc} controls autoPlay playsInline className="relative h-full w-full object-contain" onCanPlay={() => setLoaded(true)} /> : src ? <iframe src={src} title={video.label} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="relative h-full w-full border-0" onLoad={() => setLoaded(true)} /> : <div className="grid h-full place-items-center text-sm text-gray-400">Preview unavailable</div>}
      </div>
      <div className="mx-auto max-w-3xl pt-4"><p className="font-mono text-[10px] uppercase tracking-widest text-[#c84b2f]">{platformName(video.platform)}</p><h3 className="mt-1 text-base font-bold text-white">{projectTitle}</h3><p className="text-sm text-gray-400">{video.label}</p>
        <div className="mt-4 flex items-center gap-3"><a href={video.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#c84b2f] px-4 py-2.5 text-xs font-mono font-bold uppercase text-white">Open on {platformName(video.platform)}<ExternalLink className="h-3.5 w-3.5" /></a>{videos.length > 1 && <div className="ml-auto flex items-center gap-2 text-xs font-mono text-gray-300"><button disabled={index === 0} onClick={() => onChange(index - 1)} className="disabled:opacity-30"><ChevronLeft /></button><span>Eps {index + 1} of {videos.length}</span><button disabled={index === videos.length - 1} onClick={() => onChange(index + 1)} className="disabled:opacity-30"><ChevronRight /></button></div>}</div>
      </div>
    </div>
  </div>;
}
