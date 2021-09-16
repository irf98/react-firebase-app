import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>  
  );
}

export default App;
