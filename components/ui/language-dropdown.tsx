'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { useI18n } from '@/context/i18n-provider'
import { useRouter, usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n/dictionaries'

interface LanguageOption {
  code: Locale
  name: string
}

const languages: LanguageOption[] = [
  { code: 'pt', name: 'Português' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
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
          flex items-center justify-center gap-1.5 
          rounded-full 
          border border-neutral-600
          hover:border-primary
          active:scale-95
          px-3 py-1 
          min-w-[80px]
          text-xs font-medium 
          text-muted-foreground
          hover:text-primary
          transition-all duration-200
          bg-background/80 backdrop-blur-sm
        "
      >
        <span className="text-xs font-medium px-1">{currentLang.name}</span>
      </button>
      
      {/* Dropdown */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="
            absolute right-0 mt-2 w-36
            bg-background/95 backdrop-blur-md
            border border-neutral-600
            rounded-2xl shadow-xl
            z-[60] overflow-hidden
            animate-in fade-in zoom-in-95 duration-200
          "
        >
          <div className="p-1">
            {languages.map(lang => (
              <button
                key={lang.code}
                role="menuitem"
                aria-current={locale === lang.code ? 'true' : 'false'}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`
                  w-full flex items-center gap-2.5 px-3 py-2
                  rounded-xl
                  hover:bg-primary/10
                  transition-colors duration-150
                  text-left
                  ${locale === lang.code ? 'text-primary bg-primary/5' : 'text-muted-foreground hover:text-primary'}
                `}
              >
                <span className="text-xs font-medium">{lang.name}</span>
                {locale === lang.code && (
                  <Check className="w-3 h-3 ml-auto text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
