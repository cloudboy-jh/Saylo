export interface ElectronAPI {
  sendMessage: (message: string) => Promise<void>
  onMessage: (callback: (message: string) => void) => void
  ping: () => Promise<string>
  removeAllListeners: (channel: string) => void
  onToggleOverlay: (callback: () => void) => void
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
} 