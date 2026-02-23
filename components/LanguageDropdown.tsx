'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { useRouter, usePathname } from 'next/navigation'
import type { Locale } from '@/lib/dictionaries'

interface LanguageOption {
  code: Locale
  name: string
  flag: string
}

const languages: LanguageOption[] = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
]

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { locale } = useI18n()
  const router = useRouter()
  const pathname = usePathname()
  
  const currentLang = languages.find(l => l.code === locale) || languages[0]
  
  // Click outside handler
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
  
  // ESC key handler
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey)
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen])
  
  function handleSelectLanguage(code: Locale) {
    if (code === locale) {
      setIsOpen(false)
      return
    }

    // Replace the locale in the pathname
    const segments = pathname.split('/')
    segments[1] = code
    const newPathname = segments.join('/')
    
    router.push(newPathname)
    setIsOpen(false)
  }
  
  return (
    <div ref={dropdownRef} className="relative">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Selecionar idioma"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="
          flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2
          border border-neutral-600 rounded-full
          bg-background/80 backdrop-blur-sm
          hover:border-primary
          hover:text-primary
          transition-all duration-200
          text-muted-foreground
          active:scale-95
        "
      >
        <span className="text-base lg:text-lg leading-none">{currentLang.flag}</span>
        <span className="text-xs font-medium">{currentLang.code.toUpperCase()}</span>
        <ChevronDown 
          className={`
            w-3.5 h-3.5 transition-transform duration-200
            ${isOpen ? 'rotate-180' : ''}
          `}
        />
      </button>
      
      {/* Dropdown */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="
            absolute right-0 mt-2 w-40 lg:w-48
            bg-neutral-900
            border border-primary/20
            rounded-lg shadow-xl
            z-[60] overflow-hidden
            animate-in slide-in-from-top-2 duration-200
          "
        >
          {languages.map(lang => (
            <button
              key={lang.code}
              role="menuitem"
              aria-current={locale === lang.code ? 'true' : 'false'}
              onClick={() => handleSelectLanguage(lang.code)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 lg:py-2.5
                hover:bg-neutral-800
                transition-colors duration-150
                text-left
                ${locale === lang.code ? 'text-primary' : 'text-neutral-300 hover:text-neutral-50'}
              `}
            >
              <div className="flex-shrink-0 w-4">
                {locale === lang.code && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
              <span className="text-lg leading-none">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
