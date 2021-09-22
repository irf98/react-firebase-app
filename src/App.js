import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
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
        <Switch>
          <main className='App-main'>
            <Route path='/wishlist'>
              <Wishlist />
            </Route>
            <Route path='/cart'>
              <Cart />
            </Route>
            <Route exact path='/'>
              <ItemListContainer />
            </Route>
            <Route path='/product/:id'>
              <ItemDetailContainer />
            </Route>
          </main>
        </Switch>
        <footer className='App-footer'>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>  
  );
}

export default App;
