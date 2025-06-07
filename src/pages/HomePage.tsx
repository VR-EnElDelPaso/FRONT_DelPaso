import NewsCarousel from "../components/NewsCarousel/NewsCarousel";
import InfoSection from "../components/InfoSection/InfoSection";
import NowShowing from "../components/NowShowing";
import { FadeInOnScroll } from "../components/animations/FadeInOnScroll";
import StatsSection from "@/components/StatsSection";
import HelpSection from "@/components/HelpSection";
import { CarruselMuseums } from "@/features/home/components/CarruselMuseums/CarrouselMuseums";

function HomePage() {
  return (
    <div>
      <NewsCarousel />
      <InfoSection />
      <CarruselMuseums />
      <FadeInOnScroll distance={20} duration={2}>
        <NowShowing />
      </FadeInOnScroll>
      <StatsSection />
      <HelpSection />
    </div>
  );
}

export default HomePage;
