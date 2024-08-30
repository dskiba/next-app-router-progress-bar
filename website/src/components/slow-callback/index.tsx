'use client'
import { usePBTransition } from 'next-app-router-progress-bar'
import { startTransition, useState } from 'react'

// eslint-disable-next-line ts/explicit-function-return-type
export function SlowCallback() {
  const { stop, start } = usePBTransition()
  const [count, setCount] = useState(0)
  const [delay, setDelay] = useState(1000)
  return (
    <div className="flex flex-col gap-4">
      <p className="">
        Count:
        <span className="bold">
          {' '}
          {count}
        </span>
      </p>
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium p-2 bg-gray-100 text-gray-800"
        onClick={() => {
          start()
          startTransition(async () => {
            // Introduces artificial slowdown
            await new Promise(resolve => setTimeout(resolve, delay))
            setCount(count => count + 1)
            stop()
          })
        }}
      >
        Trigger slow transition (
        {delay / 1000}
        s)
      </button>
      <p className="flex items-center mb-4 gap-2">
        Delay(ms):
        <input
          type="number"
          className="border rounded p-1 text-gray-800"
          value={delay}
          onChange={e => setDelay(Number(e.target.value))}
        />
      </p>
    </div>
  )
}
