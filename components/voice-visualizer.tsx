"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"
import { AudioLinesAnimated } from "@/components/ui/audio-lines";

interface VoiceVisualizerProps {
  onVolumeChange?: (volume: number) => void
  onListeningChange?: (isListening: boolean) => void
  onErrorChange?: (hasError: boolean) => void
  className?: string
}

export default function VoiceVisualizer({
  onVolumeChange,
  onListeningChange,
  onErrorChange,
  className = "",
}: VoiceVisualizerProps) {
  const [isListening, setIsListening] = useState(false)
  const [time, setTime] = useState(0)
  const [volume, setVolume] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Audio refs
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isListening) {
      interval = setInterval(() => {
        setTime((t) => t + 1)
      }, 1000)
    } else {
      if (interval) {
        clearInterval(interval)
        interval = null
      }
      setTime(0)
    }
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isListening])

  // Audio analysis loop
  const analyzeAudio = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) return
    analyserRef.current.getByteFrequencyData(dataArrayRef.current)
    const average = dataArrayRef.current.reduce((sum, value) => sum + value, 0) / dataArrayRef.current.length
    const normalizedVolume = Math.min(average / 128, 1)
    setVolume(normalizedVolume)
    onVolumeChange?.(normalizedVolume)
    animationFrameRef.current = requestAnimationFrame(analyzeAudio)
  }, [onVolumeChange])

  const startListening = useCallback(async () => {
    try {
      setError(null)
      onErrorChange?.(false)
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })
      streamRef.current = stream
      // Create audio context and analyzer
      const AudioContextClass = window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) {
        throw new Error("AudioContext not supported")
      }
      audioContextRef.current = new AudioContextClass()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256
      analyserRef.current.smoothingTimeConstant = 0.8
      // Create microphone source
      const microphone = audioContextRef.current.createMediaStreamSource(stream)
      microphone.connect(analyserRef.current)
      // Create data array for frequency data
      const bufferLength = analyserRef.current.frequencyBinCount
      dataArrayRef.current = new Uint8Array(bufferLength)
      setIsListening(true)
      onListeningChange?.(true)
      analyzeAudio()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to access microphone"
      setError(errorMessage)
      onErrorChange?.(true)
    }
  }, [analyzeAudio, onListeningChange, onErrorChange])

  const stopListening = useCallback(() => {
    // Cancel animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    // Stop microphone stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    // Disconnect audio nodes
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    analyserRef.current = null
    dataArrayRef.current = null
    setIsListening(false)
    setVolume(0)
    onListeningChange?.(false)
  }, [onListeningChange])

  const handleClick = async () => {
    if (isListening) {
      stopListening()
    } else {
      await startListening()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className={cn("flex items-center flex-col gap-2", className)}>
      <button
        className={cn(
          "group rounded-2xl flex items-center justify-center transition-colors",
          isListening ? "bg-red-500 hover:bg-red-600 text-white" : "bg-none hover:bg-black/5 dark:hover:bg-white/5",
        )}
        type="button"
        onClick={handleClick}
        disabled={!!error}
      >
        <AudioLinesAnimated active={volume > 0.05} width={120} height={120} />
      </button>
      <div className="mt-2 text-center">
        {isListening ? (
          <span>Listening... {formatTime(time)}</span>
        ) : (
          <span>Click to start listening</span>
        )}
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  )
}
