'use client'

import { useScrollDepth } from '@/hooks/use-scroll-depth'

export function ScrollDepthTracker() {
  useScrollDepth()
  return null // Componente invisível, só executa o hook
}
