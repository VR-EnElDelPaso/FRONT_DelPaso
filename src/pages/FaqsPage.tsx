import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAllFaqs } from "@/services/Faqs";
import { Faq } from "@/types/Faq";
import FaqAccordion from "@/features/faqs/components/FaqAccordion";
import FaqSuggestions from "@/features/faqs/components/FaqSuggestions";
import Loader from "@/shared/components/Loader";

const FaqsPage = () => {
  const { t } = useTranslation();
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null);

  // Fetch all FAQs
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setIsLoading(true);
        const response = await getAllFaqs();
        if (response.ok && response.data) {
          setFaqs(response.data);
          setFilteredFaqs(response.data);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  // Filter FAQs based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredFaqs(faqs);
      return;
    }

    const filtered = faqs.filter((faq) =>
      faq.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFaqs(filtered);
  }, [searchQuery, faqs]);

  // Handle FAQ selection from suggestions
  const handleFaqSelect = (faqId: string) => {
    setSelectedFaqId(faqId);
    // Scroll to the FAQ in the accordion
    setTimeout(() => {
      const element = document.getElementById(`faq-${faqId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container px-6 py-12 mx-auto">
      {" "}
      {/* Añadido px-6 para margen lateral */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Left column - Search and suggested FAQs */}
        <div className="space-y-8 md:col-span-1">
          <div>
            <h1 className="mb-8 text-3xl font-bold font-kaiseiDecol text-gray-900">
              {t("help.title")}
            </h1>

            {/* Search input */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder={t("help.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Suggested FAQs */}
            {faqs.length > 0 && (
              <FaqSuggestions
                faqs={faqs}
                onSelect={handleFaqSelect}
                maxSuggestions={faqs.length > 3 ? 3 : faqs.length}
              />
            )}
          </div>
        </div>

        {/* Right column - FAQ Accordion */}
        <div className="md:col-span-2">
          <h2 className="mb-6 text-2xl font-bold font-kaiseiDecol text-gray-900">
            {t("help.frequentQuestions")}
          </h2>

          {filteredFaqs.length > 0 ? (
            <FaqAccordion faqs={filteredFaqs} selectedFaqId={selectedFaqId} />
          ) : (
            <div className="p-8 text-center bg-gray-50 rounded-lg">
              <h3 className="mb-2 text-lg font-bold font-kaiseiDecol text-gray-700">
                {t("help.noResultsTitle")}
              </h3>
              <p className="text-gray-500">{t("help.noResultsMessage")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqsPage;
