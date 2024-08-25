'use client'
import React, { startTransition } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { usePBTransition } from '../index'

// Copied from  https://github.com/vercel/next.js/blob/canary/packages/next/src/client/link.tsx#L180-L191
function isModifiedEvent(event: React.MouseEvent): boolean {
  // @ts-expect-error - copied from next
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement
  const target = eventTarget.getAttribute('target')
  return (
    (target && target !== '_self')
    || event.metaKey
    || event.ctrlKey
    || event.shiftKey
    || event.altKey // triggers resource download
    // @ts-expect-error - copied from next
    || (event.nativeEvent && event.nativeEvent.which === 2)
  )
}

export function Link({
  href,
  children,
  replace,
  scroll,
  ...rest
}: {
  href: string
} & Omit<Parameters<typeof NextLink>[0], 'link'>): React.ReactElement {
  const router = useRouter()
  const { start, stop } = usePBTransition()
  return (
    <NextLink
      href={href}
      onClick={(e) => {
        e.preventDefault()
        if (isModifiedEvent(e)) {
          return
        }
        start()
        startTransition(() => {
          if (replace) {
            router.replace(href, { scroll })
          }
          else {
            router.push(href, { scroll })
          }
          stop()
        })
      }}
      {...rest}
    >
      {children}
    </NextLink>
  )
}
