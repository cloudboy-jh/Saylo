"use client"

import * as React from "react"
import { Check, ChevronDown, Cpu, Brain, Sparkles, Chrome, Rocket, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/core-ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/core-ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/core-ui/popover"

const aiModels = [
  {
    value: "gpt-4o",
    label: "GPT-4o",
    provider: "OpenAI",
    description: "Most capable GPT-4 model",
    icon: Brain,
    color: "text-emerald-400",
    bgColor: "bg-emerald-50",
  },
  {
    value: "gpt-4o-mini",
    label: "GPT-4o Mini",
    provider: "OpenAI",
    description: "Faster and more affordable",
    icon: Brain,
    color: "text-emerald-400",
    bgColor: "bg-emerald-50",
  },
  {
    value: "claude-3-5-sonnet",
    label: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    description: "Advanced reasoning and analysis",
    icon: Sparkles,
    color: "text-purple-400",
    bgColor: "bg-purple-50",
  },
  {
    value: "claude-3-haiku",
    label: "Claude 3 Haiku",
    provider: "Anthropic",
    description: "Fast and lightweight",
    icon: Sparkles,
    color: "text-purple-400",
    bgColor: "bg-purple-50",
  },
  {
    value: "gemini-1.5-pro",
    label: "Gemini 1.5 Pro",
    provider: "Google",
    description: "Large context window",
    icon: Chrome,
    color: "text-blue-400",
    bgColor: "bg-blue-50",
  },
  {
    value: "gemini-1.5-flash",
    label: "Gemini 1.5 Flash",
    provider: "Google",
    description: "Fast multimodal model",
    icon: Chrome,
    color: "text-blue-400",
    bgColor: "bg-blue-50",
  },
  {
    value: "grok-beta",
    label: "Grok Beta",
    provider: "xAI",
    description: "Real-time knowledge",
    icon: Rocket,
    color: "text-orange-400",
    bgColor: "bg-orange-50",
  },
  {
    value: "llama-3.1-70b",
    label: "Llama 3.1 70B",
    provider: "Meta",
    description: "Open source model",
    icon: Users,
    color: "text-pink-400",
    bgColor: "bg-pink-50",
  },
]

interface AIModelPickerProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
}

export function AIModelPicker({
  value,
  onValueChange,
  placeholder = "Select AI model...",
  className,
}: AIModelPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(value || "")

  const selectedModel = aiModels.find((model) => model.value === selectedValue)

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === selectedValue ? "" : currentValue
    setSelectedValue(newValue)
    onValueChange?.(newValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between rounded-xl border-2 hover:border-primary/50 transition-colors",
            className,
          )}
        >
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-muted-foreground" />
            {selectedModel ? (
              <div className="flex items-center gap-3">
                <div className={cn("p-1.5 rounded-lg", selectedModel.bgColor)}>
                  <selectedModel.icon className={cn("h-4 w-4", selectedModel.color)} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{selectedModel.label}</span>
                  <span className="text-xs text-muted-foreground">{selectedModel.provider}</span>
                </div>
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 rounded-xl border-2" align="start">
        <Command className="rounded-xl">
          <CommandInput placeholder="Search AI models..." className="rounded-t-xl border-0 focus:ring-0" />
          <CommandList>
            <CommandEmpty>No AI model found.</CommandEmpty>
            <CommandGroup>
              {aiModels.map((model) => (
                <CommandItem
                  key={model.value}
                  value={model.value}
                  onSelect={handleSelect}
                  className="flex items-center justify-between p-3 cursor-pointer rounded-lg mx-1 my-0.5"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", model.bgColor)}>
                      <model.icon className={cn("h-4 w-4", model.color)} />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{model.label}</span>
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                          {model.provider}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">{model.description}</span>
                    </div>
                  </div>
                  <Check className={cn("h-4 w-4", selectedValue === model.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
