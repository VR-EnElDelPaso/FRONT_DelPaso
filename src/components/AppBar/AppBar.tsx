import { useTranslation } from "react-i18next";
import Udc from "../../assets/images/udc.png";
import Muvi from "@/assets/svgs/MUVI-logo.svg";
import { useAuth } from "../../hooks/useAuth";
import { ZoomInOnScroll } from "../animations/ZoomInOnScroll";
import SocialMediaIcons from "../SocialMediaIcons/SocialMediaIcons";
import MenuButton from "./MenuButton";
import useToggle from "../../hooks/useToggle";
import LanguageSelector from "../../translate/i18n.changeLanguage";
import CartButton from "../../features/cart/components/CartButton";
import NavLink from "./NavLink";
import { LoginButton } from "../Auth/LoginButton";
import { UserAvatar } from "../Auth/UserAvatar";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function AppBar() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [menuOpen, toggleMenu] = useToggle(false);

  // Cerrar menú al cambiar de ruta o redimensionar ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && menuOpen) {
        toggleMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen, toggleMenu]);

  // Cerrar menú al hacer scroll solo si se scrollea hacia arriba significativamente
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Solo cerrar el menú si se scrollea hacia arriba más de 50px
      if (menuOpen && lastScrollY - currentScrollY > 50) {
        toggleMenu();
      }

      lastScrollY = currentScrollY;
    };

    if (menuOpen) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen, toggleMenu]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <ZoomInOnScroll duration={2} initialScale={0.95}>
        {/* Header principal */}
        <div className="container flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8 mx-auto gap-4 min-w-0">
          {/* Logo section */}
          <div className="flex-shrink-0 h-10 sm:h-12 lg:h-14 min-w-0">
            <Link
              to="/"
              className="flex items-center h-full gap-2 sm:gap-4 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg min-w-0"
              aria-label="Ir al inicio - MUVi"
            >
              <img
                className="object-contain h-full p-1 flex-shrink-0"
                src={Muvi}
                alt="Logo MUVi"
              />
              <div className="h-8 sm:h-10 lg:h-12 w-[1px] bg-gray-200 flex-shrink-0"></div>
              <img
                className="object-contain h-full flex-shrink-0"
                src={Udc}
                alt="Logo Universidad de Colima"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-end min-w-0">
            {/* Navigation Links */}
            <div className="flex items-center space-x-8 mr-8">
              <NavLink href="/about">{t("About Muvi")}</NavLink>
              <NavLink href="/faqs">{t("FAQs")}</NavLink>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <CartButton />
              <LanguageSelector />
              {isAuthenticated ? <UserAvatar /> : <LoginButton />}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden flex-shrink-0 ml-4">
            <CartButton />
            <MenuButton isOpen={menuOpen} onClick={toggleMenu} />
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="relative z-50 lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="container mx-auto px-4 py-6">
              {/* Navigation Links */}
              <div className="flex flex-col space-y-4 mb-6">
                <NavLink
                  href="/about"
                  className="text-gray-700 hover:text-primary transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  {t("About Muvi")}
                </NavLink>
                <NavLink
                  href="/faqs"
                  className="text-gray-700 hover:text-primary transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  {t("FAQs")}
                </NavLink>
              </div>

              {/* Actions Section */}
              <div className="flex flex-col space-y-4">
                {/* Language Selector */}
                <div className="flex justify-start">
                  <LanguageSelector />
                </div>

                {/* User Authentication */}
                <div className="flex justify-start">
                  {isAuthenticated ? (
                    <div className="w-full max-w-xs">
                      <UserAvatar />
                    </div>
                  ) : (
                    <LoginButton />
                  )}
                </div>

                {/* Social Media */}
                <div className="pt-4 border-t border-gray-100">
                  <SocialMediaIcons
                    containerClass="flex justify-center space-x-6"
                    iconClass="text-2xl text-gray-600 hover:text-primary transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </ZoomInOnScroll>
    </nav>
  );
}
