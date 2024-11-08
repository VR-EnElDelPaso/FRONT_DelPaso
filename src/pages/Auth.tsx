import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { SignInForm } from "@/components/Auth/SignInForm";
import SignUpForm from "@/components/Auth/SignUpForm/index";
import Udc from "@/assets/images/udc.png";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [resetRecovery, setResetRecovery] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleToggleForm = (showSignIn: boolean) => {
    setIsSignIn(showSignIn);
    if (showSignIn) {
      setResetRecovery(true);
      // Reset the flag after a brief delay to allow for the next toggle
      setTimeout(() => setResetRecovery(false), 100);
    }
  };

  const commonTransition = "transition-all duration-500 ease-in-out";

  return (
    <div className="font-inter text-dark min-h-screen bg-[url('/fernando-del-paso.jpg')] bg-cover bg-center flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-black opacity-40" />

      <div className="relative w-full max-w-[1035px] min-h-[612px] rounded-lg overflow-hidden backdrop-blur-md bg-white/10 flex sm:flex-row flex-col items-center justify-center">
        {/* Sign Up Container */}
        <div
          className={`absolute top-0 h-full ${commonTransition} sm:left-0 w-full sm:w-1/2
            ${
              !isSignIn
                ? "sm:translate-x-full sm:scale-100 opacity-100 z-20"
                : "sm:translate-x-0 sm:scale-95 sm:opacity-0 sm:-z-10 opacity-0 -z-10"
            }`}
        >
          <div className="h-full flex flex-col items-center justify-center">
            <div className="flex-1 w-full">
              <SignUpForm onToggleForm={() => handleToggleForm(true)} />
            </div>
            <div className="flex justify-center pb-8">
              <button
                onClick={() => handleToggleForm(true)}
                className="text-white text-sm tracking-wider transform transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span className="text-neutral-300">¿Tienes cuenta?</span> Inicia
                sesión
              </button>
            </div>
          </div>
        </div>

        {/* Sign In Container */}
        <div
          className={`absolute top-0 h-full ${commonTransition} sm:left-0 w-full sm:w-1/2
            ${
              !isSignIn
                ? "sm:translate-x-full sm:scale-95 opacity-0 -z-10"
                : "sm:translate-x-0 sm:scale-100 opacity-100 z-20"
            }`}
        >
          <div className="h-full flex flex-col items-center justify-center">
            <div className="flex-1 w-full">
              <SignInForm resetRecovery={resetRecovery} />
            </div>
            <div className="flex justify-center pb-8">
              <button
                onClick={() => handleToggleForm(false)}
                className="text-white text-sm tracking-wider transform transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span className="text-neutral-300">¿No tienes cuenta?</span>{" "}
                Registrate
              </button>
            </div>
          </div>
        </div>

        {/* Logo Container */}
        <div
          className={`p-4 absolute top-0 left-1/2 w-1/2 h-full overflow-hidden ${commonTransition}
            ${
              !isSignIn ? "-translate-x-full" : ""
            } hidden sm:flex items-center justify-center`}
        >
          <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col justify-between items-center h-full">
            <div className="flex-grow flex items-center justify-center">
              <img
                src="/muvi_logo.png"
                alt="Muvi Logo"
                className="object-contain max-w-[80%] max-h-[80%]"
              />
            </div>
            <img
              src={Udc}
              alt="UDC Logo"
              className="object-contain max-w-[40%] mb-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
