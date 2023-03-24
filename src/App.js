import './App.css';
import Logo from './Components/Logo/Logo';
import Navigation from './Components/Navigation/Navigation';
import Rank from './Components/Rank/Rank';
import SearchImageForm from './Components/SearchImageForm/SearchImageForm';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Logo />
      <Rank />
      <SearchImageForm />
    </div>
  );
}

export default App;
