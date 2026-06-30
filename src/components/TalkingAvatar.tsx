'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Volume2, VolumeX, RefreshCw, Play } from 'lucide-react'
import { getAssetPath } from '../utils/paths'

/* ------------------------------------------------------------------ *
 * Procedural talking avatar.
 *  - base image (cinematic-avatar-wide.jpg) with seamless mouth + eye overlays
 *  - lip-sync driven by the Web Speech API while the intro is spoken:
 *      • word-boundary events drive phoneme-aware visemes (in-sync motion)
 *      • mouth frames cross-fade so there are no hard cuts
 *      • a random rhythm is used as a fallback when a browser does not
 *        emit boundary events (e.g. some versions of Safari)
 *  - natural blinking, subtle head sway, idle breathing
 * Overlay positions are % of the 16:9 stage so they stay registered at any size.
 * ------------------------------------------------------------------ */

const INTRO_SCRIPT =
  "Hello, I'm Tanima Garg — a Data Analyst passionate about transforming complex data into clear insights, " +
  "building impactful dashboards, and driving data-driven decisions. Welcome to my portfolio."

// overlay geometry, measured against the 1024x576 (16:9) source image
const MOUTH = { left: 45.12, top: 50.0, width: 11.33 }
const EYES = { left: 44.14, top: 34.03, width: 13.28 }

const MOUTH_FRAMES = ['m0', 'm1', 'm2', 'm3', 'm4']
const EYE_FRAMES = ['e0', 'e1', 'e2']

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
const rand = (a: number, b: number) => a + Math.random() * (b - a)

// map a single letter to a mouth viseme frame
const visemeForChar = (c: string): string => {
  if ('aeà'.includes(c)) return Math.random() < 0.45 ? 'm3' : 'm2' // open vowels
  if ('o'.includes(c) || 'u'.includes(c) || 'w'.includes(c)) return 'm4' // rounded
  if ('iy'.includes(c)) return 'm2' // narrow open
  if ('mbp'.includes(c)) return 'm0' // lips closed
  if ('fv'.includes(c)) return 'm1' // light
  return 'm1' // generic consonant
}

export default function TalkingAvatar({
  isMuted,
  isPlaying,
  onMutedChange,
  onPlayingChange,
  hideControls = false,
}: {
  isMuted?: boolean;
  isPlaying?: boolean;
  onMutedChange?: (muted: boolean) => void;
  onPlayingChange?: (playing: boolean) => void;
  hideControls?: boolean;
}) {
  // two cross-fading mouth layers
  const [frameA, setFrameA] = useState('m0')
  const [frameB, setFrameB] = useState('m0')
  const [showA, setShowA] = useState(true)
  const showARef = useRef(true)

  const [eye, setEye] = useState('e0')
  const [speaking, setSpeaking] = useState(false)
  const [muted, setMuted] = useState(isMuted !== undefined ? isMuted : false)
  const [started, setStarted] = useState(false)
  const [needsTap, setNeedsTap] = useState(false)

  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)
  const talkTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const blinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wordTimers = useRef<Array<ReturnType<typeof setTimeout>>>([])
  const speakingRef = useRef(false)
  const boundaryRef = useRef(false)
  const levelRef = useRef(0)
  const mutedRef = useRef(isMuted !== undefined ? isMuted : false)

  /* ---------------- mouth cross-fade ---------------- */
  const setMouth = useCallback((f: string) => {
    if (showARef.current) {
      setFrameB(f)
      showARef.current = false
      setShowA(false)
    } else {
      setFrameA(f)
      showARef.current = true
      setShowA(true)
    }
  }, [])

  const clearWord = useCallback(() => {
    wordTimers.current.forEach((t) => clearTimeout(t))
    wordTimers.current = []
  }, [])

  /* ---------------- word-synced visemes ---------------- */
  const speakWord = useCallback(
    (word: string) => {
      clearWord()
      const chars = word.toLowerCase().split('').filter((c) => /[a-zà]/.test(c))
      if (!chars.length) {
        setMouth('m1')
        return
      }
      // build a compact viseme sequence; always emit on vowels
      const seq: string[] = []
      let prev = ''
      chars.forEach((c) => {
        const v = visemeForChar(c)
        if (v !== prev || 'aeiouà'.includes(c)) {
          seq.push(v)
          prev = v
        }
      })
      if (!seq.length) seq.push('m1')
      const dur = Math.max(150, word.length * 70)
      const step = dur / seq.length
      seq.forEach((v, i) => {
        wordTimers.current.push(setTimeout(() => setMouth(v), Math.round(i * step)))
      })
      // relax between words
      wordTimers.current.push(setTimeout(() => setMouth('m1'), Math.round(dur)))
    },
    [clearWord, setMouth]
  )

  /* ---------------- fallback random rhythm ---------------- */
  const nextViseme = useCallback(() => {
    let lvl = levelRef.current
    const r = Math.random()
    if (lvl === 0) lvl = 1 + (r < 0.35 ? 1 : 0)
    else if (r < 0.3) lvl = Math.max(0, lvl - 1)
    else if (r < 0.7) lvl = Math.min(3, lvl + (Math.random() < 0.55 ? 1 : 0))
    else lvl = Math.max(0, lvl - (Math.random() < 0.5 ? 1 : 0))
    levelRef.current = lvl
    if (lvl === 2 && Math.random() < 0.28) return 'm4'
    return MOUTH_FRAMES[lvl]
  }, [])

  const talkLoop = useCallback(() => {
    if (!speakingRef.current || boundaryRef.current) return
    setMouth(nextViseme())
    talkTimer.current = setTimeout(talkLoop, rand(85, 140))
  }, [nextViseme, setMouth])

  const stopTalking = useCallback(() => {
    speakingRef.current = false
    if (talkTimer.current) clearTimeout(talkTimer.current)
    clearWord()
    levelRef.current = 0
    setMouth('m0')
    setSpeaking(false)
    if (onPlayingChange) onPlayingChange(false)
  }, [clearWord, setMouth, onPlayingChange])

  /* ---------------- blinking ---------------- */
  const doBlink = useCallback(async () => {
    setEye('e1'); await wait(45)
    setEye('e2'); await wait(70)
    setEye('e1'); await wait(45)
    setEye('e0')
    if (Math.random() < 0.18) {
      await wait(140)
      setEye('e1'); await wait(40)
      setEye('e2'); await wait(60)
      setEye('e1'); await wait(40)
      setEye('e0')
    }
  }, [])

  const scheduleBlink = useCallback(() => {
    blinkTimer.current = setTimeout(async () => {
      await doBlink()
      scheduleBlink()
    }, rand(2600, 6200))
  }, [doBlink])

  /* ---------------- speech ---------------- */
  const speak = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()

    const u = new SpeechSynthesisUtterance(INTRO_SCRIPT)
    u.rate = 0.95
    u.pitch = 1.06
    u.volume = mutedRef.current ? 0 : 1

    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find((v) =>
      /samantha|zira|google uk english female|google us english|karen|moira|tessa|fiona/i.test(v.name)
    )
    if (preferred) u.voice = preferred

    u.onstart = () => {
      setNeedsTap(false)
      setStarted(true)
      setSpeaking(true)
      speakingRef.current = true
      boundaryRef.current = false
      levelRef.current = 1
      if (onPlayingChange) onPlayingChange(true)
      // fallback to the random rhythm if no word-boundary events arrive
      setTimeout(() => {
        if (speakingRef.current && !boundaryRef.current) talkLoop()
      }, 550)
    }

    u.onboundary = (e: SpeechSynthesisEvent) => {
      const name = (e as unknown as { name?: string }).name
      if (name && name !== 'word') return
      boundaryRef.current = true
      const ci = e.charIndex || 0
      const len = (e as unknown as { charLength?: number }).charLength
      let end: number
      if (typeof len === 'number' && len > 0) end = ci + len
      else {
        end = INTRO_SCRIPT.indexOf(' ', ci)
        if (end < 0) end = INTRO_SCRIPT.length
      }
      speakWord(INTRO_SCRIPT.slice(ci, end))
    }

    u.onend = stopTalking
    u.onerror = stopTalking

    utterRef.current = u
    window.speechSynthesis.speak(u)
  }, [talkLoop, stopTalking, speakWord, onPlayingChange])

  const replay = useCallback(() => {
    stopTalking()
    speak()
  }, [speak, stopTalking])

  const toggleMute = useCallback(() => {
    const nextMuted = !mutedRef.current
    const prevMuted = mutedRef.current
    mutedRef.current = nextMuted
    setMuted(nextMuted)
    if (utterRef.current) utterRef.current.volume = nextMuted ? 0 : 1
    if (onMutedChange) onMutedChange(nextMuted)
    if (speakingRef.current && prevMuted && !nextMuted) {
      replay()
    }
  }, [onMutedChange, replay])

  // Sync external muted state
  useEffect(() => {
    if (isMuted !== undefined && isMuted !== mutedRef.current) {
      const prevMuted = mutedRef.current
      mutedRef.current = isMuted
      setMuted(isMuted)
      if (utterRef.current) {
        utterRef.current.volume = isMuted ? 0 : 1
      }
      if (speakingRef.current && prevMuted && !isMuted) {
        replay()
      }
    }
  }, [isMuted, replay])

  // Sync external playing state
  useEffect(() => {
    if (isPlaying !== undefined) {
      if (isPlaying) {
        if (!speakingRef.current) {
          speak()
        }
      } else {
        if (speakingRef.current) {
          stopTalking()
        }
      }
    }
  }, [isPlaying, speak, stopTalking])

  /* ---------------- mount ---------------- */
  useEffect(() => {
    ;[...MOUTH_FRAMES, ...EYE_FRAMES].forEach((f) => {
      const im = new Image()
      im.src = getAssetPath(`/avatar/${f}.png`)
    })

    scheduleBlink()

    const hasSpeech = typeof window !== 'undefined' && !!window.speechSynthesis
    if (hasSpeech) {
      const tryAuto = () => {
        setTimeout(() => {
          speak()
          setTimeout(() => {
            if (!speakingRef.current) setNeedsTap(true)
          }, 600)
        }, 1100)
      }
      const v = window.speechSynthesis.getVoices()
      if (v.length) tryAuto()
      else window.speechSynthesis.onvoiceschanged = tryAuto

      const onGesture = () => {
        if (!speakingRef.current && !started) speak()
      }
      window.addEventListener('pointerdown', onGesture, { once: true })

      return () => {
        window.removeEventListener('pointerdown', onGesture)
        window.speechSynthesis?.cancel()
        if (talkTimer.current) clearTimeout(talkTimer.current)
        if (blinkTimer.current) clearTimeout(blinkTimer.current)
        clearWord()
      }
    }
    return () => {
      if (talkTimer.current) clearTimeout(talkTimer.current)
      if (blinkTimer.current) clearTimeout(blinkTimer.current)
      clearWord()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const mouthPos = { left: `${MOUTH.left}%`, top: `${MOUTH.top}%`, width: `${MOUTH.width}%` }

  return (
    <div className="relative h-full w-full select-none">
      {/* 16:9 avatar stage — full-bleed cover, centered, overlays stay aligned */}
      <div
        className={`avatar-stage absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
          speaking ? 'is-speaking' : ''
        }`}
        style={{
          width: 'max(100vw, calc(100vh * 16 / 9))',
          height: 'max(100vh, calc(100vw * 9 / 16))',
        }}
      >
        <div className="avatar-inner relative h-full w-full">
          <img
            src={getAssetPath('/cinematic-avatar-wide.jpg')}
            alt="Tanima Garg"
            className="h-full w-full object-cover"
            draggable={false}
          />
          {/* eye overlay (blinking) */}
          <img
            src={getAssetPath(`/avatar/${eye}.png`)}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{ left: `${EYES.left}%`, top: `${EYES.top}%`, width: `${EYES.width}%` }}
            draggable={false}
          />
          {/* mouth overlay — two cross-fading layers for smooth lip-sync */}
          <img
            src={getAssetPath(`/avatar/${frameA}.png`)}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{ ...mouthPos, opacity: showA ? 1 : 0, transition: 'opacity 55ms linear' }}
            draggable={false}
          />
          <img
            src={getAssetPath(`/avatar/${frameB}.png`)}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{ ...mouthPos, opacity: showA ? 0 : 1, transition: 'opacity 55ms linear' }}
            draggable={false}
          />
        </div>
      </div>

      {/* speaking indicator + controls */}
      {!hideControls && (
        <div className="absolute bottom-5 right-5 z-20 flex items-center gap-3">
          {needsTap && !speaking && (
            <button
              onClick={replay}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <Play size={12} /> Hear intro
            </button>
          )}
          {speaking && (
            <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.25em] text-white/80 backdrop-blur-md">
              <span className="speak-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Speaking
            </span>
          )}
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute intro' : 'Mute intro'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-md transition hover:bg-white/15"
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          {started && !speaking && (
            <button
              onClick={replay}
              aria-label="Replay intro"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-md transition hover:bg-white/15"
            >
              <RefreshCw size={13} />
            </button>
          )}
        </div>
      )}

      <style>{`
        .avatar-inner {
          transform-origin: 51% 46%;
          animation: avatarBreathe 5.5s ease-in-out infinite,
                     avatarSway 11s ease-in-out infinite;
        }
        .avatar-stage.is-speaking .avatar-inner {
          animation: avatarBreathe 5.5s ease-in-out infinite,
                     avatarSway 11s ease-in-out infinite,
                     avatarTalk 2.6s ease-in-out infinite;
        }
        @keyframes avatarBreathe {
          0%, 100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-0.4%) scale(1.012); }
        }
        @keyframes avatarSway {
          0%, 100% { rotate: -0.5deg; translate: -0.4% 0; }
          50%      { rotate: 0.5deg;  translate: 0.4% 0; }
        }
        @keyframes avatarTalk {
          0%, 100% { rotate: 0deg; }
          25%      { rotate: 0.35deg; translate: 0 -0.25%; }
          60%      { rotate: -0.3deg; }
        }
        .speak-dot { animation: speakPulse 1s ease-in-out infinite; }
        @keyframes speakPulse {
          0%, 100% { opacity: 0.35; transform: scale(0.8); }
          50%      { opacity: 1; transform: scale(1.15); }
        }
        @media (prefers-reduced-motion: reduce) {
          .avatar-inner, .avatar-stage.is-speaking .avatar-inner { animation: none; }
        }
      `}</style>
    </div>
  )
}
