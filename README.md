# next-app-router-progress-bar

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

A lightweight progress-bar detector for Next.js with App Router with zero dependencies.

Optimized for performance (no unnecessary re-renders) and minimal bundle size.

Included optioned progress bar and easing function.

## Demo

https://next-app-router-progress-bar.vercel.app/

## Usage
Add `PBProvider` to the root layout of your app.
```tsx
import { PBProvider } from 'next-app-router-progress-bar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
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

Add optioned Progress Bar to your layout.
```tsx
import { ProgressBar } from 'next-app-router-progress-bar/progress-bar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <PBProvider>
          <ProgressBar />
          {children}
        </PBProvider>
      </body>
    </html>
  )
}
```
Use wrapped Next.js `Link` component to navigate between pages.
```tsx
import { Link } from 'next-app-router-progress-bar/link'

// ...
<Link href="/profile">Go to Home</Link>
// ...
```

You can add Custom Progress Bar with `usePBProgress` hook.
```tsx
import { usePBProgress } from '../index'

export function CustomProgressBar(): React.ReactElement {
  const { progress, isLoading } = usePBProgress()
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress * 100}%`,
        height: '4px',
        zIndex: 99,
        overflow: 'hidden',
        backgroundColor: 'hotpink',
        transition: 'width 200ms ease-in-out',
        visibility: isLoading ? 'visible' : 'hidden',
      }}
    />
  )
}
```

Based on the [the article on Build UI](https://buildui.com/posts/global-progress-in-nextjs) by Sam Selikoff and Ryan Toronto

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
