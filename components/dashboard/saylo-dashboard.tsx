"use client"

import VoiceVisualizer from "../voice-visualizer"
import { LiquidGlass } from "../ui/liquid-glass"

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
    </div>
  )
} 