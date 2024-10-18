import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import Udc from '../../assets/images/udc.png';
import Muvi from '../../assets/images/muvi.jpg'; 
import { useAuth } from '../../hooks/useAuth';
import { ZoomInOnScroll } from '../animations/ZoomInOnScroll';
import SocialMediaIcons from '../SocialMediaIcons/SocialMediaIcons';
import MenuButton from './MenuButton';
import useToggle from '../../hooks/useToggle';
import LanguageSelector from '../../translate/i18n.changeLanguage';
import CartButton from "../../features/cart/components/CartButton"
import NavLink from './NavLink';

export default function AppBar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {logout, isAuthenticated, user} = useAuth();
  const handleLogout = () => logout();
  
  const handleLogin = () => navigate('/login');
  const [menuOpen, toggleMenu] = useToggle(false);
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      {/* Animación del AppBar */}
      <ZoomInOnScroll duration={2} initialScale={.95}>
        
        {/* Contenido */}
        <div className="h-20 p-4 container mx-auto flex justify-between items-center">
            
            {/* Logos */}
            <div className='h-full'>
              <a href="/" className="h-full flex cursor-pointer items-center gap-4 transition-transform hover:scale-105">
                <img className='h-full object-contain' src={Muvi} alt="Logo Muvi" />
                <div className='h-12 w-[1px] bg-gray-200'></div>
                <img className='h-full object-contain' src={Udc} alt="Logo UDC" />
              </a>
            </div>

            {/* Acciones */}
            <div className="hidden lg:flex space-x-5">
              
              {/* Menú */}
              <div className="flex gap-10 items-center">
                <NavLink href="#">{t('Home')}</NavLink>
                <NavLink href="#">{t('About Muvi')}</NavLink>
                <NavLink href="#">{t('Help')}</NavLink>
              </div>
              
              {/* Botones acciones */}
              <div className="flex gap-5">
                <CartButton />
                <LanguageSelector />
                {
                  isAuthenticated ? (<>
                    <div className='flex justify-center items-center gap-1'>
                      <FaUser className="text-xl" />
                      <h4>{user?.display_name}</h4>
                    </div>
                    <button title='sign out' onClick={handleLogout} className="bg-black bg-opacity-75 text-white px-4 py-1 rounded-xl transition duration-200 hover:bg-opacity-100 font-normal">
                      <FaSignOutAlt className="mr-1" />
                    </button>
                  </>) : (<>
                    <button onClick={handleLogin} className="bg-primary bg-opacity-75 text-white px-4 py-1 rounded-xl transition duration-200 hover:bg-opacity-100 font-normal">
                      {t('Login')}
                    </button>
                  </>)
                }
              </div>
            </div>
            <div className="lg:hidden flex items-center">
                <MenuButton isOpen={menuOpen} onClick={toggleMenu} />
            </div>
        </div>
        {/* Menú en vista mobile */}
        {menuOpen && (
          <div className=" font-bold lg:hidden mt-4 flex flex-col space-y-12 items-center">
            <NavLink href="#">{t('Home')}</NavLink>
            <NavLink href="#">{t('About Muvi')}</NavLink>
            <NavLink href="#">{t('Help')}</NavLink>
            <LanguageSelector />
            <div className='flex flex-col gap-1'>
              {
                isAuthenticated ? (<>
                  <div className='flex justify-center items-center gap-1'>
                    <FaUser className="text-xl" />
                    <h4>{user?.display_name}</h4>
                  </div>
                  <button onClick={handleLogout} className="bg-black bg-opacity-75 text-white px-4 py-1 rounded-md transition duration-200 hover:bg-opacity-100 font-normal">
                    {t('Logout')}
                  </button>
                </>) : (<>
                  <button onClick={handleLogin} className="bg-black bg-opacity-75 text-white px-4 py-1 rounded-md transition duration-200 hover:bg-opacity-100 font-normal">
                    {t('Login')}
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
