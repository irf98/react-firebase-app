import logo from './logo.svg';
import './App.css';
import './components/NavBar';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <ItemListContainer/>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
