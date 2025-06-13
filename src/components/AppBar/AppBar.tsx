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
import { Dispatch, useEffect } from "react";

interface AppBarProps {
  setIsMenuOpen: Dispatch<React.SetStateAction<boolean>>;
}

export default function AppBar({ setIsMenuOpen: setIsMenuOpen }: AppBarProps) {
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
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-md">
      <ZoomInOnScroll duration={2} initialScale={0.95}>
        {/* Header principal */}
        <div className="container flex items-center justify-between h-16 min-w-0 gap-4 px-4 mx-auto sm:h-20 sm:px-6 lg:px-8">
          {/* Logo section */}
          <div className="flex-shrink-0 h-10 min-w-0 sm:h-12 lg:h-14">
            <Link
              to="/"
              className="flex items-center h-full min-w-0 gap-2 transition-transform duration-300 rounded-lg sm:gap-4 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Ir al inicio - MUVi"
            >
              <img
                className="flex-shrink-0 object-contain h-full p-1"
                src={Muvi}
                alt="Logo MUVi"
              />
              <div className="h-8 sm:h-10 lg:h-12 w-[1px] bg-gray-200 flex-shrink-0"></div>
              <img
                className="flex-shrink-0 object-contain h-full"
                src={Udc}
                alt="Logo Universidad de Colima"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center justify-end flex-1 hidden min-w-0 space-x-8 lg:flex">
            {/* Navigation Links */}
            <div className="flex items-center mr-8 space-x-8">
              <NavLink href="/about">{t("About Muvi")}</NavLink>
              <NavLink href="/tours">{t("Tours")}</NavLink>
              <NavLink
                href="#"
                onClick={() => {
                  setIsMenuOpen((prev) => !prev);
                }}
              >
                {t("Museums")}
              </NavLink>
              <NavLink href="/faqs">{t("FAQs")}</NavLink>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center flex-shrink-0 space-x-3">
              <CartButton />
              <LanguageSelector />
              {isAuthenticated ? <UserAvatar /> : <LoginButton />}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center flex-shrink-0 ml-4 space-x-3 lg:hidden">
            <CartButton />
            <MenuButton isOpen={menuOpen} onClick={toggleMenu} />
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="relative z-50 bg-white border-t border-gray-100 shadow-lg lg:hidden">
            <div className="container px-4 py-6 mx-auto">
              {/* Navigation Links */}
              <div className="flex flex-col mb-6 space-y-4">
                <NavLink
                  href="/about"
                  className="px-3 py-2 text-gray-700 transition-colors duration-200 rounded-lg hover:text-primary hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  {t("About Muvi")}
                </NavLink>
                <NavLink
                  href="/faqs"
                  className="px-3 py-2 text-gray-700 transition-colors duration-200 rounded-lg hover:text-primary hover:bg-gray-50"
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
