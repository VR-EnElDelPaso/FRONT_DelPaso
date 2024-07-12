import AppBar from './components/AppBar/AppBar';
import NewsCarousel from './components/NewsCarousel/NewsCarousel';
import InfoSection from './components/InfoSection/InfoSection';
import NowShowing from './components/NowShowing';
import Footer from './components/Footer';
import TheNew from './components/TheNew';

function App() {
  return (
    <div>
      <AppBar />
      <NewsCarousel />
      <InfoSection />
      <NowShowing />
      <TheNew />
      <Footer />
    </div >
  );
}

export default App;
