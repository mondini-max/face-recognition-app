import './App.css';
import Logo from './Components/Logo/Logo';
import Navigation from './Components/Navigation/Navigation';
import Rank from './Components/Rank/Rank';
import SearchImageForm from './Components/SearchImageForm/SearchImageForm';
import ParticlesBg from 'particles-bg';

function App() {
  return (
    <div className='App'>
      <ParticlesBg num={200} type='thick' bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <SearchImageForm />
    </div>
  );
}

export default App;
