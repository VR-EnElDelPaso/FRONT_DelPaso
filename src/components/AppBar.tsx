import { useState } from 'react';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { IoLanguage } from 'react-icons/io5';

export default function AppBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="p-4 bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className='flex-shrink-0 lg:ml-36'>
                    <a href="/" className="flex cursor-pointer items-center">
                        <img className='w-48' src="/logo K.png" alt="Fernando del Paso"/>
                    </a>
                </div>
                <div className="hidden lg:flex space-x-20">
                    <a className="text-base border-b-2 border-transparent hover:border-black transition duration-300 uppercase" href="#">Inicio</a>
                    <a className="text-base border-b-2 border-transparent hover:border-black transition duration-300 uppercase" href="#">Ayuda</a>
                    <a className="text-base border-b-2 border-transparent hover:border-black transition duration-300 uppercase" href="#">Conocenos</a>
                </div>
                <div className="hidden lg:flex space-x-5">
                    <button aria-label="Cambiar idioma" className="cursor-pointer hover:text-gray-600">
                        <IoLanguage className="text-3xl" />
                    </button>
                    <button aria-label="Iniciar sesión" className="cursor-pointer hover:text-gray-600">
                        <FaUser className="text-3xl" />
                    </button>
                </div>
                <div className="lg:hidden flex items-center">
                    <button onClick={toggleMenu} aria-label="Toggle menu">
                        {menuOpen ? <FaTimes className="text-3xl" /> : <FaBars className="text-3xl" />}
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className="lg:hidden mt-4 flex flex-col space-y-12 items-center">
                    <a className="text-base border-b-2 border-transparent hover:border-black transition duration-300 uppercase" href="#">Inicio</a>
                    <a className="text-base border-b-2 border-transparent hover:border-black transition duration-300 uppercase" href="#">Acerca del Museo</a>
                    <a className="text-base border-b-2 border-transparent hover:border-black transition duration-300 uppercase" href="#">Ayuda</a>
                    <a className="text-base border-b-2 border-transparent hover:border-black transition duration-300 uppercase">Idioma</a>
                </div>
            )}
        </nav>
    );
}
