'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, LanguageContextType, Translations } from '@/types/language';
import { en } from '@/lib/translations/en';
import { fi } from '@/lib/translations/fi';

const translations: Record<Language, Translations> = {
  en,
  fi,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fi'); // Default to Finnish to match existing Finnish localization

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('expense-tracker-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fi')) {
      setLanguage(savedLanguage);
    }
    // Note: We keep Finnish as default to maintain existing Finnish localization
  }, []);

  useEffect(() => {
    // Save language preference
    localStorage.setItem('expense-tracker-language', language);
  }, [language]);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: unknown = translations[language];
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = (result as Record<string, unknown>)[k];
      } else {
        // Fallback to English if key not found
        result = translations.en;
        for (const fallbackKey of keys) {
          if (result && typeof result === 'object' && fallbackKey in result) {
            result = (result as Record<string, unknown>)[fallbackKey];
          } else {
            console.warn(`Translation key "${key}" not found`);
            return key; // Return key as fallback
          }
        }
        break;
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  const value: LanguageContextType = {
    language,
    changeLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};