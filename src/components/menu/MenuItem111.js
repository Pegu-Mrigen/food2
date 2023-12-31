"use client"
import React, { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";

const MenuItem = (menuItem) => {

  const {image, name, description, basePrice, sizes, extraIngredientPrice}=menuItem

  const [showPopup, setShowPopup] = useState(false)
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null)
  const [selectedExtra, setSelectedExtra] = useState([])


  const {addToCart}=useContext(CartContext)


  function handleAddToCartButtonClick(){

    const selectedOptions= sizes.length>0 || extraIngredientPrice.length>0
    if(selectedOptions && !showPopup){
      setShowPopup(true)
      return;
      
    }else{
      
      addToCart(menuItem, selectedExtra, selectedSize)
      setShowPopup(false)
      toast.success("Added to cart!")
      
       
      
    }
  }
  function handleExtraClick(e, extra){
    //console.log(e)
    const checked = e.target.checked

    if(checked){
      setSelectedExtra(prev=>[...prev, extra])
    }else{
      setSelectedExtra(prev=>{
        return prev.filter(e=>e.name!== extra.name)
      })
    }

  }


  let selectedPrice= basePrice

  if(selectedSize){
    selectedPrice += selectedSize.price
  }
  if(selectedExtra?.length>0 ){
    for (const extra of selectedExtra){
      selectedPrice +=extra.price
    }
  }
  return (


    
    <>

    {showPopup && 
    (<div onClick={()=>setShowPopup(false)} className="fixed inset-0 bg-black/80 flex items-center justify-center">
      <div
      onClick={e=>e.stopPropagation()}
      className="my-8 bg-white p-2 rounded-lg max-w-md ">
      <div className=" overflow-y-scroll p-2" style={{maxHeight:"calc(100vh - 80px"}}>

     
      <Image src={image} alt={name} width={300} height={200} className="mx-auto"  />
      <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
      <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
      {sizes?.length>0 &&(
        <div className=" py-2">
          <h3 className="text-center text-gray-700">Pick your item size</h3>
          {sizes.map(size=>(
            <label key={size} className="flex items-center gap-2 p-4 border rounded-md">
              <input type="radio" onClick={()=>setSelectedSize(size)}
              
              checked={selectedSize?.name===size.name}
              name="size"  value="" />{size.name} Rs/- {basePrice + size.price}
            </label>
          ))}
        </div>
      )}
      {extraIngredientPrice?.length>0 && (
        <div className=" py-2">
        <h3 className="text-center text-gray-700">Pick your Extras</h3>
        
        {/* {JSON.stringify(selectedExtra)} */}

        {extraIngredientPrice.map(extra=>(
          <label key={extra} className="flex items-center gap-2 p-4 border rounded-md">
            <input type="checkbox" onClick={(e)=>handleExtraClick(e, extra)} name="extra"  value="" />{extra.name} +Rs/- { extra.price}
          </label>
        ))}
      </div>

      )}
      <button  type="button" className=" primary sticky bottom-2" onClick={handleAddToCartButtonClick}>Add to cart Rs/- {selectedPrice}</button>
      <button onClick={()=>setShowPopup(false)} className="mt-2">Cancel</button>
      </div>
      </div>

    </div>)
    }
    {/* <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-black/50 hover:shadow-2xl transition-all">
      <div className="text-center">
        <img src={image} alt="pizza" className="max-h-24 block mx-auto" />
      </div>

      <h4 className="font-semibold my-2 text-xl">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3 ">
        {description}
      </p>

      
      <button type="button" onClick={handleAddToCartButtonClick}
        className="bg-primary text-white rounded-full
            px-8 py-2 mt-4"
            
            >
        Add to cart Rs/- {basePrice}
      </button>
    </div> */}

    {/* <MenuItemTile {...menuItem} onAddToCart={handleAddToCartButtonClick} /> */}
        </>
  );
};

export default MenuItem;



