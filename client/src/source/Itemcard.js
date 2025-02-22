import React from 'react';
import style from "../style/item.module.css";

const ItemCard = ({ item }) => {
    const handleBuy = async (productId) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("You need to be logged in to buy");
      return;
    }

    const response = await fetch(`http://localhost:8082/verse/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: productId,
        quantity: 1 
      })
    });

    if (!response.ok) {
      throw new Error("Failed to add product to cart");
    }
    const cart = await response.json();
    console.log(cart);
    alert("Product added to cart successfully!");

  } catch (err) {
    console.error(err);
    alert("Error adding product to cart");
  }
};

    return (
        <div className={style.card}>
            <img className={style.image} src={item.image} alt={item.name} />
            <h2 className={style.name}>{item.name}</h2>
            <p className={style.category}>{item.category}</p>
            <p className={style.price}>₹{item.cost}</p>
            <p className={style.rating}>Rating: {item.rating} ⭐</p>
            <button className={style.buyButton}  onClick={() => handleBuy(item._id)}>Buy Now</button>
        </div>
    );
}

export default ItemCard;
