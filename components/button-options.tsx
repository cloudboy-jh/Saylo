"use client"

import * as React from "react"
import { Settings, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/core-ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/core-ui/tooltip"
import { AIModelPicker } from "./ai-model-picker"
import SettingsDropdown from "@/components/ui/settings-dropdown"

interface ButtonOptionsProps {
  className?: string
  onModelChange?: (value: string) => void
  selectedModel?: string
}

export function ButtonOptions({
  className,
  onModelChange,
  selectedModel,
}: ButtonOptionsProps) {
  const [showModelPicker, setShowModelPicker] = React.useState(false)
  const [showSettings, setShowSettings] = React.useState(false)

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.button-options-container')) {
        setShowModelPicker(false)
        setShowSettings(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3 button-options-container", className)}>
        {/* Model Picker Button */}
        <div className="relative">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-full transition-all duration-200",
                  "hover:bg-muted/50 hover:scale-105",
                  "focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  showModelPicker && "bg-muted/70 scale-105"
                )}
                onClick={() => {
                  setShowModelPicker(true)
                }}
              >
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-popover border border-border shadow-lg">
              <div className="flex items-center gap-2">
                <Cpu className="h-3 w-3" />
                <span>AI Model Selection</span>
              </div>
            </TooltipContent>
          </Tooltip>
          
          {showModelPicker && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50">
              <div className="relative">
                {/* Arrow pointer */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-popover"></div>
                <AIModelPicker
                  value={selectedModel}
                  onValueChange={(value) => {
                    onModelChange?.(value)
                    setShowModelPicker(false)
                  }}
                  className="w-56"
                />
              </div>
            </div>
          )}
        </div>

        {/* Settings Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <SettingsDropdown 
              isOpen={showSettings}
              onOpenChange={setShowSettings}
            >
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-full transition-all duration-200",
                  "hover:bg-muted/50 hover:scale-105",
                  "focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  showSettings && "bg-muted/70 scale-105"
                )}
                onClick={() => {
                  setShowSettings(true)
                }}
              >
                <Settings className="h-4 w-4 text-muted-foreground" />
              </Button>
            </SettingsDropdown>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-popover border border-border shadow-lg">
            <div className="flex items-center gap-2">
              <Settings className="h-3 w-3" />
              <span>Settings & Preferences</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
} 