"use client"

import { useState } from "react"
import VoiceVisualizer from "../voice-visualizer"
import { LiquidGlass } from "../ui/liquid-glass"
import Onboarding from "../ui/onboarding"
import { ButtonOptions } from "../button-options"

interface SayloDashboardProps {
  onVolumeChange?: (volume: number) => void
  onListeningChange?: (isListening: boolean) => void
  onErrorChange?: (hasError: boolean) => void
}

export default function SayloDashboard({
  onVolumeChange,
  onListeningChange,
  onErrorChange,
}: SayloDashboardProps) {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true)
  }

  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  return (
    <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-2">
      <LiquidGlass 
        variant="panel" 
        intensity="strong" 
        className="w-full h-96 flex items-center justify-center p-8"
        stretchOnDrag={true}
        rippleEffect={true}
      >
        <VoiceVisualizer 
          onVolumeChange={onVolumeChange}
          onListeningChange={onListeningChange}
          onErrorChange={onErrorChange}
        />
      </LiquidGlass>
      
      {/* Button Options positioned in bottom right */}
      <div className="absolute bottom-4 right-4">
        <ButtonOptions />
      </div>
    </div>
  )
} 