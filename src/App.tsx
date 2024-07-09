import AppBar from './components/AppBar/AppBar';
import NewsCarousel from './components/NewsCarousel/NewsCarousel';
import InfoSection from './components/InfoSection/InfoSection';
import NowShowing from './components/NowShowing/NowShowing';
import Footer from './components/Footer';
import TheNew from './components/TheNew';
import { FadeInOnScroll } from './components/animations/FadeInOnScroll';
import AuthLayout from './layouts/AuthLayout';

function App() {
  return (
    <AuthLayout>
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
    </AuthLayout >
  );
}

export default App;
