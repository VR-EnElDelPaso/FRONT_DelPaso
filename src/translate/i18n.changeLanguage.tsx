import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoLanguage } from 'react-icons/io5';
import { CircleFlag } from 'react-circle-flags';

interface FlagProps {
    code: string;
}

const Flag = ({ code }: FlagProps) => <CircleFlag countryCode={code} style={{ height: 20, width: 20 }} />;

function LanguageSelector() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setIsOpen(false);
    };

    const languages = [
        { lang: 'es', code: 'mx', label: 'Español' },
        { lang: 'en', code: 'us', label: 'English' }
    ];

    const currentLanguage = languages.find(lang => lang.lang === i18n.language) || languages[0];

    return (
        <div className="relative">
            <button 
                aria-label="Cambiar idioma" 
                className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm transition duration-300 shadow-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Flag code={currentLanguage.code} />
                <span className="font-medium">{currentLanguage.label}</span>
                <IoLanguage className="text-lg text-gray-500" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 overflow-hidden border border-gray-200">
                    {languages.map(({ lang, code, label }) => (
                        <button 
                            key={lang}
                            className={`flex items-center w-full px-4 py-3 text-sm text-left hover:bg-gray-200 transition duration-150 ${i18n.language === lang ? 'bg-gray-100' : ''}`}
                            onClick={() => changeLanguage(lang)}
                        >
                            <Flag code={code} />
                            <span className="ml-3 font-medium">{label}</span>
                            {i18n.language === lang && (
                                <span className="ml-auto text-green-500">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LanguageSelector;