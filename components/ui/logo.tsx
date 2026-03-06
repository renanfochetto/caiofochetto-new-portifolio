'use client'

import Image from 'next/image'
import { useTheme } from '@/components/providers/theme-provider'

interface LogoProps {
  name: string
  alt: string
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Logo Component
 *
 * Wrapper around next/image que aplica CSS filter baseado no theme
 * para trocar a cor do SVG (dark = branco, light = preto)
 *
 * @param name - Nome do arquivo SVG (sem extensão) ex: "betfair"
 * @param alt - Alt text para acessibilidade
 * @param width - Largura em pixels
 * @param height - Altura em pixels
 * @param className - Classes CSS adicionais
 * @param style - Inline styles adicionais
 *
 * @example
 * <Logo name="betfair" alt="Betfair logo" width={64} height={64} />
 */
export function Logo({
                       name,
                       alt,
                       width = 64,
                       height = 64,
                       className = '',
                       style
                     }: LogoProps) {
  const { theme } = useTheme()

  return (
    <Image
      src={`/logos/${name}.svg`}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${theme === 'dark' ? 'logo-white' : 'logo-black'}`}
      style={style}
      unoptimized
    />
  )
}
