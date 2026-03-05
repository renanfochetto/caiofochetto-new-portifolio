'use client'

import { useEffect, useRef } from 'react'
import { trackScrollDepth } from '@/lib/analytics/track'

/**
 * Hook para trackear scroll depth automaticamente
 * Detecta quando usuário atinge 25%, 50%, 75%, 100% da página
 * Cada milestone é trackeado apenas 1 vez por sessão
 */
export function useScrollDepth() {
  const trackedDepths = useRef<Set<number>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      // Calcular scroll percentage
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollableHeight = documentHeight - windowHeight

      if (scrollableHeight <= 0) return // Página muito curta, não trackear

      const scrollPercentage = (scrollTop / scrollableHeight) * 100

      // Definir milestones
      const milestones: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100]

      // Verificar qual milestone foi atingido
      milestones.forEach((milestone) => {
        if (
          scrollPercentage >= milestone &&
          !trackedDepths.current.has(milestone)
        ) {
          // Trackear e marcar como tracked
          trackScrollDepth(milestone)
          trackedDepths.current.add(milestone)
        }
      })
    }

    // Throttle para performance (executar no máximo a cada 200ms)
    let ticking = false

    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    // Adicionar listener
    window.addEventListener('scroll', throttledHandleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])
}
