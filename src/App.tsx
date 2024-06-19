import AppBar from './components/AppBar/AppBar';
import NewsCarousel from './components/NewsCarousel/NewsCarousel';
import InfoSection from './components/InfoSection/InfoSection';

function App() {
  return (
      <div className="flex flex-col h-screen">
        <AppBar />
        <div className="flex-grow">
          <NewsCarousel />
          <InfoSection />
        </div>

      </div>
  );
}

export default App;
