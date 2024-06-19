import AppBar from './components/AppBar/AppBar';
import NewsCarousel from './components/NewsCarousel/NewsCarousel';
import InfoSection from './components/InfoSection/InfoSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <AppBar />
      <div className="flex-grow">
        <NewsCarousel />
        <InfoSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
