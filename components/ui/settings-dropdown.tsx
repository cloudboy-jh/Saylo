"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/core-ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/core-ui/input"
import { Label } from "@/components/ui/core-ui/label"
import { Key, Clipboard, Pin, Moon, Settings, UserCog } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/core-ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/core-ui/avatar"

interface SettingsDropdownProps {
  children?: React.ReactNode
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function SettingsDropdown({ children, isOpen, onOpenChange }: SettingsDropdownProps) {
  const [apiKey, setApiKey] = useState("")
  const [autoPaste, setAutoPaste] = useState(true)
  const [alwaysOnTop, setAlwaysOnTop] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)

  // Use external state if provided, otherwise use internal state
  const isOpenState = isOpen !== undefined ? isOpen : internalIsOpen
  const setIsOpenState = onOpenChange || setInternalIsOpen

  const handleSave = () => {
    // Save logic will be implemented later
    console.log("Settings saved:", { apiKey, autoPaste, alwaysOnTop, darkMode })
    setIsOpenState(false)
    setShowApiKeyInput(false)
  }

  const handleCancel = () => {
    setIsOpenState(false)
    setShowApiKeyInput(false)
  }

  const toggleApiKey = () => {
    setShowApiKeyInput(!showApiKeyInput)
  }

  const toggleAutoPaste = () => {
    setAutoPaste(!autoPaste)
  }

  const toggleAlwaysOnTop = () => {
    setAlwaysOnTop(!alwaysOnTop)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <Popover open={isOpenState} onOpenChange={setIsOpenState}>
      <PopoverTrigger asChild>
        {children || (
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0 rounded-xl shadow-lg border border-border" align="center" sideOffset={8} style={{ minWidth: 0 }}>
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold">Settings</h3>
          </div>

          {/* Settings List - Vertically Stacked Circular Buttons */}
          <div className="space-y-2 mb-3">
            {/* API Key Button */}
            <div className="flex items-center space-x-2">
              <Button
                variant={showApiKeyInput ? "default" : "outline"}
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-full transition-colors p-0",
                  showApiKeyInput &&
                    "bg-blue-500 hover:bg-blue-600 border-blue-500 text-white dark:bg-blue-600 dark:hover:bg-blue-700",
                )}
                onClick={toggleApiKey}
              >
                <Key className={cn("h-4 w-4", showApiKeyInput ? "text-white" : "text-blue-400")} />
              </Button>
              <div className="flex-1">
                <span className="text-xs font-medium">API Key</span>
                <p className="text-[10px] text-muted-foreground">Configure OpenAI API key</p>
              </div>
            </div>

            {/* Auto Paste Button */}
            <div className="flex items-center space-x-2">
              <Button
                variant={autoPaste ? "default" : "outline"}
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-full transition-colors p-0",
                  autoPaste &&
                    "bg-green-500 hover:bg-green-600 border-green-500 text-white dark:bg-green-600 dark:hover:bg-green-700",
                )}
                onClick={toggleAutoPaste}
              >
                <Clipboard className={cn("h-4 w-4", autoPaste ? "text-white" : "text-green-400")} />
              </Button>
              <div className="flex-1">
                <span className="text-xs font-medium">Auto Paste</span>
                <p className="text-[10px] text-muted-foreground">Automatically paste clipboard content</p>
              </div>
            </div>

            {/* Always on Top Button */}
            <div className="flex items-center space-x-2">
              <Button
                variant={alwaysOnTop ? "default" : "outline"}
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-full transition-colors p-0",
                  alwaysOnTop &&
                    "bg-purple-500 hover:bg-purple-600 border-purple-500 text-white dark:bg-purple-600 dark:hover:bg-purple-700",
                )}
                onClick={toggleAlwaysOnTop}
              >
                <Pin className={cn("h-4 w-4", alwaysOnTop ? "text-white" : "text-purple-400")} />
              </Button>
              <div className="flex-1">
                <span className="text-xs font-medium">Always on Top</span>
                <p className="text-[10px] text-muted-foreground">Keep window above other applications</p>
              </div>
            </div>

            {/* Dark Mode Button */}
            <div className="flex items-center space-x-2">
              <Button
                variant={darkMode ? "default" : "outline"}
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-full transition-colors p-0",
                  darkMode &&
                    "bg-indigo-500 hover:bg-indigo-600 border-indigo-500 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700",
                )}
                onClick={toggleDarkMode}
              >
                <Moon className={cn("h-4 w-4", darkMode ? "text-white" : "text-indigo-400")} />
              </Button>
              <div className="flex-1">
                <span className="text-xs font-medium">Dark Mode</span>
                <p className="text-[10px] text-muted-foreground">Switch to dark theme</p>
              </div>
            </div>
          </div>

          {/* API Key Input (only shows when API Key button is clicked) */}
          {showApiKeyInput && (
            <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <Label htmlFor="api-key" className="text-xs font-medium text-blue-700 dark:text-blue-300">
                OpenAI API Key
              </Label>
              <Input
                id="api-key"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-1 bg-white dark:bg-blue-900 border-blue-200 dark:border-blue-700 text-xs h-7 px-2"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center items-center space-x-2 pt-3 border-t mt-2">
            <Button variant="outline" size="sm" className="h-7 px-3 text-xs" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" className="h-7 px-3 text-xs" onClick={handleSave}>
              Save
            </Button>
            
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 w-7 p-0 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 hover:border-emerald-300 text-emerald-700 hover:text-emerald-800 dark:bg-emerald-950 dark:hover:bg-emerald-900 dark:border-emerald-800 dark:hover:border-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-200"
                >
                  <UserCog className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg"
                side="top"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                      <AvatarFallback className="rounded-lg">U</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">User Name</span>
                      <span className="truncate text-xs">user@example.com</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserCog className="mr-2 h-4 w-4" />
                    Account Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
