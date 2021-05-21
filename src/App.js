import React, { useState } from 'react'
import './App.css'
import { Product } from './components/Product/Product'
import items from './api/items';
import Cart from './components/Cart/Cart'
/* import CheckoutForm from './components/CheckoutForm/CheckoutForm' */


export default function App() {
  const [itemsInCart, setItemsInCart] = useState([]);

  const handleAddToCartClick = id => {
    setItemsInCart(itemsInCart => {
      const itemInCart = itemsInCart.find(item => item.id === id);

      // if item is already in cart, update the quantity
      if (itemInCart) {
        return itemsInCart.map(item => {
          if (item.id !== id) return item;
          return { ...itemInCart, quantity: item.quantity + 1 };
        });
      }

      // otherwise, add new item to cart
      const item = items.find(item => item.id === id);
      return [...itemsInCart, { ...item, quantity: 1 }];
    });
  };

  const totalCost = itemsInCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );



  return (
    <div className="App">
      <header>
        <img src="https://www.watchmojo.com/uploads/thumbs720/VG-RP-Top10-VideoGame-Publishers-480p30.jpg" height="100px"/>
        <span className="header_title">The PlayGames Station</span>
      </header>
      <main className="App-shop">
        <div className="App-products">
          {items.map(item => (
            <Product 
            key={item.title} 
            title={item.title} price={item.price}
            onAddToCartClick={() => handleAddToCartClick(item.id)} />
          ))}
        </div>
        <Cart itemsInCart={itemsInCart} totalCost={totalCost} />
      </main>
    </div>
  )
}


