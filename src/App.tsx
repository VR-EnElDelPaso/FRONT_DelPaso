import AppBar from './components/AppBar/AppBar';
import NewsCarousel from './components/NewsCarousel/NewsCarousel';

function App() {

  return (
      <div className="flex flex-col h-screen">
        <AppBar />
        <div className="flex-grow">
          <NewsCarousel />
        </div>
      </div>
  )
}

export default App
