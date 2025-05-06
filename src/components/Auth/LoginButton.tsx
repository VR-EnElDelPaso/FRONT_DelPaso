import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface LoginButtonProps {
  onLogin?: () => void;
}

export const LoginButton = ({ onLogin }: LoginButtonProps) => {
  // ----[ Hooks ]----
  const navigate = useNavigate();
  const { t } = useTranslation();

  // ----[ Handlers ]----
  const handleLogin = () => {
    onLogin && onLogin();
    navigate("/auth");
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-1 font-normal text-white transition duration-200 bg-opacity-75 bg-primary rounded-xl hover:bg-opacity-100"
    >
      {t("Login")}
    </button>
  );
};
