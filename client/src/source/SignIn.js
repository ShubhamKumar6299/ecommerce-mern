import React, { useState } from 'react'
import { useNavigate ,Link } from 'react-router-dom';
import style from '../style/sign.module.css'
import logo from "../style/image.png"

const SignIn = () => {
    // const[name, setName]=useState("");
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");
    const navigate = useNavigate("");
    const fetchingData = async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch(`https://ecommerce-mern-backend-athn.onrender.com/verse/auth/login`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email" : email,
                    "password" : password
                })
            });
            console.log("fetch succesfull");
            const rep = await response.json();
            if (response.ok) {
                localStorage.setItem('authToken', rep.tokens.access.token);
                console.log(rep);
                navigate('/products'); 
            } else {

                alert("Login failed");
                
            }
            
        }catch(err){
            console.log(err);
        }
    }


  return (
    <div className={style.cbody}>   
     <div className={style.box}> 
    <img className={style.cimg} src={logo} alt='logo'/>
        <h1>Sign In</h1>
        <form onSubmit={fetchingData}>
            <input type='email' placeholder="type your email" value = {email} onChange={(e)=>setEmail(e.target.value)} required/><br></br>
            <input type='password' placeholder='password(8-10)' value={password} onChange={(e)=>setPassword(e.target.value)} required/><br></br>
            <input type='submit' value="login"/><br></br>
        </form>
        <p>Don't have an account? <Link to="/">SignUp</Link></p>
    </div>
    </div>

  )
}

export default SignIn
