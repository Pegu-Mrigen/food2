"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export default function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const localStorage= typeof window !== "undefined"? window.localStorage:null


  useEffect(()=>{

    if(localStorage && localStorage.getItem("cart")){
        setCartProducts(JSON.parse(localStorage.getItem("cart")))
    }

  }, [localStorage])


  function saveCartProductsToLocalStorage(cartProducts){
    if(localStorage){
        localStorage.setItem("cart", JSON.stringify(cartProducts))
    }
  }




  

  function addToCart(product, size = null, extras = []) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts)
      return newProducts;
    });
  }
  function removeCartProduct(indexToRemove) {
    setCartProducts(prevCartProducts=>{
        const newCartProducts= prevCartProducts.filter((v, index)=>index!==indexToRemove)
        saveCartProductsToLocalStorage(newCartProducts)
        return newCartProducts
    });
  }
  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([])
  }
  return (
    <SessionProvider>
      <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
