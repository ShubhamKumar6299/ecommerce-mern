import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import style from '../style/sign.module.css'
import logo from "../style/image.png"
const SignUp = () => {
    const[name, setName]=useState("");
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");
    const navigate = useNavigate("");
    const fetchingData = async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch(`http://localhost:8082/verse/auth/register`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name" : name,
                    "email" : email,
                    "password" : password
                })
            });
            console.log("fetch succesfull");
            setName("");
            setEmail("");
            setPassword("");
            const rep = await response.json();
            if (response.ok) {
                localStorage.setItem('authToken', rep.tokens.access.token);
                console.log(rep);
                navigate('/products'); 
            } else {
                console.log("failed to register");
                
            }
        }catch(err){
            console.log(err);
        }
    }


  return (
    <div className={style.cbody}> 
    <div className={style.box}>
        <img className={style.cimg} src={logo} alt='logo'/>
        <h1>Register</h1><br/><br/>
        <form onSubmit={fetchingData}>
            <input type='text' placeholder='username' value={name} onChange={(e)=>setName(e.target.value)} required/><br></br>
            <input type='email' placeholder="type your email" value={email} onChange={(e)=>setEmail(e.target.value)} required/><br></br>
            <input type='password' placeholder='password(8-10)' value={password} onChange={(e)=>setPassword(e.target.value)} required/><br></br>
            <input type='submit' value="register"/>
        </form><br/>
        <p>Already have an account? <Link to="/signin">SignIn</Link></p>
    </div>
    </div>
  )
}

export default SignUp
