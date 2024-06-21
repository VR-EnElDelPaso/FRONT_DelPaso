import AppBar from './components/AppBar/AppBar';
import NewsCarousel from './components/NewsCarousel/NewsCarousel';
import InfoSection from './components/InfoSection/InfoSection';
import NowShowing from './components/NowShowing/NowShowing';

function App() {

  return (
      <div className="flex flex-col h-screen">
        <AppBar />
        <div className="flex-grow">
          <NewsCarousel />
          <InfoSection />
          <NowShowing />
        </div>

      </div>
  )
}

export default App
