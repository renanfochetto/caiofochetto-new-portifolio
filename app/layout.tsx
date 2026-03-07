import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.caiofochetto.com'),
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
