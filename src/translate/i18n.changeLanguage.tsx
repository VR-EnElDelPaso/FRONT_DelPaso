import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoLanguage } from 'react-icons/io5';

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
                className="cursor-pointer hover:text-gray-600"
                onClick={() => setIsOpen(!isOpen)}
            >
                <IoLanguage className="text-3xl" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                    <button 
                        className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => changeLanguage('es')}
                    >
                        Español
                    </button>
                    <button 
                        className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => changeLanguage('en')}
                    >
                        English
                    </button>
                </div>
            )}
        </div>
    );
}

export default LanguageSelector;