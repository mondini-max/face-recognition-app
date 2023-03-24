import './App.css';
import Logo from './Components/Logo/Logo';
import Navigation from './Components/Navigation/Navigation';
import SearchImageForm from './Components/SearchImageForm/SearchImageForm';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Logo />
      <SearchImageForm />
    </div>
  );
}

export default App;
