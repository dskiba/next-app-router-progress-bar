import { Inter } from 'next/font/google'
import { PBProvider } from 'next-app-router-progress-bar'
import { ProgressBar } from 'next-app-router-progress-bar/progress-bar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next App Router Progress Bar Demo',
  description: 'A lightweight detector for progress-bar in Next.js App Router',
}

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
