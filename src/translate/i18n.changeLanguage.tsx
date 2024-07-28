import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoLanguage } from 'react-icons/io5';
import { CircleFlag } from 'react-circle-flags';

interface FlagProps {
    code: string;
}

const Flag = ({ code }: FlagProps) => <CircleFlag countryCode={code} style={{ height: 32 }} />; // Reducido de 16 a 12

function LanguageSelector() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button 
                aria-label="Cambiar idioma" 
                className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded-md text-sm transition duration-300"
                onClick={() => setIsOpen(!isOpen)}
            >
                <IoLanguage className="text-lg" />
                <span>{i18n.language.toUpperCase()}</span>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-20 overflow-hidden">
                    {[
                        { lang: 'es', code: 'mx', label: 'Español' },
                        { lang: 'en', code: 'us', label: 'English' }
                    ].map(({ lang, code, label }) => (
                        <button 
                            key={lang}
                            className="flex items-center justify-between w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                            onClick={() => changeLanguage(lang)}
                        >
                            <div className="flex items-center">
                                <Flag code={code} />
                                <span className="ml-2">{label}</span>
                            </div>
                            {i18n.language === lang && (
                                <span className="text-green-500">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LanguageSelector;