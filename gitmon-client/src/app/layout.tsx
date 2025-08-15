import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Providers from './provider'
import Navbar from '@components/Navbar'
import { plusJakartaSans, sen } from './fonts'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'GitMon',
  description: 'GitMon - GitHub 기반 블로그 플랫폼',
  icons: {
    icon: '/gitmon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} ${sen.variable} antialiased font-spoqa`}
      >
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
