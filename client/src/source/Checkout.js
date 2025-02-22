import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../style/checkout.module.css';
import logo from "../style/image.png";

const Checkout = () => {
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Credit Card");
    const navigate = useNavigate();

    const handleCheckout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8082/verse/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    address,
                    paymentMethod
                })
            });
            console.log("Checkout successful");
            if (response.ok) {
                navigate('/order-confirmation');
            } else {
                console.log("Checkout failed");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={style.cbody}>
            <div className={style.box}>
                <img className={style.cimg} src={logo} alt='logo'/>
                <h1>Checkout</h1>
                <form onSubmit={handleCheckout}>
                    <textarea 
                        placeholder="Enter your address" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    /><br></br>
                    
                    <select 
                        value={paymentMethod} 
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    >
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Cash on Delivery">Cash on Delivery</option>
                    </select><br></br>

                    <input type='submit' value="Place Order" /><br></br>
                </form>
            </div>
        </div>
    )
}

export default Checkout;
