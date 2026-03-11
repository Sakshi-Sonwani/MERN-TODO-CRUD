import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignUp(){

    const [userData,setUserData]=useState({})
    const navigate = useNavigate();

      const handleSignUp = async (e) => {
        e.preventDefault();

        console.log(userData);

        let result = await fetch("http://localhost:3200/SignUp", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        result = await result.json();

        if(result.success){
          console.log("Signup successful");
          document.cookie = `token=${result.token}; path=/; max-age=432000`;
            navigate("/login");// Store token in cookie for 5 days
        }
      }  
    
    return( 
        <div className="container">
            <h1>Sign Up</h1>

              <label htmlFor="">Name</label>
              <input
              onChange={(event)=>setUserData({...userData,name:event.target.value})}

              type="text" name="name" placeholder="Enter your name" />

              <label htmlFor="">Email</label>
              <input
              onChange={(event)=>setUserData({...userData,email:event.target.value})}
              
              type="email" name="email" placeholder="Enter your email" />

              <label htmlFor="">Password</label>
              <input
              onChange={(event)=>setUserData({...userData,password:event.target.value})}
              
              type="password" name="password" placeholder="Enter your password" />

              <button onClick={handleSignUp} className="submit">Sign Up</button>
              <Link className='Link'to="/login">Already have an account? Login</Link>
        </div>
    )

}

 