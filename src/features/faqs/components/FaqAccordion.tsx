import { useState, useEffect } from "react";
import { Faq } from "@/types/Faq";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqAccordionProps {
  faqs: Faq[];
  selectedFaqId: string | null;
}

const FaqAccordion = ({ faqs, selectedFaqId }: FaqAccordionProps) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  // Open the selected FAQ when it changes
  useEffect(() => {
    if (selectedFaqId) {
      setOpenFaqId(selectedFaqId);
    }
  }, [selectedFaqId]);

  const toggleFaq = (faqId: string) => {
    setOpenFaqId((prevId) => (prevId === faqId ? null : faqId));
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          id={`faq-${faq.id}`}
          className={`overflow-hidden border border-gray-200 rounded-lg transition-shadow duration-300 ${
            openFaqId === faq.id ? "shadow-md" : ""
          }`}
        >
          <button
            className={`flex items-center justify-between w-full px-6 py-4 text-left transition-colors duration-300 ${
              openFaqId === faq.id
                ? "bg-primary text-white"
                : "bg-white text-gray-900 hover:bg-gray-50"
            }`}
            onClick={() => toggleFaq(faq.id)}
          >
            <h3
              className={`text-lg font-medium transition-colors duration-300 ${
                openFaqId === faq.id ? "text-white" : "text-gray-900"
              }`}
            >
              {faq.title}
            </h3>
            <div
              className={`flex items-center justify-center w-8 h-8 transition-colors duration-300 ${
                openFaqId === faq.id ? "text-white" : "text-gray-500"
              }`}
            >
              {openFaqId === faq.id ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          </button>

          {openFaqId === faq.id && (
            <div className="px-6 py-4 bg-gray-50 animate-fadeIn">
              <p className="text-gray-700 whitespace-pre-line">
                {faq.description}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
