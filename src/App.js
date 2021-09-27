import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CartContextProvider } from './context/CartContext';
import NavBar from './components/NavBar/NavBar';
import Wishlist from './components/Wishlist/Wishlist';
import Cart from './components/Cart/Cart';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
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
      </CartContextProvider>
    </BrowserRouter>  
  );
}

export default App;
