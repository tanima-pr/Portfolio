'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { getAssetPath } from '../utils/paths'

const VideoIntro = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    // Entrance animations
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
      })
      
      gsap.from('.video-container', {
        opacity: 0,
        scale: 1.05,
        duration: 2,
        ease: 'expo.out'
      })
    }, containerRef)

    // Auto-hide sound hint
    const timer = setTimeout(() => setShowHint(false), 5000)

    return () => {
      ctx.revert()
      clearTimeout(timer)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause()
      else videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
      setShowHint(false)
    }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex flex-col justify-end overflow-hidden px-8 md:px-16 pb-20">
      
      {/* Navbar Overlay */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-8 md:px-16">
        <div className="flex gap-8 md:gap-12">
          <a href="#about" className="text-[10px] md:text-xs font-medium tracking-[0.3em] text-white/50 uppercase hover:text-white transition-colors">About</a>
          <a href="#projects" className="text-[10px] md:text-xs font-medium tracking-[0.3em] text-white/50 uppercase hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="text-[10px] md:text-xs font-medium tracking-[0.3em] text-white/50 uppercase hover:text-white transition-colors">Contact</a>
        </div>
        <a href="mailto:Tanimagargt.g@gmail.com" className="text-[10px] md:text-xs font-medium tracking-[0.3em] text-white border border-white/20 px-6 py-2.5 rounded-full uppercase hover:bg-white hover:text-black transition-all">Email Me</a>
      </nav>

      {/* Background Video Layers */}
      <div className="absolute inset-0 z-0 video-container">
        {/* Ambient Blurred Background Video */}
        <div className="absolute inset-0 blur-[100px] scale-110 opacity-30">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src={getAssetPath('/hero-video-placeholder.mp4')} type="video/mp4" />
          </video>
        </div>

        {/* Main sharp video */}
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted={isMuted} 
          playsInline 
          className="w-full h-full object-cover object-center"
          poster={getAssetPath('/hero-bg.png')}
        >
          <source src={getAssetPath('/hero-video-placeholder.mp4')} type="video/mp4" />
        </video>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 hero-content max-w-5xl">
        <p className="text-[10px] md:text-xs font-light tracking-[0.4em] text-white/40 uppercase mb-8">
          Portfolio · 2026
        </p>
        
        <h1 className="font-black text-white uppercase leading-[0.85] tracking-tight mb-8" style={{ fontSize: 'clamp(4rem, 15vw, 11rem)' }}>
          Tanima<br />
          <span className="hero-heading">Garg</span>
        </h1>

        <p className="max-w-xl text-sm md:text-lg font-light tracking-wide text-white/60 leading-relaxed mb-12">
          Data Analyst with a diagnostic approach to messy datasets—translating raw information into clean metrics, validated reporting, and scalable dashboards.
        </p>

        {/* Controls and Sound Hint */}
        <div className="flex items-center gap-6">
          <div className="flex gap-3">
            <button 
              onClick={togglePlay}
              className="glass-card w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
            </button>
            <button 
              onClick={toggleMute}
              className="glass-card w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
          
          {showHint && (
             <div className="text-[10px] tracking-[0.2em] uppercase text-white/40 animate-pulse">
               Tap for sound
             </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <p className="text-[9px] tracking-[0.4em] text-white/30 uppercase">Scroll</p>
        <div className="w-[1px] h-12 bg-white/10 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scrollLine" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scrollLine {
          animation: scrollLine 2s cubic-bezier(0.15, 0.41, 0.69, 0.94) infinite;
        }
      `}</style>
    </div>
  )
}

export default VideoIntro
