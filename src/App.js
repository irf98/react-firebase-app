import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CartContextProvider } from './context/CartContext';
import { UserContextProvider } from './context/UserContext';
import NavBar from './components/NavBar/NavBar';
import Wishlist from './components/Wishlist/Wishlist';
import Cart from './components/Cart/Cart';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import AccountRecovery from './components/AccountRecovery/AccountRecovery';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Checkout from './components/Checkout/Checkout';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <CartContextProvider>
          <div className="App">
            <header className="App-header">
              <NavBar />
            </header>
              <main className='App-main'>
                <Switch>
                  <Route path='/signup'>
                    <SignUp />
                  </Route>
                  <Route path='/signin'>
                    <SignIn />
                  </Route>
                  <Route path='/accountrecovery'>
                    <AccountRecovery />
                  </Route>
                  <Route path='/wishlist'>
                    <Wishlist />
                  </Route>
                  <Route path='/cart'>
                    <Cart />
                  </Route>
                  <Route exact path='/'>
                    <ItemListContainer />
                  </Route>
                  <Route path='/categories/:categories'>
                    <ItemListContainer />
                  </Route>
                  <Route path='/product/:id'>
                    <ItemDetailContainer />
                  </Route>
                  <Route path='/checkout'>
                    <Checkout />
                  </Route>
                </Switch>
              </main>
            <footer className='App-footer'>
              <Footer />
            </footer>
          </div>
        </CartContextProvider>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
