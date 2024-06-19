import { FaUser, FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';
import { IoLanguage } from 'react-icons/io5';
import NavLink from './NavLink';
import SocialMediaIcon from './SocialMediaIcon';
import MenuButton from './MenuButton';
import useToggle from '../../hooks/useToggle';

export default function AppBar() {
    const [menuOpen, toggleMenu] = useToggle(false);

    return (
        <nav className="p-4 bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className='flex-shrink-0 lg:ml-36'>
                    <a href="/" className="flex cursor-pointer items-center">
                        <img className='w-48' src="/logo K.png" alt="Fernando del Paso"/>
                    </a>
                </div>
                <div className="hidden lg:flex space-x-20">
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
                <div className="lg:hidden mt-4 flex flex-col space-y-12 items-center">
                    <NavLink href="#">Inicio</NavLink>
                    <NavLink href="#">Acerca del Museo</NavLink>
                    <NavLink href="#">Ayuda</NavLink>
                    <NavLink href="#">Idioma</NavLink>
                    <div className="flex space-x-6">
                        <SocialMediaIcon href="https://www.facebook.com/" ariaLabel="Facebook">
                            <FaFacebook className="text-3xl" />
                        </SocialMediaIcon>
                        <SocialMediaIcon href="https://www.instagram.com/" ariaLabel="Instagram">
                            <FaInstagram className="text-3xl" />
                        </SocialMediaIcon>
                        <SocialMediaIcon href="https://www.whatsapp.com/" ariaLabel="Whatsapp">
                            <FaWhatsapp className="text-3xl" />
                        </SocialMediaIcon>
                    </div>
                </div>
            )}
        </nav>
    );
}
