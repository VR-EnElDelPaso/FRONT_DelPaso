import { useState, useEffect } from "react";
import { InitialStep } from "./InitialStep";
import { UcolStep1 } from "./UcolStep1";
import { UcolStep2 } from "./UcolStep2";
import { NonUcolForm } from "./NonUcolForm";

type SignUpFormProps = {
  onToggleForm: () => void;
};

const SignUpForm = ({ onToggleForm }: SignUpFormProps) => {
  const [step, setStep] = useState("initial");
  const [isAnimating, setIsAnimating] = useState(false);

  // Resetear el formulario cuando se vuelve a mostrar
  useEffect(() => {
    setStep("initial");
  }, [onToggleForm]);

  const handleStepChange = (nextStep: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsAnimating(false);
    }, 500); // Coincidir con la duración de la animación
  };

  const renderStep = () => {
    const commonClasses = `
      ${isAnimating ? "animate-slideOut" : "animate-slideIn"}
      w-full transform transition-all duration-500 ease-in-out
    `;

    switch (step) {
      case "initial":
        return (
          <div className={commonClasses}>
            <InitialStep
              onUcolYes={() => handleStepChange("ucolForm1")}
              onUcolNo={() => handleStepChange("nonUcolForm")}
            />
          </div>
        );
      case "ucolForm1":
        return (
          <div className={commonClasses}>
            <UcolStep1
              onNext={() => handleStepChange("ucolForm2")}
              onBack={() => handleStepChange("initial")}
            />
          </div>
        );
      case "ucolForm2":
        return (
          <div className={commonClasses}>
            <UcolStep2
              onBack={() => handleStepChange("ucolForm1")}
              onComplete={() => console.log("Registro completado")}
            />
          </div>
        );
      case "nonUcolForm":
        return (
          <div className={commonClasses}>
            <NonUcolForm
              onBack={() => handleStepChange("initial")}
              onComplete={() => console.log("Registro completado")}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col items-start justify-center px-12 text-left bg-transparent w-full relative overflow-hidden">
      {renderStep()}
    </div>
  );
};

export default SignUpForm;
