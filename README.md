# next-app-router-progress-bar

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

A lightweight, zero-dependency solution for displaying redirect progress for **Next.js with App Router**.  
This library provides an easy way to add loading indicators for route transitions, optimized for performance with minimal bundle size.

## Features

- 🚀 Lightweight and zero dependencies
- ⚡ Optimized for performance with no unnecessary re-renders
- 📦 Minimal bundle size
- 🎨 Customizable progress bar
- 🔧 Easy integration with Next.js App Router
- 🧩 Includes a custom Link component for seamless navigation
- 🔧 Includes a custom ProgressBar and usePBProgress hook for creating custom progress indicators

## Demo

Check out the live demo: [https://next-app-router-progress-bar.vercel.app/](https://next-app-router-progress-bar.vercel.app/)

## Installation

```bash
npm install next-app-router-progress-bar
# or
yarn add next-app-router-progress-bar
# or
pnpm add next-app-router-progress-bar
```

## Usage

### 1. Add PBProvider to your root layout

In your root layout file (e.g., `app/layout.tsx`), wrap your application with the `PBProvider`:

```tsx
import { PBProvider } from 'next-app-router-progress-bar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PBProvider>
          {children}
        </PBProvider>
      </body>
    </html>
  )
}
```

### 2. Add the ProgressBar component

Add the `ProgressBar` component to your layout where you want the progress bar to appear:

```tsx
import { ProgressBar } from 'next-app-router-progress-bar/progress-bar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PBProvider>
          <ProgressBar />
          {children}
        </PBProvider>
      </body>
    </html>
  )
}
```

### 3. Use the Link component for navigation

Replace the Next.js `Link` component with the one provided by this library:

```tsx
import { Link } from 'next-app-router-progress-bar/link'

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  )
}
```

## Customization

### Custom Progress Bar

You can create a custom progress bar using the `usePBProgress` hook:

```tsx
import { usePBProgress } from 'next-app-router-progress-bar'

export function CustomProgressBar() {
  const { progress, isLoading } = usePBProgress()
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress * 100}%`,
        height: '4px',
        backgroundColor: 'blue',
        transition: 'width 200ms ease-in-out',
        visibility: isLoading ? 'visible' : 'hidden',
      }}
    />
  )
}
```

### Customizing PBProvider

The `PBProvider` component accepts the following props:

- `updateProgress`: A function to customize how the progress is updated. Default is an easing function.
- `timeout`: The interval (in milliseconds) at which the progress is updated. Default is 200ms.

Example:

```tsx
<PBProvider
  updateProgress={(progress) => Math.min(progress + 0.1, 0.95)}
  timeout={100}
>
  {children}
</PBProvider>
```

## API Reference

### PBProvider

The main provider component that manages the progress state.

### ProgressBar

A pre-styled progress bar component.

### Link

A wrapper around Next.js's Link component that triggers the progress bar.

### Hooks

- `usePBProgress`: Returns `{ progress, isLoading }` for creating custom progress indicators.
- `usePBTransition`: Returns `{ start, stop }` for manually controlling the progress bar.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

This package is an enhanced version of the demo by [Sam and Ryan's article on Build UI](https://buildui.com/posts/global-progress-in-nextjs).  
It utilizes React's `useOptimistic` to monitor React Transitions.

## License

[MIT](./LICENSE) License © 2024-PRESENT

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/next-app-router-progress-bar?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/next-app-router-progress-bar
[npm-downloads-src]: https://img.shields.io/npm/dm/next-app-router-progress-bar?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/next-app-router-progress-bar
[bundle-src]: https://img.shields.io/bundlephobia/minzip/next-app-router-progress-bar?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=next-app-router-progress-bar
[license-src]: https://img.shields.io/github/license/dskiba/next-app-router-progress-bar.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/dskiba/next-app-router-progress-bar/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/next-app-router-progress-bar
