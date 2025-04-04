import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import Udc from '../../assets/images/udc.png';
import Muvi from '@/assets/svgs/MUVI-logo.svg'; 
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
  
  const handleLogin = () => navigate('/auth');
  const [menuOpen, toggleMenu] = useToggle(false);
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      {/* Animación del AppBar */}
      <ZoomInOnScroll duration={2} initialScale={.95}>
        
        {/* Contenido */}
        <div className="container flex items-center justify-between h-20 p-4 mx-auto">
            
            {/* Logos */}
            <div className='h-full'>
              <a href="/" className="flex items-center h-full gap-4 transition-transform cursor-pointer hover:scale-105">
                <img className='object-contain h-full p-1' src={Muvi} alt="Logo Muvi" />
                <div className='h-12 w-[1px] bg-gray-200'></div>
                <img className='object-contain h-full' src={Udc} alt="Logo UDC" />
              </a>
            </div>

            {/* Acciones */}
            <div className="hidden space-x-5 lg:flex">
              
              {/* Menú */}
              <div className="flex items-center gap-10">
                <NavLink href="/">{t('Home')}</NavLink>
                <NavLink href="#">{t('About Muvi')}</NavLink>
                <NavLink href="/faqs">{t('FAQs')}</NavLink>
                <NavLink href="#">{t('Help')}</NavLink>
              </div>
              
              {/* Botones acciones */}
              <div className="flex gap-5">
                <CartButton />
                <LanguageSelector />
                {
                  isAuthenticated ? (<>
                    <div className='flex items-center justify-center gap-1'>
                      <FaUser className="text-xl" />
                      <h4>{user?.display_name}</h4>
                    </div>
                    <button title='sign out' onClick={handleLogout} className="px-4 py-1 font-normal text-white transition duration-200 bg-black bg-opacity-75 rounded-xl hover:bg-opacity-100">
                      <FaSignOutAlt className="mr-1" />
                    </button>
                  </>) : (<>
                    <button onClick={handleLogin} className="px-4 py-1 font-normal text-white transition duration-200 bg-opacity-75 bg-primary rounded-xl hover:bg-opacity-100">
                      {t('Login')}
                    </button>
                  </>)
                }
              </div>
            </div>
            <div className="flex items-center lg:hidden">
                <MenuButton isOpen={menuOpen} onClick={toggleMenu} />
            </div>
        </div>
        {/* Menú en vista mobile */}
        {menuOpen && (
          <div className="flex flex-col items-center mt-4 space-y-12 font-bold lg:hidden">
            <NavLink href="#">{t('Home')}</NavLink>
            <NavLink href="#">{t('About Muvi')}</NavLink>
            <NavLink href="/faqs">{t('FAQs')}</NavLink>
            <NavLink href="#">{t('Help')}</NavLink>
            <LanguageSelector />
            <div className='flex flex-col gap-1'>
              {
                isAuthenticated ? (<>
                  <div className='flex items-center justify-center gap-1'>
                    <FaUser className="text-xl" />
                    <h4>{user?.display_name}</h4>
                  </div>
                  <button onClick={handleLogout} className="px-4 py-1 font-normal text-white transition duration-200 bg-black bg-opacity-75 rounded-md hover:bg-opacity-100">
                    {t('Logout')}
                  </button>
                </>) : (<>
                  <button onClick={handleLogin} className="px-4 py-1 font-normal text-white transition duration-200 bg-black bg-opacity-75 rounded-md hover:bg-opacity-100">
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