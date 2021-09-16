import './App.css';
import './components/NavBar';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <main className='App-main'>
        <ItemListContainer />
        {/*<ItemDetailContainer />*/}
      </main>
      <footer className='App-footer'>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
