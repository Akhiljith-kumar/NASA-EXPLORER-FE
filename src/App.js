import APOD from './components/APOD'
import SpaceWeatherAlerts from './components/SpaceWeatherAlerts';
import MediaExplorer from './components/MediaExplorer';
import TechTransferExplorer from './components/TechTransferExplorer';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="App" id="blur">
        <Header />
        <div className='flex-row sec-1'>
          <APOD/>
          <SpaceWeatherAlerts />
        </div>
        <MediaExplorer />
        <TechTransferExplorer />
    </div>
  );
}

export default App;
