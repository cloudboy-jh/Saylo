import { contextBridge, ipcRenderer } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('electronAPI', {
  // Example: Send a message to the main process
  sendMessage: (message: string) => ipcRenderer.invoke('send-message', message),
  
  // Example: Receive a message from the main process
  onMessage: (callback: (message: string) => void) => {
    ipcRenderer.on('main-process-message', (_event, message) => callback(message))
  },
  
  // Example: Ping the main process
  ping: () => ipcRenderer.invoke('ping'),
  
  // Remove event listeners when the window is closed
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel)
  },

  // Listen for toggle-overlay event
  onToggleOverlay: (callback: () => void) => {
    ipcRenderer.on('toggle-overlay', callback)
  },
})

// --------- Preload scripts are loaded before other scripts ---------
// You can access Node.js APIs here, and use `contextBridge` to expose
// selected APIs to the renderer process.

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]!)
  }
}) 