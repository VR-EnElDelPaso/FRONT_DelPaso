import { FaUser } from 'react-icons/fa';
import { IoLanguage } from 'react-icons/io5';
import NavLink from './NavLink';
import SocialMediaIcons from '../SocialMediaIcons/SocialMediaIcons';
import MenuButton from './MenuButton';
import useToggle from '../../hooks/useToggle';

export default function AppBar() {
    const [menuOpen, toggleMenu] = useToggle(false);

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="h-20 p-4 container mx-auto flex justify-between items-center">
                <div className='h-full'>
                    <a href="/" className="h-full flex cursor-pointer items-center">
                        <img className='h-full' src="/logo K.png" alt="Fernando del Paso"/>
                    </a>
                </div>
                <div className="font-bold hidden lg:flex space-x-20">
                    <NavLink href="#">Inicio</NavLink>
                    <NavLink href="#">Acerca del Museo</NavLink>
                    <NavLink href="#">Ayuda</NavLink>
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
                    <MenuButton isOpen={menuOpen} onClick={toggleMenu} />    
                </div>
            </div>
            {menuOpen && (
                <div className=" font-bold lg:hidden mt-4 flex flex-col space-y-12 items-center">
                    <NavLink href="#">Inicio</NavLink>
                    <NavLink href="#">Acerca del Museo</NavLink>
                    <NavLink href="#">Ayuda</NavLink>
                    <NavLink href="#">Idioma</NavLink>
                    <SocialMediaIcons containerClass="flex space-x-5 pb-4" iconClass="text-3xl" />
                </div>
            )}
        </nav>
    );
}
