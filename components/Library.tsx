'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Film, Menu, Play, Search, VolumeX, X, Youtube } from 'lucide-react';
import { tiktokLink, type Video } from '../data/videos';

const filters = ['All Videos', 'Watchlists', 'Movie Breakdowns', 'Original Stories'] as const;

function Poster({ video }: { video: Video }) {
  return <div className="poster">
    {video.cover ? <img src={video.cover} alt={video.title} loading="lazy" /> :
      <div className="poster-placeholder"><Film size={32}/><span>LAZY LOOPIN</span></div>}
  </div>;
}

function VideoCard({ video, index, onOpen }: { video: Video; index: number; onOpen: (v: Video) => void }) {
  const [hover, setHover] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!hover || !player.current || failed) return;
    const element = player.current;
    element.play().catch(() => {});
    return () => { element.pause(); element.currentTime = 0; };
  }, [hover, failed]);

  return <button type="button" className="video-card"
    onMouseEnter={() => setHover(true)} onMouseLeave={() => {setHover(false);setReady(false);}}
    onClick={() => onOpen(video)} aria-label={`Watch ${video.title}`}>
    <div className="card-media">
      <Poster video={video}/>
      {hover && video.source && !failed && <video ref={player} src={video.source}
        className={`hover-preview ${ready ? 'ready' : ''}`}
        muted playsInline loop preload="metadata"
        onLoadedData={() => setReady(true)} onError={() => setFailed(true)} />}
      <span className="card-play"><Play size={23} fill="currentColor"/></span>
      {ready && hover && <span className="preview-tag"><VolumeX size={13}/> PREVIEW</span>}
    </div>
    <div className="video-card-meta"><span>{video.category}</span><span>{String(index+1).padStart(2,'0')}</span></div>
    <h3>{video.title}</h3>
    <span className="watch-link">WATCH NOW ↗</span>
  </button>;
}

function HeroCarousel({ videos, onOpen }: { videos: Video[]; onOpen: (v: Video) => void }) {
  const items = useMemo(() => {
    const chosen = videos.filter(v => v.featured);
    return [...chosen, ...videos.filter(v => !v.featured)].slice(0, 5);
  }, [videos]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (items.length < 2) return;
    const timer = window.setInterval(() => setActive(i => (i+1)%items.length), 6000);
    return () => window.clearInterval(timer);
  }, [items.length]);
  if (!items.length) return <div className="carousel-empty">Add videos to public/content to start your library.</div>;
  const current = items[active % items.length];
  return <div className="hero-carousel">
    <div className="carousel-heading"><span className="live-dot"/> FEATURED ON THE LOOP <span>{String(active+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</span></div>
    <div className="carousel-stage">
      <button className="carousel-slide" onClick={() => onOpen(current)} aria-label={`Watch ${current.title}`}>
        <Poster key={current.folder} video={current}/>
        <div className="slide-gradient"/>
        <div className="slide-details"><span>{current.category}</span><h3>{current.title}</h3><b><Play size={15} fill="currentColor"/> WATCH NOW</b></div>
      </button>
      {items.length > 1 && <>
        <button className="carousel-arrow prev" aria-label="Previous slide" onClick={() => setActive(i => (i-1+items.length)%items.length)}><ChevronLeft/></button>
        <button className="carousel-arrow next" aria-label="Next slide" onClick={() => setActive(i => (i+1)%items.length)}><ChevronRight/></button>
      </>}
    </div>
    <div className="carousel-bottom"><div className="carousel-dots">{items.map((v,i)=><button key={v.folder} aria-label={`Show ${v.title}`} aria-current={active===i} className={active===i?'active':''} onClick={()=>setActive(i)}/>)}</div><span>ORIGINALS · MOVIES · SERIES</span></div>
  </div>;
}

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', key);
    return () => {document.body.style.overflow = old;document.removeEventListener('keydown',key);};
  }, [onClose]);
  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="video-modal" role="dialog" aria-modal="true" aria-label={video.title} onMouseDown={e=>e.stopPropagation()}>
      <button className="modal-close" aria-label="Close video" onClick={onClose}><X/></button>
      <div className="modal-player">
        {video.source && !failed ? <video key={video.source} src={video.source} controls autoPlay playsInline onError={()=>setFailed(true)}/> :
          <div className="no-video"><Film size={42}/><strong>Video unavailable</strong><p>Check the file in public/content or watch on TikTok.</p></div>}
      </div>
      <div className="modal-info"><div><span className="section-kicker">{video.category}</span><h2>{video.title}</h2></div>
        {video.id && <a className="btn btn-primary" href={tiktokLink(video.id)} target="_blank" rel="noreferrer">Watch on TikTok <ExternalLink size={16}/></a>}
      </div>
    </div>
  </div>;
}

export default function Library({ videos }: { videos: Video[] }) {
  const [filter, setFilter] = useState<string>('All Videos');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Video|null>(null);
  const [menu, setMenu] = useState(false);
  const list = useMemo(() => videos.filter(v =>
    (filter === 'All Videos' || v.category === filter) &&
    v.title.toLowerCase().includes(search.trim().toLowerCase())), [videos,filter,search]);
  const featured = videos.find(v=>v.featured) ?? videos[0];
  return <>
    <header className="site-header"><a className="wordmark" href="#home">LAZY<span>LOOPIN</span><i>.</i></a>
      <nav className={menu?'nav-open':''}><a href="#home" onClick={()=>setMenu(false)}>Home</a><a href="#library" onClick={()=>setMenu(false)}>Videos</a><a href="#about" onClick={()=>setMenu(false)}>About</a></nav>
      <a className="header-follow" href="https://www.youtube.com/@lazyloopin/shorts" target="_blank" rel="noreferrer"><Youtube size={17}/> YouTube Shorts</a>
      <button className="menu-btn" aria-label="Toggle navigation" onClick={()=>setMenu(!menu)}><Menu/></button>
    </header>
    <main id="home">
      <section className="hero"><div className="hero-ambient"/><div className="hero-copy">
        <div className="eyebrow"><span className="live-dot"/> THE LOOP NEVER ENDS <span className="eyebrow-line"/></div>
        <h1>STORIES<br/>WORTH <em>THE</em><br/><strong>REPLAY.</strong></h1>
        <p>Movie obsessions. Wild plot twists. Original AI stories. One creator, endless loops.</p>
        <div className="hero-actions"><button className="btn btn-primary" disabled={!featured} onClick={()=>featured&&setSelected(featured)}><Play size={18} fill="currentColor"/> Watch Featured</button><a className="btn btn-outline" href="#library">Explore Library ↗</a></div>
        <div className="hero-meta"><span><b>{videos.length}</b> VIDEOS</span><span className="meta-divider"/><span>SHORT-FORM CINEMA</span></div>
      </div><HeroCarousel videos={videos} onOpen={setSelected}/></section>
      <section id="library" className="library-section">
        <div className="section-top"><div><div className="section-kicker">01 / THE COLLECTION</div><h2>ENTER THE <span>LIBRARY.</span></h2><p>Every recommendation, breakdown, and original story in one place.</p></div>
          <div className="search-box"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search titles..." aria-label="Search videos"/>{search&&<button aria-label="Clear search" onClick={()=>setSearch('')}><X size={16}/></button>}</div>
        </div>
        <div className="filter-bar">{filters.map(f=><button key={f} className={filter===f?'filter active':'filter'} onClick={()=>setFilter(f)}>{f}</button>)}<span className="results">{list.length} TITLES</span></div>
        <div className="video-grid">{list.map((v,i)=><VideoCard key={v.folder} video={v} index={i} onOpen={setSelected}/>)}</div>
        {list.length===0&&<p className="empty">No videos match your search, or no video folders have been added yet.</p>}
      </section>
      <section id="about" className="about-section"><div className="about-graphic"><img src="/branding/two-minute-guy.png" alt="Two-Minute Guy branding" onError={e=>{e.currentTarget.style.display='none';}}/></div>
        <div className="about-copy"><div className="section-kicker">02 / BEHIND THE LOOP</div><h2>MEET THE<br/><span>CREATOR.</span></h2>
          <p>Lazy Loopin is a creative playground for AI-powered storytelling, film recommendations, bite-sized breakdowns, and experiments in short-form entertainment.</p>
          <p>From the Two-Minute Guy to cinematic originals, the goal is simple: make every scroll worth stopping for.</p>
          <div className="social-links"><a href="https://www.tiktok.com/@lazyloopin" target="_blank" rel="noreferrer">TikTok <ExternalLink size={15}/></a><a href="https://www.youtube.com/@lazyloopin/shorts" target="_blank" rel="noreferrer">YouTube Shorts <ExternalLink size={15}/></a></div>
        </div>
      </section>
    </main>
    <footer><a className="wordmark" href="#home">LAZY<span>LOOPIN</span><i>.</i></a><span>MADE TO BE REPLAYED.</span><span>© {new Date().getFullYear()} LAZY LOOPIN</span></footer>
    {selected&&<VideoModal key={selected.folder} video={selected} onClose={()=>setSelected(null)}/>}
  </>;
}
