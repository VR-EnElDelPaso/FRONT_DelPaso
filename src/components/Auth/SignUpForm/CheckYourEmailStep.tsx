import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { sendVerificationEmail } from "@/services/auth.services";
import { useRegisterStore } from "@/stores/RegisterStore";
import { useState, useEffect } from "react";
import { Mail, ArrowLeft, Clock } from "lucide-react";

export interface SignUpFormStepProps {
  onBack?: () => void;
  onNext?: () => void;
}

export const CheckYourEmailStep = ({ onBack }: SignUpFormStepProps) => {
  // ---- States ----
  const [resendVerificationLoading, setResendVerificationLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const cooldownTime = 60; // Tiempo de espera en segundos

  // ---- Hooks ----
  const { formInputs } = useRegisterStore();

  // Timer para el cooldown de reenvío
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // ---- Handlers ----
  const handleResendVerificationEmail = async () => {
    if (resendVerificationLoading || countdown > 0) return;
    
    setResendVerificationLoading(true);
    try {
      await sendVerificationEmail(formInputs.email);
      toast({
        title: "Correo enviado",
        description: "Hemos reenviado el correo de verificación. Revisa tu bandeja de entrada.",
        variant: "default",
      });
      // Iniciar el countdown después de enviar el correo
      setCountdown(cooldownTime);
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast({
        title: "Error",
        description: "No se pudo enviar el correo de verificación. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setResendVerificationLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto p-6  rounded-lg ">
      <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mb-6">
        <Mail className="h-8 w-8 text-white" />
      </div>
      
      <h2 className="text-2xl font-bold mb-4 text-white text-center">
        ¡Verifica tu correo!
      </h2>
      
      <p className="text-center text-gray-300 mb-4">
        Hemos enviado un enlace de verificación a <span className="font-medium text-gray-100">{formInputs.email}</span>. Por
        favor, revisa tu bandeja de entrada y haz clic en el enlace para activar
        tu cuenta.
      </p>
      
      <div className="w-full h-px bg-gray-800 my-6"></div>
      
      <p className="text-center text-gray-300 mb-6 text-sm">
        Si no recibiste el correo, verifica tu carpeta de spam o solicita un nuevo correo.
      </p>
      
      <div className="w-full space-y-4">
        <Button
          variant="default"
          className="w-full"
          disabled={resendVerificationLoading || countdown > 0}
          onClick={handleResendVerificationEmail}
        >
          {countdown > 0 ? (
            <>
              <Clock className="h-4 w-4" />
              Reenviar en {countdown}s
            </>
          ) : (
            "Reenviar correo de verificación"
          )}
        </Button>
        
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            if (onBack) onBack();
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Regresar
        </Button>
      </div>
    </div>
  );
};