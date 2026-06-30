'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Volume2, VolumeX, RefreshCw } from 'lucide-react'

const INTRO_SCRIPT =
  "Hello, I'm Tanima Garg — a Data Analyst and BI Specialist based in Ottawa. " +
  "I build SQL and Python-driven reporting pipelines, Power BI and Tableau dashboards, " +
  "and data quality frameworks that help organisations make faster, better decisions. " +
  "With a Master of Engineering from the University of Ottawa and two years of hands-on experience " +
  "across healthcare, finance, and operations — I turn messy datasets into clear, actionable insights. " +
  "Welcome to my portfolio."

const BAR_COUNT = 24

export default function VoiceIntro() {
  const [speaking, setSpeaking] = useState(false)
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)
  const [supported, setSupported] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const barsRef = useRef<HTMLDivElement[]>([])
  const animFrameRef = useRef<number | null>(null)

  // Animate bars
  const animateBars = useCallback((active: boolean) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    if (!active) {
      barsRef.current.forEach((bar) => {
        if (bar) bar.style.transform = 'scaleY(0.15)'
      })
      return
    }
    const tick = () => {
      barsRef.current.forEach((bar, i) => {
        if (!bar) return
        const t = Date.now() / 300
        const height =
          0.15 +
          0.85 *
            Math.abs(
              Math.sin(t + i * 0.4) * Math.cos(t * 0.7 + i * 0.2)
            )
        bar.style.transform = `scaleY(${height.toFixed(3)})`
      })
      animFrameRef.current = requestAnimationFrame(tick)
    }
    tick()
  }, [])

  const speak = useCallback(
    (resume = false) => {
      if (!window.speechSynthesis) return

      window.speechSynthesis.cancel()

      const utter = new SpeechSynthesisUtterance(INTRO_SCRIPT)
      utter.rate = 0.92
      utter.pitch = 1.05
      utter.volume = muted ? 0 : 1

      // Try to pick a female voice (best on macOS: Samantha / en-US)
      const voices = window.speechSynthesis.getVoices()
      const preferred = voices.find(
        (v) =>
          /samantha|zira|google us english|karen|moira/i.test(v.name)
      )
      if (preferred) utter.voice = preferred

      utter.onstart = () => {
        setSpeaking(true)
        animateBars(true)
      }
      utter.onend = () => {
        setSpeaking(false)
        animateBars(false)
      }
      utter.onerror = () => {
        setSpeaking(false)
        animateBars(false)
      }

      utteranceRef.current = utter
      window.speechSynthesis.speak(utter)
      setStarted(true)
    },
    [muted, animateBars]
  )

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel()
    setSpeaking(false)
    animateBars(false)
  }, [animateBars])

  const toggleMute = useCallback(() => {
    if (utteranceRef.current) utteranceRef.current.volume = muted ? 1 : 0
    setMuted((m) => !m)
  }, [muted])

  // Check support & auto-play after voices load
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    setSupported(true)

    const autoPlay = () => {
      // Small delay so page has rendered
      setTimeout(() => speak(), 1200)
    }

    const voices = window.speechSynthesis.getVoices()
    if (voices.length) {
      autoPlay()
    } else {
      window.speechSynthesis.onvoiceschanged = autoPlay
    }

    return () => {
      window.speechSynthesis?.cancel()
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!supported) return null

  return (
    <div className="flex flex-col gap-4">
      {/* Waveform visualiser */}
      <div
        className="flex items-center gap-[3px] h-10"
        aria-hidden="true"
      >
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) barsRef.current[i] = el
            }}
            className="w-[3px] rounded-full origin-center transition-transform duration-75"
            style={{
              height: '100%',
              transform: 'scaleY(0.15)',
              backgroundColor: speaking
                ? `hsl(${200 + i * 4}, 80%, 75%)`
                : 'rgba(255,255,255,0.15)',
              transitionDuration: '60ms',
            }}
          />
        ))}
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-4">
        {/* Play / Replay */}
        <button
          onClick={() => (speaking ? stop() : speak())}
          className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
          title={speaking ? 'Stop voice intro' : 'Play voice intro'}
        >
          {speaking ? (
            <>
              <span className="flex gap-[3px] items-center">
                <span className="w-[3px] h-3 bg-current rounded-full" />
                <span className="w-[3px] h-3 bg-current rounded-full" />
              </span>
              Stop
            </>
          ) : (
            <>
              <RefreshCw size={12} className={started ? '' : 'hidden'} />
              {started ? 'Replay Intro' : 'Play Intro'}
            </>
          )}
        </button>

        <span className="w-px h-4 bg-white/10" />

        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          className="text-white/30 hover:text-white transition-colors"
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        {speaking && (
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 animate-pulse">
            Speaking…
          </span>
        )}
      </div>
    </div>
  )
}
