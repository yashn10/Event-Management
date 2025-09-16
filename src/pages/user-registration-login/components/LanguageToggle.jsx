import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LanguageToggle = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('language', langCode);
    // In a real app, this would trigger a language change throughout the app
  };

  const currentLang = languages?.find(lang => lang?.code === currentLanguage);

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-card border border-border hover:bg-muted transition-smooth">
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="text-sm font-body font-medium text-foreground">
          {currentLang?.name}
        </span>
        <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
      </button>
      <div className="absolute top-full right-0 mt-2 w-40 bg-popover border border-border rounded-lg shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {languages?.map((lang) => (
            <button
              key={lang?.code}
              onClick={() => handleLanguageChange(lang?.code)}
              className={`
                w-full flex items-center space-x-3 px-4 py-2 text-left font-body transition-smooth
                ${currentLanguage === lang?.code
                  ? 'bg-primary text-primary-foreground'
                  : 'text-popover-foreground hover:bg-muted'
                }
              `}
            >
              <span className="text-lg">{lang?.flag}</span>
              <span className="text-sm font-medium">{lang?.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageToggle;