import { useState, useEffect, useRef } from 'react'
import helmetsImg from '@/imports/ChatGPT_Image_15_de_ago._de_2026__16_47_20__1_.png'
import motorcycleSound from '@/imports/motorcycle-rev.wav'
import azulVideo from '@/imports/public/videos/azul-video-meu.mp4'
import vermelhoVideo from '@/imports/public/videos/vermelho-video-meu.mp4'
import marromVideo from '@/imports/public/videos/marrom-video-meu.mp4'
import brancoVideo from '@/imports/public/videos/branco-video-meu.mp4'

/* ─────────────────────────────────────────────────────────────
   UTILS
───────────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = ['MODELOS', 'TECNOLOGIA', 'SEGURANÇA']
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(5,5,10,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="syrax-wordmark-sm text-xl tracking-widest cursor-pointer bg-transparent border-none">
        SYRAX
      </button>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-10">
        {links.map(l => (
          <button
            key={l}
            onClick={() => scrollTo(l.toLowerCase().replace('ç', 'c').replace('ã', 'a'))}
            className="text-xs tracking-[0.22em] text-white/50 hover:text-white/90 transition-colors duration-300 font-light bg-transparent border-none cursor-pointer"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {l}
          </button>
        ))}
        <button
          onClick={() => scrollTo('modelos')}
          className="text-xs tracking-[0.18em] px-5 py-2 border border-white/20 hover:border-white/50 text-white/70 hover:text-white transition-all duration-300 cursor-pointer"
          style={{ fontFamily: 'Orbitron, sans-serif', background: 'rgba(255,255,255,0.03)' }}
        >
          EXPLORAR
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {[0,1,2].map(i => (
          <span key={i} className="block w-6 h-px bg-white/60 transition-all duration-300" />
        ))}
      </button>

      {menuOpen && (
        <div
          className="absolute top-16 left-0 right-0 flex flex-col items-center gap-6 py-10 md:hidden"
          style={{ background: 'rgba(5,5,10,0.96)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          {[...links, 'EXPLORAR'].map(l => (
            <button
              key={l}
              onClick={() => scrollTo(l === 'EXPLORAR' ? 'modelos' : l.toLowerCase().replace('ç', 'c').replace('ã', 'a'))}
              className="text-sm tracking-[0.2em] text-white/70 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */
function Hero() {
  const lineRef = useRef<HTMLDivElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // prepare audio asset for user-initiated play (button)
    const audio = new Audio(motorcycleSound)
    audio.preload = 'auto'
    audio.volume = 0.72
    audioRef.current = audio

    return () => {
      try { audio.pause(); audio.currentTime = 0 } catch {}
      audioRef.current = null
    }
  }, [])

  return (
    <section
      className="relative flex flex-col items-center justify-center"
      style={{ minHeight: '100vh', background: 'var(--bg)', overflow: 'hidden' }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Light streak top-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 1, top: '38%', left: '50%', transform: 'translateX(-50%)',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
        }}
      />

      {/* Line of light */}
      <div className="relative flex flex-col items-center gap-0 z-10">
        <div
          ref={lineRef}
          className="hero-line"
          style={{
            height: 1,
            width: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
            boxShadow: '0 0 6px 1px rgba(255,255,255,0.5)',
            marginBottom: 40,
            position: 'relative'
          }}
        />

        {/* (audio unlock button removed; autoplay unlock handled via pointer/keydown/touch listeners) */}

        {/* Logo */}
        <div className="hero-logo text-center">
          <div className="syrax-wordmark" style={{ fontSize: 'clamp(52px, 12vw, 110px)' }}>
            SYRAX
          </div>
          <div
            className="mt-1 tracking-[0.5em] text-white/25 font-light"
            style={{ fontSize: 'clamp(9px, 1.3vw, 13px)', fontFamily: 'Orbitron, sans-serif' }}
          >
            ELEMENTS IN MOTION.
          </div>
        </div>

        {/* Slogan */}
        <div
          className="hero-slogan mt-10 tracking-[0.15em] text-white/40 font-light"
          style={{ fontSize: 'clamp(11px, 1.5vw, 14px)', fontFamily: 'Orbitron, sans-serif' }}
        >
          THE NEXT RIDE.
        </div>

        {/* Horizontal line below slogan */}
        <div
          className="hero-tagline mt-6"
          style={{ width: 80, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
        />

        {/* CTA */}
        <div className="hero-cta mt-10">
          <button
            onClick={() => {
              try { audioRef.current && (audioRef.current.currentTime = 0) } catch {}
              audioRef.current?.play().catch(() => {})
              document.getElementById('modelos')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group relative overflow-hidden px-10 py-4 text-xs tracking-[0.22em] text-white/80 hover:text-white transition-all duration-300 cursor-pointer"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)' }}
            />
            EXPLORAR CAPACETES
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span
          className="tracking-[0.3em] text-white/25 font-light"
          style={{ fontSize: 10, fontFamily: 'Orbitron, sans-serif' }}
        >
          SCROLL TO EXPLORE
        </span>
        <div className="scroll-arrow text-white/25" style={{ fontSize: 14 }}>↓</div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   BRAND INTRO
───────────────────────────────────────────────────────────── */
function BrandIntro() {
  const pillars = ['PROTEÇÃO', 'PERFORMANCE', 'TECNOLOGIA', 'IDENTIDADE']
  return (
    <section className="relative py-32 px-6 md:px-20" style={{ background: 'var(--bg)' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
      />
      <div className="max-w-5xl mx-auto">
        <div className="reveal">
          <div
            className="font-light tracking-[0.3em] mb-6 text-white/30"
            style={{ fontSize: 11, fontFamily: 'Orbitron, sans-serif' }}
          >
            01 — SOBRE A SYRAX
          </div>
          <h2
            className="font-black leading-none mb-10"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(32px, 5.5vw, 72px)',
              background: 'linear-gradient(135deg, #fff 0%, #888 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            PROTEÇÃO.<br />REIMAGINADA.
          </h2>
          <p
            className="text-white/45 font-light leading-relaxed max-w-xl"
            style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', lineHeight: 1.8 }}
          >
            A SYRAX representa uma nova geração de capacetes, combinando engenharia,
            design e tecnologia para transformar a experiência sobre duas rodas.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px reveal" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {pillars.map((p, i) => (
            <div
              key={p}
              className="flex flex-col gap-3 py-8 px-6"
              style={{
                background: 'var(--bg)',
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className="w-6 h-px"
                style={{ background: 'rgba(255,255,255,0.3)' }}
              />
              <span
                className="tracking-[0.2em] text-white/60 font-medium"
                style={{ fontSize: 11, fontFamily: 'Orbitron, sans-serif' }}
              >
                {p}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   ELEMENTS INTRO
───────────────────────────────────────────────────────────── */
function ElementsIntro() {
  const elements = [
    { symbol: 'FIRE',  label: 'EMBER',  color: 'var(--ember)', accent: '░░▒▓' },
    { symbol: 'WATER', label: 'TIDE',   color: 'var(--tide)',  accent: '≋≋≈' },
    { symbol: 'EARTH', label: 'STONE',  color: 'var(--stone)', accent: '▪▪▫' },
    { symbol: 'AIR',   label: 'ZEPHYR', color: 'var(--zephyr)',accent: '∿∿∾' },
  ]
  return (
    <section className="py-32 px-6 md:px-20" style={{ background: '#07070e' }}>
      <div className="max-w-5xl mx-auto">
        <div className="reveal text-center mb-24">
          <div
            className="tracking-[0.3em] text-white/25 mb-6 font-light"
            style={{ fontSize: 11, fontFamily: 'Orbitron, sans-serif' }}
          >
            02 — OS QUATRO ELEMENTOS
          </div>
          <h2
            className="font-black leading-tight"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(22px, 4vw, 52px)',
              background: 'linear-gradient(135deg, #fff 0%, #888 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            FOUR ELEMENTS.<br />FOUR WAYS TO RIDE.
          </h2>
          <p className="mt-6 text-white/35 font-light tracking-wider max-w-md mx-auto" style={{ fontSize: 14 }}>
            Quatro conceitos. Quatro personalidades. Uma mesma filosofia de proteção.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {elements.map((el, i) => (
            <div
              key={el.label}
              className="reveal flex flex-col gap-4 p-6 cursor-default"
              style={{
                border: '1px solid rgba(255,255,255,0.06)',
                transitionDelay: `${i * 0.12}s`,
              }}
              onMouseEnter={e => {
                const t = e.currentTarget
                t.style.borderColor = `${el.color}40`
                t.style.boxShadow = `0 0 40px -10px ${el.color}30`
              }}
              onMouseLeave={e => {
                const t = e.currentTarget
                t.style.borderColor = 'rgba(255,255,255,0.06)'
                t.style.boxShadow = 'none'
              }}
            >
              <div style={{ color: el.color, fontSize: 20, opacity: 0.7 }}>{el.accent}</div>
              <div>
                <div
                  className="font-bold tracking-widest"
                  style={{ fontFamily: 'Orbitron, sans-serif', color: el.color, fontSize: 18 }}
                >
                  {el.label}
                </div>
                <div
                  className="mt-1 tracking-[0.25em] text-white/30 font-light"
                  style={{ fontSize: 9, fontFamily: 'Orbitron, sans-serif' }}
                >
                  {el.symbol}
                </div>
              </div>
              <div style={{ width: 24, height: 1, background: el.color, opacity: 0.4 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   HELMET SECTION
───────────────────────────────────────────────────────────── */

interface HelmetProps {
  index: number
  code: string
  element: string
  concept: string
  features: string[]
  accentColor: string
  bgX: string
  id: string
  videoSrc?: string
  videoConfig?: {
    pixelsPerRotation?: number
    reverseDrag?: boolean
    sensitivity?: number
    lerpFactor?: number
    seekThreshold?: number
    width?: string
    height?: string
  }
  side?: 'left' | 'right'
}

function HelmetSection({ index, code, element, concept, features, accentColor, bgX, id, videoSrc, videoConfig, side = 'right' }: HelmetProps) {
  const num = String(index).padStart(2, '0')
  const isRight = side === 'right'

const videoRef = useRef<HTMLVideoElement>(null)
const [isDragging, setIsDragging] = useState(false)

const dragStartX = useRef<number>(0)
const startTime = useRef<number>(0)
const targetTime = useRef<number>(0)
  const animationFrame = useRef<number | null>(null)
  const displayedTime = useRef<number>(0)
  const hasMetadata = useRef<boolean>(false)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current)
        animationFrame.current = null
      }
      // pause/reset video on unmount to avoid dangling resources
      try {
        if (videoRef.current) {
          videoRef.current.pause()
          // videoRef.current.currentTime = 0
        }
      } catch {}
    }
  }, [])

  // ensure metadata loaded and initialize displayedTime/targetTime
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onMeta = () => {
      hasMetadata.current = true
      displayedTime.current = v.currentTime || 0
      targetTime.current = v.currentTime || 0
    }
    v.addEventListener('loadedmetadata', onMeta)
    // if already ready
    if (v.readyState >= 1) onMeta()
    return () => v.removeEventListener('loadedmetadata', onMeta)
  }, [])
  
  return (
    <section
      id={index === 1 ? 'modelos' : undefined}
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: '100vh', background: 'var(--bg)', scrollMarginTop: 64 }}
    >
      {/* Accent glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '60vw', height: '60vw', borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor}12 0%, transparent 70%)`,
          top: '50%', left: isRight ? '55%' : '45%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Section number */}
      <div
        className="absolute top-8 right-8 font-light text-white/10"
        style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 80, fontWeight: 900, lineHeight: 1 }}
      >
        {num}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center py-24">

        {/* Text side */}
        <div className={`flex flex-col gap-6 ${isRight ? 'order-1' : 'order-1 md:order-2'}`}>
          <div className="reveal">
            <div
              className="tracking-[0.3em] font-light text-white/25 mb-4"
              style={{ fontSize: 10, fontFamily: 'Orbitron, sans-serif' }}
            >
              {num} / 04
            </div>
            <div
              className="font-black leading-none tracking-widest"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(48px, 7vw, 96px)',
                color: accentColor,
                textShadow: `0 0 60px ${accentColor}50`,
              }}
            >
              {code}
            </div>
            <div
              className="mt-1 tracking-[0.45em] text-white/35 font-light"
              style={{ fontSize: 12, fontFamily: 'Orbitron, sans-serif' }}
            >
              {element}
            </div>
          </div>

          <div
            className="reveal"
            style={{ width: 40, height: 1, background: accentColor, opacity: 0.5 }}
          />

          <p
            className="reveal text-white/50 font-light leading-relaxed"
            style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', lineHeight: 1.9, maxWidth: 440 }}
          >
            "{concept}"
          </p>

          <ul className="flex flex-col gap-3 mt-2">
            {features.map((f, i) => (
              <li
                key={f}
                className="reveal flex items-center gap-4 text-white/50 font-light"
                style={{ fontSize: 13, transitionDelay: `${i * 0.08}s` }}
              >
                <span style={{ width: 16, height: 1, background: accentColor, flexShrink: 0, opacity: 0.6 }} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Helmet image side */}
        <div
          className={`relative flex items-center justify-center ${isRight ? 'order-2' : 'order-2 md:order-1'}`}
          style={{ minHeight: 400 }}
        >
          {/* Glow ring behind helmet */}
          <div
            className="absolute"
            style={{
              width: '75%', height: '75%', borderRadius: '50%',
              background: `radial-gradient(circle, ${accentColor}18 0%, transparent 70%)`,
            }}
          />

          {/* Helmet crop
          <div
            className="reveal-right helmet-float"
            style={{
              width: 'min(480px, 90vw)',
              height: 'min(420px, 78vw)',
              backgroundImage: `url(${helmetsImg})`,
              backgroundSize: '400% auto',
              backgroundPosition: `${bgX} 10%`,
              backgroundRepeat: 'no-repeat',
              filter: `drop-shadow(0 0 40px ${accentColor}35)`,
            }}
          /> */}

           {/* Interactive helmet video */}
{/* Helmet crop
<div
  className="reveal-right helmet-float"
  style={{
    width: 'min(480px, 90vw)',
    height: 'min(420px, 78vw)',
    backgroundImage: `url(${helmetsImg})`,
    backgroundSize: '400% auto',
    backgroundPosition: `${bgX} 10%`,
    backgroundRepeat: 'no-repeat',
    filter: `drop-shadow(0 0 40px ${accentColor}35)`,
  }}
/> */}

{/* Interactive helmet video */}
<div
  className="reveal-right helmet-float relative select-none"
  style={{
    width: 'min(480px, 90vw)',
    height: 'min(420px, 78vw)',
    filter: `drop-shadow(0 0 40px ${accentColor}35)`,
    cursor: isDragging ? 'grabbing' : 'grab',
    touchAction: 'none',
  }}
  onPointerDown={(e) => {
  e.currentTarget.setPointerCapture(e.pointerId)

  const video = videoRef.current
  if (!video) return

  setIsDragging(true)

  dragStartX.current = e.clientX
  startTime.current = video.currentTime
  targetTime.current = video.currentTime
}}

onPointerMove={(e) => {
  if (!isDragging || !videoRef.current) return

  const video = videoRef.current
  const deltaX = e.clientX - dragStartX.current

  const {
    pixelsPerRotation: cfgPixels = 600,
    reverseDrag = false,
    sensitivity = 1,
    lerpFactor = 0.2,
    seekThreshold = 0.02,
  } = videoConfig ?? {}

  // apply sensitivity and compute rotation progress
  const effectivePixels = cfgPixels / Math.max(0.0001, sensitivity)
  const rotationProgress = deltaX / effectivePixels

  let newTime = startTime.current - rotationProgress * (video.duration || 0)
  if (reverseDrag) {
    newTime = startTime.current + rotationProgress * (video.duration || 0)
  }

  // wrap-around for infinite rotation
  if (video.duration > 0) {
    newTime = ((newTime % video.duration) + video.duration) % video.duration
  }

  targetTime.current = newTime

  // start a smoothing rAF loop that lerps displayedTime -> targetTime
  const step = () => {
    const vid = videoRef.current
    if (!vid) {
      animationFrame.current = null
      return
    }

    // lerp towards target
    displayedTime.current = displayedTime.current + (targetTime.current - displayedTime.current) * lerpFactor

    // only seek when difference is meaningful to avoid tiny seeks
    if (Math.abs(displayedTime.current - vid.currentTime) > seekThreshold) {
      try { vid.currentTime = displayedTime.current } catch {}
    }

    // continue loop while not yet close to target
    if (Math.abs(displayedTime.current - targetTime.current) > 0.001) {
      animationFrame.current = requestAnimationFrame(step)
    } else {
      animationFrame.current = null
    }
  }

  if (animationFrame.current === null) {
    animationFrame.current = requestAnimationFrame(step)
  }
}}

onPointerUp={(e) => {
  try { e.currentTarget.releasePointerCapture(e.pointerId) } catch {}
  setIsDragging(false)
}}

onPointerCancel={() => {
  setIsDragging(false)
}}
>
  <video
    ref={videoRef}
    src={videoSrc ?? vermelhoVideo}
    preload="auto"
    muted
    playsInline
    className="w-full h-full object-contain pointer-events-none"
  />

  {/* Instruction */}
  <div
    className="absolute bottom-3 left-1/2 -translate-x-1/2 
               text-white/30 tracking-[0.3em] text-[9px]
               pointer-events-none whitespace-nowrap"
    style={{ fontFamily: 'Orbitron, sans-serif' }}
  >
    ARRASTE PARA EXPLORAR
  </div>
</div>

          {/* Accent line */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
            style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
          />
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   TECHNOLOGY SECTION
───────────────────────────────────────────────────────────── */
const TECHS = [
  { id: 0, label: 'VISOR PANORÂMICO 220°',          desc: 'Campo de visão expandido para máxima percepção.', top: '20%', left: '72%' },
  { id: 1, label: 'COMUNICAÇÃO INTEGRADA',           desc: 'Conectividade discreta e de alta performance.',     top: '42%', left: '80%' },
  { id: 2, label: 'ILUMINAÇÃO LED INTELIGENTE',      desc: 'Luzes de posição, freio e seta integradas.',        top: '68%', left: '68%' },
  { id: 3, label: 'AJUSTE ADAPTATIVO',               desc: 'Sistema interno que se molda ao piloto em ms.',     top: '55%', left: '22%' },
  { id: 4, label: 'SEGURANÇA SYRAX',                 desc: 'Certificação além dos padrões internacionais.',     top: '22%', left: '26%' },
]

function TechnologySection() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section
      id="tecnologia"
      className="relative py-28 px-6 md:px-20 overflow-hidden"
      style={{ background: '#07070e', scrollMarginTop: 64 }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
      />

      <div className="max-w-5xl mx-auto">
        <div className="reveal text-center mb-16">
          <div
            className="tracking-[0.3em] text-white/25 mb-4 font-light"
            style={{ fontSize: 10, fontFamily: 'Orbitron, sans-serif' }}
          >
            05 — TECNOLOGIA SYRAX
          </div>
          <h2
            className="font-black"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(22px, 4vw, 52px)',
              background: 'linear-gradient(135deg, #fff 0%, #777 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            ENGINEERED FOR THE RIDE.
          </h2>
        </div>

        {/* Helmet + hotspots */}
        <div className="relative mx-auto" style={{ maxWidth: 580, height: 460 }}>
          {/* Helmet image (using EMBER column) */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${helmetsImg})`,
              backgroundSize: '400% auto',
              backgroundPosition: '0% 10%',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Hotspots */}
          {TECHS.map(tech => (
            <button
              key={tech.id}
              onClick={() => setActive(active === tech.id ? null : tech.id)}
              className="tech-dot absolute z-10 rounded-full border-0 cursor-pointer transition-all duration-300 flex items-center justify-center"
              style={{
                top: tech.top,
                left: tech.left,
                width: 14,
                height: 14,
                background: active === tech.id ? '#fff' : 'rgba(255,255,255,0.35)',
                boxShadow: active === tech.id
                  ? '0 0 0 3px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.4)'
                  : '0 0 0 1px rgba(255,255,255,0.2)',
              }}
            >
              {/* Connecting line + label */}
              {active === tech.id && (
                <div
                  className="absolute whitespace-nowrap"
                  style={{
                    left: parseFloat(tech.left) > 50 ? 'auto' : '100%',
                    right: parseFloat(tech.left) > 50 ? '100%' : 'auto',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    marginLeft: parseFloat(tech.left) > 50 ? 0 : 12,
                    marginRight: parseFloat(tech.left) > 50 ? 12 : 0,
                    animation: 'fadeIn 0.3s ease both',
                  }}
                >
                  <div
                    className="px-3 py-2 text-left"
                    style={{
                      background: 'rgba(5,5,10,0.92)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <div
                      className="text-white font-semibold tracking-wider"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 9 }}
                    >
                      {tech.label}
                    </div>
                    <div className="text-white/45 font-light mt-1" style={{ fontSize: 11, maxWidth: 180, lineHeight: 1.5 }}>
                      {tech.desc}
                    </div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Tech list below */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-px mt-12 reveal" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {TECHS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(active === t.id ? null : t.id)}
              className="flex flex-col gap-2 py-6 px-4 text-left cursor-pointer transition-all duration-300"
              style={{
                background: active === t.id ? 'rgba(255,255,255,0.05)' : 'var(--bg)',
                border: 'none',
                transitionDelay: `${i * 0.06}s`,
              }}
            >
              <div
                className="w-4 h-px"
                style={{ background: active === t.id ? '#fff' : 'rgba(255,255,255,0.25)' }}
              />
              <span
                className="tracking-wider font-medium leading-snug"
                style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 9, color: active === t.id ? '#fff' : 'rgba(255,255,255,0.45)' }}
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   ELEMENT SELECTOR
───────────────────────────────────────────────────────────── */
const MODELS = [
  { code: 'EMBER', element: 'FIRE',  trait: 'AGRESSIVIDADE', color: 'var(--ember)', bgX: '0%' },
  { code: 'TIDE',  element: 'WATER', trait: 'FLUIDEZ',       color: 'var(--tide)',  bgX: '33.33%' },
  { code: 'STONE', element: 'EARTH', trait: 'RESISTÊNCIA',   color: 'var(--stone)', bgX: '66.67%' },
  { code: 'ZEPHYR',element: 'AIR',   trait: 'LEVEZA',        color: 'var(--zephyr)',bgX: '100%' },
]

function ElementSelector() {
  return (
    <section className="py-28 px-6 md:px-20" style={{ background: 'var(--bg)' }}>
      <div
        className="absolute left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center mb-16">
          <div
            className="tracking-[0.3em] text-white/25 mb-4 font-light"
            style={{ fontSize: 10, fontFamily: 'Orbitron, sans-serif' }}
          >
            06 — ESCOLHA SEU MODELO
          </div>
          <h2
            className="font-black"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(22px, 4vw, 52px)',
              background: 'linear-gradient(135deg, #fff 0%, #777 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            WHICH ELEMENT ARE YOU?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODELS.map((m, i) => (
            <div
              key={m.code}
              className="element-card reveal flex flex-col cursor-pointer"
              style={{
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.02)',
                transitionDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={e => {
                const t = e.currentTarget
                t.style.borderColor = `${m.color}50`
                t.style.boxShadow = `0 20px 60px -10px ${m.color}20`
              }}
              onMouseLeave={e => {
                const t = e.currentTarget
                t.style.borderColor = 'rgba(255,255,255,0.07)'
                t.style.boxShadow = 'none'
              }}
            >
              {/* Helmet preview */}
              <div
                style={{
                  height: 220,
                  backgroundImage: `url(${helmetsImg})`,
                  backgroundSize: '400% auto',
                  backgroundPosition: `${m.bgX} 8%`,
                  backgroundRepeat: 'no-repeat',
                }}
              />

              {/* Card info */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <div
                    className="font-bold tracking-widest"
                    style={{ fontFamily: 'Orbitron, sans-serif', color: m.color, fontSize: 20 }}
                  >
                    {m.code}
                  </div>
                  <div
                    className="tracking-[0.3em] text-white/30 font-light"
                    style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 9 }}
                  >
                    {m.element}
                  </div>
                </div>
                <div style={{ width: 20, height: 1, background: m.color, opacity: 0.5 }} />
                <div
                  className="text-white/45 font-light tracking-widest"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 10 }}
                >
                  {m.trait}
                </div>

                <button
                  className="mt-auto py-3 text-xs tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer"
                  style={{
                    fontFamily: 'Orbitron, sans-serif',
                    border: `1px solid ${m.color}40`,
                    color: m.color,
                    background: 'transparent',
                    fontSize: 9,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${m.color}10` }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                >
                  VER MODELO
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   SAFETY SECTION
───────────────────────────────────────────────────────────── */
function SafetySection() {
  const pillars = [
    { label: 'ABSORÇÃO',     desc: 'Camadas estruturais que dissipam impacto em milissegundos.' },
    { label: 'ESTABILIDADE', desc: 'Aerodinâmica ativa mantém controle em qualquer velocidade.' },
    { label: 'VISIBILIDADE', desc: 'Campo de visão expandido para máxima percepção do entorno.' },
    { label: 'ADAPTAÇÃO',    desc: 'Sistema interno que se molda ao perfil único do piloto.' },
  ]
  return (
    <section
      id="seguranca"
      className="relative py-32 px-6 md:px-20 overflow-hidden"
      style={{ background: '#07070e', scrollMarginTop: 64 }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
      />

      {/* Big background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(80px, 18vw, 240px)',
          fontWeight: 900,
          color: 'rgba(255,255,255,0.015)',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
        }}
      >
        SAFE
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="reveal mb-20">
          <div
            className="tracking-[0.3em] text-white/25 mb-6 font-light"
            style={{ fontSize: 10, fontFamily: 'Orbitron, sans-serif' }}
          >
            07 — SEGURANÇA
          </div>
          <h2
            className="font-black leading-tight"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(28px, 5vw, 66px)',
              background: 'linear-gradient(135deg, #fff 0%, #666 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              maxWidth: 640,
            }}
          >
            PROTECTION<br />WITHOUT COMPROMISE.
          </h2>
          <p
            className="mt-6 text-white/40 font-light leading-relaxed max-w-xl"
            style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', lineHeight: 1.9 }}
          >
            A SYRAX combina materiais avançados, engenharia estrutural e tecnologias inteligentes
            para oferecer uma experiência de proteção pensada para o futuro.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.3)' }} />
            <span
              className="text-white/30 tracking-widest font-light"
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 10 }}
            >
              CERTIFICAÇÃO ALÉM DOS PADRÕES INTERNACIONAIS.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <div
              key={p.label}
              className="reveal flex gap-6 p-6 group transition-all duration-300"
              style={{
                border: '1px solid rgba(255,255,255,0.05)',
                transitionDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)' }}
            >
              <div
                className="mt-1 shrink-0"
                style={{ width: 1, height: 'auto', background: 'rgba(255,255,255,0.15)' }}
              />
              <div>
                <div
                  className="font-semibold tracking-[0.25em] text-white/80 mb-2"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 11 }}
                >
                  {p.label}
                </div>
                <p className="text-white/35 font-light leading-relaxed" style={{ fontSize: 13, lineHeight: 1.8 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center py-40 px-6 overflow-hidden"
      style={{ minHeight: '80vh', background: 'var(--bg)' }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="reveal syrax-wordmark" style={{ fontSize: 'clamp(40px, 8vw, 80px)' }}>
          SYRAX
        </div>

        <div
          className="reveal"
          style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
        />

        <h2
          className="reveal font-black"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(20px, 4vw, 48px)',
            background: 'linear-gradient(135deg, #fff 0%, #888 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            maxWidth: 560,
            lineHeight: 1.2,
          }}
        >
          THE NEXT RIDE<br />STARTS HERE.
        </h2>

        <p
          className="reveal text-white/35 font-light max-w-xs"
          style={{ fontSize: 14, lineHeight: 1.8 }}
        >
          Descubra qual elemento representa sua forma de pilotar.
        </p>

        <div className="reveal flex flex-col sm:flex-row items-center gap-4 mt-4">
          <button
            onClick={() => {
              document.getElementById('modelos')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-10 py-4 text-xs tracking-[0.22em] text-white font-medium cursor-pointer transition-all duration-300"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.14)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)' }}
          >
            EXPLORAR CAPACETES
          </button>
          <button
            onClick={() => document.getElementById('tecnologia')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 text-xs tracking-[0.22em] text-white/50 hover:text-white/80 font-light cursor-pointer transition-all duration-300 bg-transparent"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            CONHECER A TECNOLOGIA
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   BENEFITS
───────────────────────────────────────────────────────────── */
const BENEFITS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-8 h-8">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" />
      </svg>
    ),
    label: 'PROTEÇÃO',
    desc: 'Estrutura e tecnologias desenvolvidas para uma nova geração de proteção.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-8 h-8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
    label: 'VISIBILIDADE',
    desc: 'Visor panorâmico de 220° e iluminação LED inteligente.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-8 h-8">
        <path d="M8.56 2.9A7 7 0 0 1 19 9v1l1 9H4l1-9V9A7 7 0 0 1 8 2.9" />
        <path d="M12 12v4M12 8v.01" />
      </svg>
    ),
    label: 'CONECTIVIDADE',
    desc: 'Sistema de comunicação integrado, discreto e de alta performance.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-8 h-8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    ),
    label: 'CONFORTO',
    desc: 'Ajuste adaptativo que se molda à cabeça do piloto em milissegundos.',
  },
]

function BenefitsSection() {
  return (
    <section className="relative py-32 px-6 md:px-20 overflow-hidden" style={{ background: '#07070e' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

      {/* big ghost label */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(80px,16vw,220px)', fontWeight: 900, color: 'rgba(255,255,255,0.013)', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}
      >
        BEYOND
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="reveal mb-20">
          <div className="tracking-[0.3em] text-white/25 mb-5 font-light" style={{ fontSize: 10, fontFamily: 'Orbitron, sans-serif' }}>
            05 — BENEFÍCIOS
          </div>
          <h2
            className="font-black leading-none"
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(28px, 5vw, 64px)', background: 'linear-gradient(135deg, #fff 0%, #777 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
          >
            MORE THAN<br />A HELMET.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
          {BENEFITS.map((b, i) => (
            <div
              key={b.label}
              className="reveal group flex flex-col gap-5 p-8 transition-all duration-400 cursor-default"
              style={{ background: '#07070e', transitionDelay: `${i * 0.1}s` }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#07070e' }}
            >
              <div className="text-white/25 group-hover:text-white/60 transition-colors duration-400">{b.icon}</div>
              <div>
                <div className="tracking-[0.25em] font-semibold text-white/70 group-hover:text-white/90 transition-colors duration-300" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 10 }}>{b.label}</div>
                <div className="mt-1 w-6 h-px" style={{ background: 'rgba(255,255,255,0.2)' }} />
              </div>
              <p className="text-white/35 font-light leading-relaxed" style={{ fontSize: 13, lineHeight: 1.8 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────────────────────── */
const STEPS = [
  { num: '01', title: 'ESCOLHA SEU ELEMENTO', desc: 'Escolha entre EMBER, TIDE, STONE ou ZEPHYR.' },
  { num: '02', title: 'AJUSTE ADAPTATIVO',    desc: 'O sistema interno se adapta à cabeça do piloto.' },
  { num: '03', title: 'TECNOLOGIA INTEGRADA', desc: 'Comunicação, iluminação e visor fazem parte da experiência.' },
  { num: '04', title: 'PILOTE',               desc: 'Proteção, tecnologia e performance acompanham o piloto.' },
]

function HowItWorks() {
  return (
    <section className="relative py-32 px-6 md:px-20" style={{ background: 'var(--bg)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />
      <div className="max-w-5xl mx-auto">
        <div className="reveal mb-20">
          <div className="tracking-[0.3em] text-white/25 mb-5 font-light" style={{ fontSize: 10, fontFamily: 'Orbitron, sans-serif' }}>07 — COMO FUNCIONA</div>
          <h2 className="font-black" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(28px, 5vw, 60px)', background: 'linear-gradient(135deg, #fff 0%, #777 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            READY. ADAPT. RIDE.
          </h2>
        </div>

        {/* Process track */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div
            className="hidden md:block absolute top-8 left-0 right-0"
            style={{ height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.04))' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {STEPS.map((s, i) => (
              <div key={s.num} className="reveal flex flex-col gap-5" style={{ transitionDelay: `${i * 0.12}s` }}>
                {/* Node */}
                <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3">
                  <div
                    className="flex items-center justify-center rounded-full shrink-0"
                    style={{ width: 32, height: 32, border: '1px solid rgba(255,255,255,0.2)', background: 'var(--bg)' }}
                  >
                    <span className="text-white/50 font-mono" style={{ fontSize: 10 }}>{s.num}</span>
                  </div>
                  {/* Mobile connector */}
                  <div className="md:hidden flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                </div>
                <div>
                  <div className="font-semibold tracking-widest text-white/75 mb-2" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 10 }}>{s.title}</div>
                  <p className="text-white/35 font-light leading-relaxed" style={{ fontSize: 13, lineHeight: 1.8 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   SOCIAL PROOF
───────────────────────────────────────────────────────────── */
const REVIEWS = [
  { quote: 'O nível de acabamento e a sensação de estar usando algo realmente diferente de um capacete tradicional são incríveis.', author: 'Lucas M.', role: 'Piloto' },
  { quote: 'A tecnologia está integrada de uma forma muito natural, sem deixar o capacete visualmente pesado.', author: 'Marina R.', role: 'Motociclista' },
  { quote: 'A proposta da SYRAX une exatamente o que eu procuro: segurança, tecnologia e personalidade.', author: 'Rafael S.', role: 'Piloto' },
]

function SocialProof() {
  return (
    <section className="relative py-32 px-6 md:px-20 overflow-hidden" style={{ background: '#07070e' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />
      <div className="max-w-5xl mx-auto">
        <div className="reveal text-center mb-20">
          <div className="tracking-[0.3em] text-white/25 mb-5 font-light" style={{ fontSize: 10, fontFamily: 'Orbitron, sans-serif' }}>08 — AVALIAÇÕES</div>
          <h2 className="font-black" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(24px, 4.5vw, 54px)', background: 'linear-gradient(135deg, #fff 0%, #777 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            HEARD ON THE ROAD.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div
              key={r.author}
              className="reveal flex flex-col justify-between gap-8 p-8 transition-all duration-400"
              style={{ border: '1px solid rgba(255,255,255,0.06)', transitionDelay: `${i * 0.12}s` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'transparent' }}
            >
              <div>
                <div className="flex gap-0.5 mb-6" style={{ color: '#c9a84c' }}>
                  {[...Array(5)].map((_, j) => <span key={j} style={{ fontSize: 12 }}>★</span>)}
                </div>
                <p className="text-white/50 font-light leading-relaxed italic" style={{ fontSize: 14, lineHeight: 1.85 }}>"{r.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.2)' }} />
                <div>
                  <div className="text-white/70 font-medium tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 10 }}>{r.author}</div>
                  <div className="text-white/30 font-light" style={{ fontSize: 11 }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   PRICING
───────────────────────────────────────────────────────────── */
const PRICING = [
  { code: 'EMBER', element: 'FIRE',  price: 'R$ 4.990', color: 'var(--ember)', bgX: '0%' },
  { code: 'TIDE',  element: 'WATER', price: 'R$ 5.190', color: 'var(--tide)',  bgX: '33.33%' },
  { code: 'STONE', element: 'EARTH', price: 'R$ 5.490', color: 'var(--stone)', bgX: '66.67%' },
  { code: 'ZEPHYR',element: 'AIR',   price: 'R$ 5.290', color: 'var(--zephyr)',bgX: '100%' },
]

function PricingSection() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="relative py-32 px-6 md:px-20" style={{ background: 'var(--bg)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-6">
          <div className="tracking-[0.3em] text-white/25 mb-5 font-light" style={{ fontSize: 10, fontFamily: 'Orbitron, sans-serif' }}>09 — OFERTA</div>
          <h2 className="font-black" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(28px, 5vw, 60px)', background: 'linear-gradient(135deg, #fff 0%, #777 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            CHOOSE YOUR ELEMENT.
          </h2>
        </div>

        {/* Perks bar */}
        <div className="reveal flex flex-wrap gap-8 items-center mb-14 text-white/35" style={{ fontSize: 12 }}>
          <div className="flex items-center gap-3">
            <div style={{ width: 12, height: 1, background: 'rgba(255,255,255,0.25)' }} />
            Frete grátis para todo o Brasil
          </div>
          <div className="flex items-center gap-3">
            <div style={{ width: 12, height: 1, background: 'rgba(255,255,255,0.25)' }} />
            Garantia de 2 anos
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRICING.map((m, i) => {
            const active = hovered === m.code
            return (
              <div
                key={m.code}
                className="reveal element-card flex flex-col cursor-pointer"
                style={{
                  border: `1px solid ${active ? m.color + '55' : 'rgba(255,255,255,0.07)'}`,
                  background: active ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.015)',
                  boxShadow: active ? `0 24px 60px -12px ${m.color}20` : 'none',
                  transitionDelay: `${i * 0.08}s`,
                }}
                onMouseEnter={() => setHovered(m.code)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Helmet preview */}
                <div
                  style={{
                    height: 200,
                    backgroundImage: `url(${helmetsImg})`,
                    backgroundSize: '400% auto',
                    backgroundPosition: `${m.bgX} 8%`,
                    backgroundRepeat: 'no-repeat',
                    filter: active ? `drop-shadow(0 0 24px ${m.color}50)` : 'none',
                    transition: 'filter 0.4s ease',
                  }}
                />

                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div>
                    <div className="font-bold tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif', color: m.color, fontSize: 18 }}>{m.code}</div>
                    <div className="tracking-[0.3em] text-white/30 font-light" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 8 }}>{m.element}</div>
                  </div>

                  <div style={{ width: 20, height: 1, background: m.color, opacity: 0.4 }} />

                  <div
                    className="font-bold text-white"
                    style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 20, letterSpacing: '0.05em' }}
                  >
                    {m.price}
                  </div>
                  <div className="text-white/25 font-light" style={{ fontSize: 10 }}>conceitual</div>

                  <button
                    className="mt-auto py-3 text-xs tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer active:opacity-70"
                    style={{
                      fontFamily: 'Orbitron, sans-serif',
                      border: `1px solid ${m.color}55`,
                      color: active ? '#fff' : m.color,
                      background: active ? `${m.color}18` : 'transparent',
                      fontSize: 9,
                    }}
                  >
                    ESCOLHER MODELO →
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQ
───────────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'Quais tecnologias estão presentes nos capacetes SYRAX?', a: 'Visor Panorâmico 220°, Sistema de Comunicação Integrado, Iluminação LED Inteligente, Ajuste Adaptativo e as tecnologias específicas de cada modelo.' },
  { q: 'Qual a diferença entre os quatro modelos?', a: 'Cada modelo possui uma proposta inspirada em um elemento: Fire, Water, Earth e Air, além de características específicas próprias.' },
  { q: 'Como funciona o Ajuste Adaptativo?', a: 'O sistema interno se molda à cabeça do piloto em milissegundos.' },
  { q: 'Qual modelo devo escolher?', a: 'A escolha depende do perfil do piloto e da experiência desejada. Cada elemento representa uma proposta diferente.' },
  { q: 'Quais são os materiais utilizados?', a: 'Cada modelo possui sua própria composição e características, apresentadas em sua respectiva seção.' },
  { q: 'A SYRAX possui certificação?', a: 'A proposta da SYRAX é oferecer certificação além dos padrões internacionais.' },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="relative py-32 px-6 md:px-20" style={{ background: '#07070e' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />
      <div className="max-w-3xl mx-auto">
        <div className="reveal mb-16">
          <div className="tracking-[0.3em] text-white/25 mb-5 font-light" style={{ fontSize: 10, fontFamily: 'Orbitron, sans-serif' }}>11 — FAQ</div>
          <h2 className="font-black" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(20px, 3.5vw, 44px)', background: 'linear-gradient(135deg, #fff 0%, #777 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            FREQUENTLY ASKED<br />QUESTIONS
          </h2>
        </div>

        <div className="flex flex-col">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="reveal border-b"
              style={{ borderColor: 'rgba(255,255,255,0.07)', transitionDelay: `${i * 0.06}s` }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left cursor-pointer bg-transparent border-none group"
              >
                <span
                  className="pr-8 font-light text-white/65 group-hover:text-white/90 transition-colors duration-300"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(10px, 1.1vw, 13px)', letterSpacing: '0.08em', lineHeight: 1.5 }}
                >
                  {faq.q}
                </span>
                <span
                  className="shrink-0 transition-transform duration-400"
                  style={{
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: 14,
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  +
                </span>
              </button>

              <div
                style={{
                  maxHeight: open === i ? 200 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <p
                  className="pb-6 text-white/40 font-light leading-relaxed"
                  style={{ fontSize: 14, lineHeight: 1.85 }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
function Footer() {
  const links = ['MODELOS', 'TECNOLOGIA', 'SEGURANÇA', 'SOBRE', 'CONTATO']
  const social = ['Instagram', 'YouTube', 'LinkedIn']

  return (
    <footer
      className="py-16 px-6 md:px-20"
      style={{ background: '#03030a', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-12">
          <div className="syrax-wordmark-sm" style={{ fontSize: 24 }}>SYRAX</div>
          <nav className="flex flex-wrap gap-8">
            {links.map(l => (
              <button
                key={l}
                className="text-white/30 hover:text-white/70 transition-colors bg-transparent border-none cursor-pointer tracking-[0.2em]"
                style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 10 }}
              >
                {l}
              </button>
            ))}
          </nav>
          <div className="flex gap-6">
            {social.map(s => (
              <button
                key={s}
                className="text-white/25 hover:text-white/60 transition-colors bg-transparent border-none cursor-pointer font-light"
                style={{ fontSize: 12 }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div
          className="h-px w-full mb-8"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="text-white/20 font-light tracking-widest"
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 9 }}
          >
            © 2026 SYRAX. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-2 items-center">
            {['EMBER', 'TIDE', 'STONE', 'ZEPHYR'].map((m, i) => (
              <span
                key={m}
                className="text-white/15 font-light"
                style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 8, letterSpacing: '0.2em' }}
              >
                {m}{i < 3 ? ' ·' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────────────
   APP
───────────────────────────────────────────────────────────── */
export default function App() {
  useReveal()

  const helmets = [
    {
      index: 1, id: 'modelos', code: 'EMBER', element: 'FIRE',
      accentColor: 'var(--ember)', bgX: '0%', side: 'right' as const,
      concept: 'Linhas agressivas e angulares canalizam o calor e a energia. Entradas de ar ativas expelem o ar quente em alta velocidade.',
      features: ['Ventilação térmica ativa', 'Spoiler traseiro adaptativo', 'Viseira térmica fotocrômica', 'Estrutura em fibra de carbono e titânio'],
    },
    {
      index: 2, id: 'tide', code: 'TIDE', element: 'WATER',
      accentColor: 'var(--tide)', bgX: '33.33%', side: 'left' as const, videoSrc: azulVideo, videoConfig: { pixelsPerRotation: 450, reverseDrag: true, sensitivity: 1 },
      concept: 'Superfícies fluidas reduzem o atrito e permitem que o ar escorra como água. Sistema de microcanais mantém a temperatura ideal.',
      features: ['Microcanais de resfriamento', 'Viseira hidrofóbica auto-limpante', 'Vedação ativa contra água', 'Materiais leves com memória de forma'],
    },
    {
      index: 3, id: 'stone', code: 'STONE', element: 'EARTH',
      accentColor: 'var(--stone)', bgX: '66.67%', side: 'right' as const, videoSrc: marromVideo, videoConfig: { pixelsPerRotation: 600, reverseDrag: false, sensitivity: 1 },
      concept: 'Estrutura monolítica inspirada em rochas. Máxima absorção de impacto com camadas modulares que se adaptam ao piloto.',
      features: ['Camadas modulares de absorção', 'Estrutura de impacto distribuído', 'Estabilidade em alta velocidade', 'Acabamento mineral resistente a riscos'],
    },
    {
      index: 4, id: 'zephyr', code: 'ZEPHYR', element: 'AIR',
      accentColor: 'var(--zephyr)', bgX: '100%', side: 'left' as const, videoSrc: brancoVideo, videoConfig: { pixelsPerRotation: 500, reverseDrag: false, sensitivity: 1 },
      concept: 'Design ultra aerodinâmico inspirado no fluxo de ar. Leveza absoluta para velocidade sem esforço.',
      features: ['Aerodinâmica de fluxo laminar', 'Entradas de ar invisíveis', 'Viseira panorâmica 220°', 'Estrutura ultraleve em carbono trançado'],
    },
  ]

  return (
    <>
      <Navbar />
      <Hero />
      <BrandIntro />
      <ElementsIntro />
      {helmets.map(h => (
        <HelmetSection key={h.id} {...h} />
      ))}
      <BenefitsSection />
      <TechnologySection />
      <HowItWorks />
      <SocialProof />
      <PricingSection />
      <SafetySection />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}
