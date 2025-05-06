import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { IoLogOutOutline } from "react-icons/io5";

export const LogoutButton = () => {
  // ---- Hooks ----
  const { logout } = useAuth();
  const { t } = useTranslation();

  // ---- Handlers ----
  const handleLogout = () => logout();

  return (
    <button
      onClick={handleLogout}
      className="flex gap-1 bg-white border border-gray-300 hover:border-transparent hover:bg-primary text-gray-700 hover:text-white py-2 px-3 rounded-lg text-sm transition-all duration-300 shadow-sm hover:transform hover:scale-105"
    >
      <p>{t("Logout")}</p>
      <div>
        <IoLogOutOutline className="text-xl" />
      </div>
    </button>
  );
};
