import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron'
import * as path from 'path'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// ├─┬─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.DIST, '../public')
  : process.env.DIST

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    width: 1600, // Large window
    height: 900,
    alwaysOnTop: true, // Overlay behavior
    frame: false,      // No window border
    transparent: true, // See-through background
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(process.env.VITE_PUBLIC ?? '', 'electron-vite.svg'),
    show: false,
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(process.env.DIST ?? '', 'index.html'))
  }

  win.on('ready-to-show', () => {
    win?.show()
  })

  win.on('closed', () => {
    win = null
  })
}

app.whenReady().then(() => {
  createWindow()

  // Register global shortcut (Ctrl+Shift+S)
  const ret = globalShortcut.register('CommandOrControl+Shift+S', () => {
    if (win && win.webContents) {
      win.webContents.send('toggle-overlay')
    }
  })

  if (!ret) {
    console.log('Global shortcut registration failed')
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

// IPC handlers can be added here
ipcMain.handle('ping', () => 'pong') 