import { IoCall, IoMail, IoTime, IoLocationSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { FadeInOnScroll } from "../animations/FadeInOnScroll";
import Muvi from "@/assets/svgs/MUVI-logo.svg";

export default function Footer() {
  return (
    <div className="bg-[url('/assets/auth/images/auth-bg.png')] bg-secondary overflow-hidden font-inter text-white relative bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/65"></div>

      <div className="relative z-10">
        <FadeInOnScroll from="bottom" distance={20} duration={2}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            {/* Sección principal con logo a la izquierda y contacto a la derecha */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
              {/* Logo, descripción e iconos sociales - Lado izquierdo */}
              <div className="max-w-md">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={Muvi}
                    alt="MUVI Logo"
                    className="w-10 h-10 filter brightness-0 invert"
                  />
                  <div className="text-3xl lg:text-4xl font-bold text-white">
                    MUVI
                  </div>
                </div>
                <h3 className="text-base lg:text-lg font-semibold mb-2">
                  Museo Universitario Virtual Interactivo
                </h3>
                <div className="w-full h-px bg-white/30 mb-4"></div>
                <p className="text-sm lg:text-base text-white/90 mb-6">
                  "MUVI, una experiencia que lleva el arte y la cultura de
                  nuestros museos hasta la comodidad de tu hogar."
                </p>

                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 p-2"
                    asChild
                  >
                    <a
                      href="https://www.facebook.com/museosudec"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookF className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 p-2"
                    asChild
                  >
                    <a
                      href="https://www.instagram.com/museos_udec/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 p-2"
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <FaLinkedinIn className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 p-2"
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Enlaces de navegación y contacto - Lado derecho */}
              <div className="flex flex-col justify-between gap-6 flex-1 max-w-4xl h-full min-h-[200px]">
                {/* Enlaces de navegación - arriba en desktop, abajo en mobile */}
                <div className="flex flex-wrap justify-between items-center text-sm sm:text-base lg:text-lg w-full order-2 lg:order-1 gap-2 sm:gap-4">
                  <a
                    href="/about"
                    className="hover:text-white/80 transition-colors border-b-2 border-white/30 pb-1 whitespace-nowrap"
                  >
                    Sobre MUVI
                  </a>
                  <a
                    href="/tours"
                    className="hover:text-white/80 transition-colors border-b-2 border-white/30 pb-1 whitespace-nowrap"
                  >
                    Recorridos
                  </a>
                  <a
                    href="/#"
                    className="hover:text-white/80 transition-colors border-b-2 border-white/30 pb-1 whitespace-nowrap"
                  >
                    Museos
                  </a>
                  <a
                    href="/faqs"
                    className="hover:text-white/80 transition-colors border-b-2 border-white/30 pb-1 whitespace-nowrap"
                  >
                    FAQ
                  </a>
                  <a
                    href="/cart"
                    className="hover:text-white/80 transition-colors border-b-2 border-white/30 pb-1 whitespace-nowrap"
                  >
                    Carrito
                  </a>
                </div>

                {/* Información de contacto - siempre en la parte inferior del contenedor */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 text-sm lg:text-base w-full order-1 lg:order-2">
                  {/* Teléfono */}
                  <div className="flex items-start gap-2">
                    <IoCall className="text-lg text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Teléfono</span>
                      <span className="text-white/90">+52 312 312 8008</span>
                    </div>
                  </div>

                  {/* Correo */}
                  <div className="flex items-start gap-2">
                    <IoMail className="text-lg text-primary flex-shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <span className="font-semibold block">Correo</span>
                      <a
                        href="mailto:museos@ucol.mx"
                        className="text-white/90 hover:text-white underline break-words"
                      >
                        museos@ucol.mx
                      </a>
                    </div>
                  </div>

                  {/* Horarios */}
                  <div className="flex items-start gap-2">
                    <IoTime className="text-lg text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Horarios</span>
                      <span className="text-white/90">
                        L - V: 7:30 AM - 8:30 PM
                      </span>
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div className="flex items-start gap-2">
                    <IoLocationSharp className="text-lg text-primary flex-shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <span className="font-semibold block">Ubicación</span>
                      <span className="text-white/90 break-words">
                        Vicente Guerrero 35, Centro, 28000 Colima, Colima.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer inferior */}
            <div className="border-t border-white/20 pt-6">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                {/* Enlaces legales */}
                <div className="flex flex-wrap gap-3 lg:gap-6 text-xs lg:text-sm text-white/80 justify-center lg:justify-start">
                  <a href="/#" className="hover:text-white transition-colors">
                    Términos y condiciones
                  </a>
                  <span className="hidden sm:inline">|</span>
                  <a href="/#" className="hover:text-white transition-colors">
                    Aviso de privacidad
                  </a>
                  <span className="hidden sm:inline">|</span>
                  <a href="/#" className="hover:text-white transition-colors">
                    Políticas de garantías
                  </a>
                </div>

                {/* Copyright */}
                <div className="text-xs lg:text-sm text-white/80">
                  <p>© 2024, MUVI. Todos los derechos reservados</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </div>
  );
}
