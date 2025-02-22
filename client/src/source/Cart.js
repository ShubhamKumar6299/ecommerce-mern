import React, { useEffect, useState } from 'react';
import style from '../style/cart.module.css';
import {  useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate("");
    // Fetch Cart Data
    const fetchCart = async () => {
        try {
            const response = await fetch(`https://ecommerce-mern-backend-athn.onrender.com/verse/cart`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCartItems(data.cartItems);
            } else {
                console.error('Failed to fetch cart:', response.status);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    // Update Product Quantity
    const updateQuantity = async (productId, newQuantity) => {
        try {
            const response = await fetch(`https://ecommerce-mern-backend-athn.onrender.com/verse/cart`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    productId,
                    quantity: newQuantity
                })
            });

            if (response.ok) {
                fetchCart(); // Refresh cart after update
            } else {
                console.error('Failed to update quantity:', response.status);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

   
    const removeitem = async (productId) => {
        try {
            const response = await fetch(`https://ecommerce-mern-backend-athn.onrender.com/verse/cart`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    productId,
                    quantity: 0
                })
            });

            if (response.ok) {
                fetchCart(); // Refresh cart after update
            } else {
                console.error('Failed to update quantity:', response.status);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const goTopro = () => {
        navigate('/products');
    }
    const goToCheckout = () =>{
        navigate('/checkout');
    }

    return (
        <div className={style.cartContainer}>
            <button className={style.checkoutButton} onClick={goToCheckout}>Check-out</button>
            <button className={style.cartButton} onClick={goTopro}>Products</button>
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                <div className={style.cartItems}>
                    {cartItems.map((item) => (
                        <div key={item.product._id} className={style.cartItem}>
                            <div>
                            <img src={item.product.image} alt={item.product.name} />
                            <div className={style.details}>
                                <h2>{item.product.name}</h2>
                                <p>Category: {item.product.category}</p>
                                <p>Price: ${item.product.cost}</p>
                                <p>Rating: {item.product.rating}</p>
                                </div>
                                </div>
                                <div className={style.quantityControl}>
                                    <button 
                                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    ><b>-</b></button>
                                    <span><b>{item.quantity}</b></span>
                                    <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}><b>+</b></button>
                                </div>
                                <div>
                                <button className={style.removeButton} onClick={()=>removeitem(item.product._id)}>Remove</button> 
                                </div>
                            
                        </div>
                    ))}
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
