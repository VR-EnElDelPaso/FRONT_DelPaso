import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Faq } from "@/types/Faq";

interface FaqSuggestionsProps {
  faqs: Faq[];
  onSelect: (faqId: string) => void;
  maxSuggestions: number;
}

const FaqSuggestions = ({
  faqs,
  onSelect,
  maxSuggestions,
}: FaqSuggestionsProps) => {
  const { t } = useTranslation();
  const [suggestions, setSuggestions] = useState<Faq[]>([]);

  // Select random FAQs on initial render
  useEffect(() => {
    if (faqs.length === 0) return;

    // If we have fewer FAQs than maxSuggestions, use all of them
    if (faqs.length <= maxSuggestions) {
      setSuggestions(faqs);
      return;
    }

    // Otherwise, select random FAQs
    const randomFaqs: Faq[] = [];
    const faqsCopy = [...faqs];

    for (let i = 0; i < maxSuggestions; i++) {
      const randomIndex = Math.floor(Math.random() * faqsCopy.length);
      randomFaqs.push(faqsCopy[randomIndex]);
      faqsCopy.splice(randomIndex, 1);
    }

    setSuggestions(randomFaqs);
  }, [faqs, maxSuggestions]);

  if (suggestions.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold font-kaiseiDecol text-gray-900">
        {t("help.suggestedQuestions")}
      </h2>

      <div className="space-y-2">
        {suggestions.map((faq) => (
          <button
            key={faq.id}
            onClick={() => onSelect(faq.id)}
            className="w-full p-3 text-left transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <p className="font-medium text-gray-800">{faq.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FaqSuggestions;
