import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'software-engineer-quiz-app',
  description: 'Created by Daniel Gehlen',
  generator: 'Daniel Gehlen.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
