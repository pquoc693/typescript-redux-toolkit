import React from 'react';
import './App.css';
import { ProductsList } from './Product/ProducstList';
import ProductForm from './Product/ProductForm';
import { Provider } from 'react-redux'
import store from './store';
import Cart from './Cart/Cart';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ProductsList />
        <ProductForm />
        <Cart />
      </div>
    </Provider>
  );
}

export default App;
