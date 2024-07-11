import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { IoLanguage } from 'react-icons/io5';
import NavLink from './NavLink';
import SocialMediaIcons from '../SocialMediaIcons/SocialMediaIcons';
import MenuButton from './MenuButton';
import useToggle from '../../hooks/useToggle';
import { ZoomInOnScroll } from '../animations/ZoomInOnScroll';
import useAuthStore from '../../stores/AuthStore';

export default function AppBar() {
    const {
        user,
        isAuthenticated,
    } = useAuthStore();

    const handleLogout = async () => {
        window.location.href = 'http://localhost:4006/api/auth/logout';
    }

    const handleLogin = () => {
        // posible manera de redirección, requiere configuración en el servidor
        // window.location.href = 'http://localhost:4006/api/auth/login?redirect_uri=http://localhost:3000/auth/callback';
        window.location.href = 'http://localhost:4006/api/auth/login';
    }

    const [menuOpen, toggleMenu] = useToggle(false);

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <ZoomInOnScroll duration={2} initialScale={.95}>
                <div className="h-20 p-4 container mx-auto flex justify-between items-center">
                    <div className='h-full'>
                        <a href="/" className="h-full flex cursor-pointer items-center">
                            <img className='h-full' src="/logo K.png" alt="Fernando del Paso" />
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
                        {
                            isAuthenticated ? (<>
                                <div className='flex justify-center items-center gap-1'>
                                    <FaUser className="text-xl" />
                                    <h4>{user?.displayName}</h4>
                                </div>
                                <button onClick={handleLogout} className="bg-black bg-opacity-75 text-white px-4 py-1 rounded-md transition duration-200 hover:bg-opacity-100 font-normal">
                                    <FaSignOutAlt className="mr-1" />
                                </button>
                            </>) : (<>
                                <button onClick={handleLogin} className="bg-black bg-opacity-75 text-white px-4 py-1 rounded-md transition duration-200 hover:bg-opacity-100 font-normal">
                                    Iniciar sesión
                                </button>
                            </>)
                        }
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
                        <div className='flex flex-col gap-1'>
                            {
                                isAuthenticated ? (<>
                                    <div className='flex justify-center items-center gap-1'>
                                        <FaUser className="text-xl" />
                                        <h4>{user?.displayName}</h4>
                                    </div>
                                    <button onClick={handleLogout} className="bg-black bg-opacity-75 text-white px-4 py-1 rounded-md transition duration-200 hover:bg-opacity-100 font-normal">
                                        Cerrar sesión
                                    </button>
                                </>) : (<>
                                    <button onClick={handleLogin} className="bg-black bg-opacity-75 text-white px-4 py-1 rounded-md transition duration-200 hover:bg-opacity-100 font-normal">
                                        Iniciar sesión
                                    </button>
                                </>)
                            }
                        </div>
                        <SocialMediaIcons containerClass="flex space-x-5 pb-4" iconClass="text-3xl" />
                    </div>
                )}
            </ZoomInOnScroll>
        </nav>
    );
}
