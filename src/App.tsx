import AppBar from './components/AppBar/AppBar';
import NewsCarousel from './components/NewsCarousel/NewsCarousel';
import InfoSection from './components/InfoSection/InfoSection';
import NowShowing from './components/NowShowing/NowShowing';
import Footer from './components/Footer';
import TheNew from './components/TheNew';
import { FadeInOnScroll } from './components/animations/FadeInOnScroll';

function App() {
  return (
    <div>
      <AppBar />
      <NewsCarousel />
      <InfoSection />
      <FadeInOnScroll
        distance={20}
        duration={2}
      >
        <NowShowing />
      </FadeInOnScroll>
      <TheNew />
      <Footer />
    </div >
  );
}

export default App;
