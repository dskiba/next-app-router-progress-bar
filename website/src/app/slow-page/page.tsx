import { Link } from 'next-app-router-progress-bar/link'

// eslint-disable-next-line ts/explicit-function-return-type
export default async function SlowPage() {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return (
    <main className="grid place-items-center p-10">
      <h1 className="mb-4 text-2xl font-semibold">Slow page, delayed by 2s</h1>
      <Link href="/" className="underline mb-12">Go to Home</Link>
    </main>
  )
}
