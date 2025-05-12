import { useAuth } from "@/hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";

export const UserAvatar = () => {
  const { user, logout } = useAuth();
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
    navigate("/my-purchases"); // Ajusta la ruta según corresponda
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-center align-middle space-x-2 bg-white border border-gray-300 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm transition duration-300 shadow-sm"
      >
        <RxAvatar className="text-xl text-primary" />
        <h4 className="max-w-32 truncate">{user?.display_name}</h4>
        {/* Icono de flecha */}
        <svg
          className={`w-4 h-4 transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Usuario info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {user?.display_name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <button
              onClick={handleMyPurchases}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <BsCart3 className="mr-3 text-lg text-gray-600" />
              <span>{t("My Purchases")}</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
            >
              <IoLogOutOutline className="mr-3 text-lg" />
              <span>{t("Logout")}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
