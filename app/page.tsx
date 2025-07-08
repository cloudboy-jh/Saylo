"use client"
import { useEffect, useState } from "react"
import SayloDashboard from "../components/dashboard/saylo-dashboard"
import dynamic from "next/dynamic"

const VoiceVisualizer = dynamic(() => import("../components/voice-visualizer"), { ssr: false })

export default function Page() {
  const [overlayVisible, setOverlayVisible] = useState(false)

  useEffect(() => {
    if (window.electronAPI?.onToggleOverlay) {
      window.electronAPI.onToggleOverlay(() => {
        setOverlayVisible((prev) => !prev)
      })
    }
  }, [])

  useEffect(() => {
    if (overlayVisible) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          console.log("Microphone stream:", stream)
        })
        .catch(err => {
          console.error("Microphone error:", err)
        })
    }
  }, [overlayVisible])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <SayloDashboard />
      </div>
      {overlayVisible && (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center backdrop-blur bg-black/40">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <VoiceVisualizer />
          </div>
        </div>
      )}
    </div>
  )
}
