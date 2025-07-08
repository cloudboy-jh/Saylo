# Voice Components

A Next.js application with Electron wrapper for voice-related components.

## Development

### Web Development
```bash
npm run dev
```

### Electron Development
```bash
npm run electron:dev
```

This will:
1. Start the Next.js development server
2. Build the Electron main and preload processes
3. Wait for the Next.js server to be ready
4. Launch the Electron app

## Building

### Web Build
```bash
npm run build
```

### Electron Build
```bash
npm run electron:build
```

### Distribution
```bash
npm run dist
```

## Features

- Next.js App Router
- Electron wrapper
- Global shortcut support (Ctrl+Shift+S)
- Secure IPC bridge between main and renderer processes
- TypeScript support

## Project Structure

```
voice-components/
├── app/                    # Next.js App Router
├── components/             # React components
├── electron/               # Electron main and preload processes
│   ├── main.ts            # Main process
│   ├── preload.ts         # Preload script
│   └── types.d.ts         # TypeScript declarations
├── dist-electron/          # Built Electron processes (generated)
└── dist/                  # Built Next.js app (generated)
```
