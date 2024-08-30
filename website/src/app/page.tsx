import { Link } from 'next-app-router-progress-bar/link'
import React from 'react'
import { SlowCallback } from '@/components/slow-callback'

// eslint-disable-next-line ts/explicit-function-return-type
export default function Home() {
  return (
    <main className="grid place-items-center p-10">
      <h1 className="mb-4 text-2xl font-semibold">Next App Router Progress Bar Demo</h1>
      <Link href="/slow-page" className="underline mb-12">Go to Slow Page (2s)</Link>
      <SlowCallback />
      <p className="mt-10">
        Based on
        {' '}
        <a
          href="https://buildui.com/posts/global-progress-in-nextjs"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          the article on BuildUI
        </a>
        {' '}
        by Sam Selikoff and Ryan Toronto

      </p>
    </main>
  )
}
