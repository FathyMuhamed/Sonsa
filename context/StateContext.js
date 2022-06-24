import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);

	let index;
	let foundProduct;

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

	const onRemoveItem = (product) => {
		foundProduct = cartItems.find(item => item._id === product._id);
		const newCartItem = cartItems.filter(item => item._id !== product._id);
		setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity);
		setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
		setCartItems(newCartItem);
	}

	const toggleCartItemQuantity = (id, value) => {
		foundProduct = cartItems.find(item => item._id === id);
		index = cartItems.findIndex(product => product._id === id);
		const newCartItem = cartItems.filter(item => item._id !== id);
		if (value === 'inc') {
			setCartItems([...newCartItem, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
			setTotalPrice(prevPrice => prevPrice + foundProduct.price);
			setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
		} else if (value === 'dec') {
			if (foundProduct.quantity > 1) {
				setCartItems([...newCartItem, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
				setTotalPrice(prevPrice => prevPrice - foundProduct.price);
				setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
			}
		}
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
			toggleCartItemQuantity,
			onRemoveItem,
			setCartItems,
			setTotalPrice,
			setTotalQuantities
		}} >
		{children}
	</Context.Provider>
}

export const useStateContext = () => useContext(Context)