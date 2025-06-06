import { useAuth } from "@/hooks/useAuth";
import useAuthStore from "@/stores/AuthStore";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";

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

  // Renderizar iniciales si no hay imagen
  const renderAvatar = () => {
    if (user?.image) {
      return (
        <img
          src={user.image}
          alt={getFullName()}
          className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
        />
      );
    }

    const initials = getUserInitials();
    return (
      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium border-2 border-primary">
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
        {renderAvatar()}
        <div className="flex-1 text-left min-w-0">
          <h4 className="truncate font-medium text-gray-900">
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
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-0 max-w-full">
          {/* Usuario info con información completa */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              {renderAvatar()}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {getFullName()}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                {user?.account_number && (
                  <p className="text-xs text-gray-400 mt-1">
                    {t("Account")}: {user.account_number}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <button
              onClick={handleMyPurchases}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
            >
              <BsCart3 className="mr-3 text-lg text-gray-600 flex-shrink-0" />
              <span>{t("My Purchases")}</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 focus:outline-none focus:bg-red-50 focus:text-red-600"
            >
              <IoLogOutOutline className="mr-3 text-lg flex-shrink-0" />
              <span>{t("Logout")}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
