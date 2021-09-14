import './App.css';
import './components/NavBar';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <main className='App-main'>
        {/* <ItemListContainer /> */}
        <ItemDetailContainer />
      </main>
    </div>
  );
}

export default App;
