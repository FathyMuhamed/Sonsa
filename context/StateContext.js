import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";




const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);


  const onAdd = (product, quantity) => {
    const checkProductCart = cartItems.find(item => item._id === product._id);
    setTotalPrice(prevPrice => prevPrice + product.price * quantity);
    setTotalQuantities(prevQuantity => prevQuantity + quantity);

    if (checkProductCart) {
      const updateCartItems = cartItems.map(cartProduct => {
        if (cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })
      setCartItems(updateCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }])
    }
    toast.success(`${qty} ${product.name} added to the cart`);
  }
  const incQty = () => setQty(prevQty => prevQty + 1)
  const decQty = () => setQty(prevQty => {
    return prevQty - 1 < 1 ? 1 : prevQty - 1
    /**
     * if(prevQty - 1 < 1) return 1;
     * return prevQty - 1;
     */
  })

  return <Context.Provider
    value={{
      showCart,
      setShowCart,
      cartItems,
      totalPrice,
      totalQuantities,
      qty,
      incQty,
      decQty,
      onAdd,
    }} >
    {children}
  </Context.Provider>
}

export const useStateContext = () => useContext(Context)