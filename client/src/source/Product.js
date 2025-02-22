import React, { useEffect, useState } from 'react';
import style from "../style/item.module.css";
import ItemCard from './Itemcard';
import {  useNavigate } from 'react-router-dom';

const Product = () => {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://ecommerce-mern-backend-athn.onrender.com/verse/products`);
                const data = await response.json();
                console.log(data);
                setProduct(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const goToCart = () => {
        navigate('/cart');
    }
    const goToCheckout = () =>{
        navigate('/checkout');
    }

    return (
        <div className={style.productPage}>
            <h1 className={style.heading}>Products</h1>
            <button className={style.cartButton} onClick={goToCart}>Cart</button>
            <button className={style.checkoutButton} onClick={goToCheckout}>Check-out</button>
            <div className={style.gridView}>
                {product.map((item) => (
                    <ItemCard key={item._id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default Product;
