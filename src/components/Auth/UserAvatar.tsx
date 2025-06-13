// src/components/Auth/UserAvatar.tsx - Versión actualizada
import { useAuth } from "@/hooks/useAuth";
import useAuthStore from "@/stores/AuthStore";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

export const UserAvatar = () => {
  const { user, logout } = useAuth();
  const { getFullName, getUserInitials } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  const handleMyPurchases = () => {
    setIsDropdownOpen(false);
    navigate("/my-purchases");
  };

  const handleProfile = () => {
    setIsDropdownOpen(false);
    navigate("/profile");
  };

  // Renderizar avatar usando iniciales si no hay imagen
  const renderAvatar = () => {
    if (user?.image) {
      return (
        <img
          src={user.image}
          alt={getFullName()}
          className="object-cover w-8 h-8 transition-transform duration-200 border-2 border-gray-200 rounded-full cursor-pointer hover:scale-110"
          onClick={handleProfile}
        />
      );
    }

    const initials = getUserInitials();
    return (
      <div
        className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white transition-transform duration-200 border-2 rounded-full cursor-pointer bg-primary border-primary hover:scale-110"
        onClick={handleProfile}
      >
        {initials || <RxAvatar className="text-lg" />}
      </div>
    );
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-start w-full space-x-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2.5 px-3 rounded-lg text-sm transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <div
          className="transition-transform duration-200 cursor-pointer hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            handleProfile();
          }}
        >
          {renderAvatar()}
        </div>
        <div className="flex-1 min-w-0 text-left">
          <h4 className="font-medium text-gray-900 truncate">
            {user?.display_name}
          </h4>
          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
        </div>
        {/* Icono de flecha */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute left-0 right-0 z-50 max-w-full min-w-0 mt-2 border border-red-700 rounded-lg shadow-lg bg-destructive">
          {/* Usuario info con información completa */}
          <div className="px-4 py-3 border-b border-red-600">
            <div className="flex items-center space-x-3">
              <div
                className="transition-transform duration-200 cursor-pointer hover:scale-110"
                onClick={handleProfile}
              >
                {renderAvatar()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {getFullName()}
                </p>
                <p className="text-xs text-red-100 truncate">{user?.email}</p>
                {user?.account_number && (
                  <p className="mt-1 text-xs text-red-200">
                    {t("Account")}: {user.account_number}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1">
            {/* Profile */}
            <button
              onClick={handleProfile}
              className="flex items-center w-full px-4 py-3 text-sm text-white transition-colors duration-200 hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              <FaUser className="flex-shrink-0 mr-3 text-lg text-red-100" />
              <span>{t("My Profile")}</span>
            </button>

            <button
              onClick={handleMyPurchases}
              className="flex items-center w-full px-4 py-3 text-sm text-white transition-colors duration-200 hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              <BsCart3 className="flex-shrink-0 mr-3 text-lg text-red-100" />
              <span>{t("My Purchases")}</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm text-white transition-colors duration-200 hover:bg-red-800 hover:text-red-100 focus:outline-none focus:bg-red-800 focus:text-red-100"
            >
              <IoLogOutOutline className="flex-shrink-0 mr-3 text-lg" />
              <span>{t("Logout")}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
