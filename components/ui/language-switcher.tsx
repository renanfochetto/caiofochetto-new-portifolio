'use client'

import { useI18n } from '@/context/i18n-provider'
import { useRouter, usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n/dictionaries'
import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { springTransitions } from '@/hooks/use-animation'

interface LanguageOption {
  code: Locale
  name: string
  label: string
}

const languages: LanguageOption[] = [
  { code: 'pt', name: 'Português', label: 'PT' },
  { code: 'en', name: 'English', label: 'EN' },
  { code: 'es', name: 'Español', label: 'ES' }
]

// Ícones de bandeira simples em SVG
const Flags = {
  pt: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 rounded-sm" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" fill="#006600"/>
      <rect width="10" height="24" fill="#FF0000" x="14"/>
      <circle cx="14" cy="12" r="4" fill="#FFD700"/>
    </svg>
  ),
  en: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 rounded-sm" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" fill="#00247D"/>
      <path d="M0 0 L24 24 M24 0 L0 24" stroke="#fff" strokeWidth="3"/>
      <path d="M0 0 L24 24 M24 0 L0 24" stroke="#CF142B" strokeWidth="2"/>
      <path d="M12 0 V24 M0 12 H24" stroke="#fff" strokeWidth="4"/>
      <path d="M12 0 V24 M0 12 H24" stroke="#CF142B" strokeWidth="3"/>
    </svg>
  ),
  es: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 rounded-sm" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" fill="#AA151B"/>
      <rect width="24" height="12" fill="#F1BF00" y="6"/>
    </svg>
  )
}

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile'
}

export function LanguageSwitcher({ variant = 'desktop' }: LanguageSwitcherProps) {
  const { locale } = useI18n()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = languages.find(l => l.code === locale) || languages[0]

  const handleSelectLanguage = (code: Locale) => {
    if (code === locale) {
      setIsOpen(false)
      return
    }

    const segments = pathname.split('/')
    segments[1] = code
    const newPathname = segments.join('/')
    
    router.push(newPathname)
    setIsOpen(false)
  }

  // Click outside handler for desktop dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  if (variant === 'mobile') {
    return (
      <div className="flex items-center gap-1.5 p-1 rounded-full border border-neutral-600 bg-background transition-colors duration-300">
        {languages.map((lang) => {
          const isSelected = locale === lang.code
          return (
            <button
              key={lang.code}
              onClick={() => handleSelectLanguage(lang.code)}
              className="relative px-4 py-1.5 rounded-full text-xs font-bold transition-colors duration-300"
            >
              {isSelected && (
                <motion.div
                  layoutId="active-language"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={springTransitions.smooth}
                />
              )}
              <span className={`relative z-10 ${isSelected ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                {lang.label}
              </span>
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center justify-center gap-2 
          rounded-full 
          border border-neutral-600
          hover:border-primary
          active:scale-95
          px-2.5 py-1
          min-w-[44px]
          text-xs
          text-muted-foreground
          hover:text-primary
          transition-all duration-200
          bg-background/80 backdrop-blur-sm
        "
      >
        <span className="hidden lg:inline">{currentLang.name}</span>
        <span className="lg:hidden uppercase">{currentLang.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="
              absolute right-0 mt-2 w-40
              bg-background/95 backdrop-blur-md
              border border-neutral-600
              rounded-2xl shadow-xl
              z-[60] overflow-hidden
            "
          >
            <div className="p-1.5">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2
                    rounded-xl
                    transition-colors duration-150
                    text-left
                    ${locale === lang.code 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'}
                  `}
                >
                  <span className="text-xs font-medium flex-1">{lang.name}</span>
                  {locale === lang.code && (
                    <Check className="w-3.5 h-3.5 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
