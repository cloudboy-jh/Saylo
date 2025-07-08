import { defineConfig } from 'vite'
import { builtinModules } from 'module'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isElectron = path.basename(path.resolve(__dirname, 'electron')) === 'electron';
  return {
    mode: process.env.MODE,
    root: path.join(__dirname, 'electron'),
    base: process.env.IS_DEV ? '/' : './',
    css: isElectron ? { postcss: undefined } : {},
    build: {
      outDir: path.join(__dirname, 'dist-electron'),
      emptyOutDir: false,
      rollupOptions: {
        input: {
          main: path.join(__dirname, 'electron/main.ts'),
          preload: path.join(__dirname, 'electron/preload.ts'),
        },
        external: [
          'electron',
          ...builtinModules,
        ],
      },
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, 'electron'),
      },
    },
  }
}) 