"use client"

import type React from "react"

import { useState } from "react"
import { Mic, Keyboard, Activity, Rocket, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/core-ui/button"

interface OnboardingStep {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

interface OnboardingProps {
  onComplete?: () => void
}

const steps: OnboardingStep[] = [
  {
    icon: Mic,
    title: "Welcome to Saylo",
    description: "Your voice-powered overlay is ready to help you capture thoughts, commands, and ideas.",
  },
  {
    icon: Keyboard,
    title: "Use the Global Hotkey",
    description: "Trigger Saylo anytime with Ctrl + Shift + S.",
  },
  {
    icon: Activity,
    title: "Speak Freely",
    description: "Saylo listens, transcribes, and lets you paste wherever you're focused.",
  },
  {
    icon: Rocket,
    title: "You're All Set",
    description: "Let's go — try it now.",
  },
]

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setIsTransitioning(false)
      }, 150)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep(currentStep - 1)
        setIsTransitioning(false)
      }, 150)
    }
  }

  const handleFinish = () => {
    // Call the onComplete callback when onboarding is finished
    onComplete?.()
  }

  const currentStepData = steps[currentStep]
  const IconComponent = currentStepData.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-colors duration-300 ${
                  index <= currentStep ? "bg-purple-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div
            className={`transition-all duration-300 ${
              isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
            }`}
          >
            {/* Icon */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full">
                <IconComponent className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentStepData.title}</h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-8">{currentStepData.description}</p>

            {/* Special styling for hotkey step */}
            {currentStep === 1 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <kbd className="px-3 py-1 bg-white border border-gray-300 rounded text-sm font-mono shadow-sm">
                    Ctrl
                  </kbd>
                  <span className="text-gray-400">+</span>
                  <kbd className="px-3 py-1 bg-white border border-gray-300 rounded text-sm font-mono shadow-sm">
                    Shift
                  </kbd>
                  <span className="text-gray-400">+</span>
                  <kbd className="px-3 py-1 bg-white border border-gray-300 rounded text-sm font-mono shadow-sm">S</kbd>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
              {/* Back button */}
              {currentStep > 0 ? (
                <Button variant="outline" onClick={handleBack} className="flex items-center space-x-2 bg-transparent">
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
              ) : (
                <div /> // Empty div to maintain spacing
              )}

              {/* Next/Finish button */}
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext} className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700">
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleFinish} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
                  <span>Finish Setup</span>
                  <Rocket className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Skip option */}
        <div className="text-center mt-6">
          <button onClick={handleFinish} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            Skip onboarding
          </button>
        </div>
      </div>
    </div>
  )
}
