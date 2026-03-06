'use client'
import Image from 'next/image'
import { useTheme } from '@/components/providers/theme-provider'

interface LogoProps {
  name: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager'; // ← ADICIONAR
  priority?: boolean; // ← ADICIONAR
}

export function Logo({
                       name,
                       alt,
                       width = 64,
                       height = 64,
                       className = '',
                       style,
                       loading = 'lazy', // ← DEFAULT: lazy
                       priority = false, // ← DEFAULT: false
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
      loading={loading} // ← USAR PROP
      priority={priority} // ← USAR PROP
    />
  )
}
