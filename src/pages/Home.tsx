import NewsCarousel from '../components/NewsCarousel/NewsCarousel';
import InfoSection from '../components/InfoSection/InfoSection';
import NowShowing from '../components/NowShowing';
import TheNew from '../components/TheNew';
import { FadeInOnScroll } from '../components/animations/FadeInOnScroll';

function HomePage() {
  return (
    <div>
      <NewsCarousel />
      <InfoSection />
      <FadeInOnScroll
        distance={20}
        duration={2}
      >
        <NowShowing />
      </FadeInOnScroll>
      <TheNew />
    </div >
  );
}

export default HomePage;
