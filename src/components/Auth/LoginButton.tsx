import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

interface LoginButtonProps {
  onLogin?: () => void;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export const LoginButton = ({
  onLogin,
  variant = "default",
  size = "default",
  className = "",
}: LoginButtonProps) => {
  // ----[ Hooks ]----
  const navigate = useNavigate();
  const { t } = useTranslation();

  // ----[ Handlers ]----
  const handleLogin = () => {
    onLogin && onLogin();
    navigate("/auth");
  };

  return (
    <Button
      onClick={handleLogin}
      variant={variant}
      size={size}
      className={`
        group
        bg-primary 
        hover:bg-primary/90 
        text-white 
        font-medium
        transition-all 
        duration-200 
        shadow-sm 
        hover:shadow-md
        focus:ring-2 
        focus:ring-primary 
        focus:ring-offset-2
        ${className}
      `}
    >
      <LogIn className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
      {t("Login")}
    </Button>
  );
};
