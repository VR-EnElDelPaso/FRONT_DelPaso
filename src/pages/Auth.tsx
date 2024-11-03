import { useState } from "react";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const commonTransition = "transition-all duration-500 ease-in-out";
  const bounceTransform = "motion-safe:animate-[smoothBounce_0.8s_ease-in-out]";
  return (
    <div className="font-inter text-dark min-h-screen bg-[url('/fernando-del-paso.jpg')] bg-cover bg-center flex items-center justify-center px-4 relative">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-40" />

      <div className="relative w-[1200px] min-h-[600px] rounded-lg overflow-hidden backdrop-blur-md bg-white/10">
        {/* Sign Up Container */}
        <div
          className={`absolute top-0 h-full ${commonTransition} left-0 w-1/2
            ${
              !isSignIn
                ? "translate-x-full opacity-100 z-20"
                : "opacity-0 -z-10"
            }`}
        >
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <form
                className={`h-full flex flex-col items-start justify-center px-12 text-left bg-transparent w-full
              ${!isSignIn ? bounceTransform : ""}`}
              >
                <h1 className="text-2xl font-bold mb-4 text-white">Registro</h1>

                <p className="text-white">¿Tienes cuenta Ucol?</p>
                <div className="w-full space-y-4 mt-6">
                  <button className="bg-primary text-white w-full h-10 rounded-md font-normal text-sm tracking-wider hover:bg-primary/90 transform transition-all duration-300 hover:scale-105 active:scale-95">
                    Sí
                  </button>
                  <button className="bg-primary text-white w-full h-10 rounded-md font-normal text-sm tracking-wider hover:bg-primary/90 transform transition-all duration-300 hover:scale-105 active:scale-95">
                    No
                  </button>
                </div>
              </form>
            </div>
            <div className="flex justify-center pb-8">
              <button
                onClick={() => setIsSignIn(true)}
                className="text-white text-sm tracking-wider hover:text-red-500 transform transition-all duration-300 hover:scale-105 active:scale-95"
              >
                ¿Tienes cuenta? Inicia sesión
              </button>
            </div>
          </div>
        </div>
        {/* Sign In Container */}
        <div
          className={`absolute top-0 h-full ${commonTransition} left-0 w-1/2
            ${!isSignIn ? "translate-x-full opacity-0" : "opacity-100 z-20"}`}
        >
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <form
                className={`h-full flex flex-col items-start justify-center px-12 text-left bg-transparent w-full
                ${isSignIn ? bounceTransform : ""}`}
              >
                <h1 className="text-2xl font-bold mb-4 text-white">
                  Iniciar sesión
                </h1>
                <div className="space-y-4 w-full">
                  <div className="space-y-2 w-full">
                    <label className="text-white">Correo</label>
                    <input
                      type="email"
                      placeholder="Correo"
                      className="w-full bg-gray-300/20 border border-gray-400/20 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow text-white placeholder-white/70"
                    />
                  </div>

                  <div className="space-y-2 w-full">
                    <label className="text-white">Contraseña</label>
                    <input
                      type="password"
                      placeholder="Contraseña"
                      className="w-full bg-gray-300/20 border border-gray-400/20 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow text-white placeholder-white/70"
                    />
                  </div>
                </div>

                <a
                  href="#"
                  className="text-sm text-white/70 my-4 hover:text-white transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
                <button className="bg-primary text-white w-full h-10 rounded-md font-normal text-sm tracking-wider hover:bg-primary/90 transform transition-all duration-300 hover:scale-105 active:scale-95">
                  Iniciar sesión
                </button>
              </form>
            </div>
            <div className="flex justify-center pb-8">
              <button
                onClick={() => setIsSignIn(false)}
                className="text-white text-sm tracking-wider hover:text-white/90 transform transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span className="text-neutral-300">¿No tienes cuenta?</span>{" "}
                Registrate
              </button>
            </div>
          </div>
        </div>
        {/* Logo Container with Animation */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden ${commonTransition}
            ${!isSignIn ? "-translate-x-full" : ""}`}
        >
          {/* Single Logo Container */}
          <div className="relative h-full w-full flex items-center justify-center px-10">
            <img
              src="/public/muvi.png"
              alt="Logo"
              className={`p-4 px-8 w-full h-full min-w-[500px] ${commonTransition} transform ${
                !isSignIn ? "-translate-x-0" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
