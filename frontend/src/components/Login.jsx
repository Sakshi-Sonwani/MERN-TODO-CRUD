import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Check localStorage for token
    if (token) {
      navigate("/"); // Redirect to home page if token exists
    }
  }, [navigate]);


  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(userData);

    let result = await fetch("http://localhost:3200/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    result = await result.json();

    if (result.success) {
      console.log("Login successful");

      document.cookie = `token=${result.token}; path=/; max-age=432000`;
      localStorage.setItem("token", result.token); // Store token in localStorage for 5 days
      window.dispatchEvent(new Event("tokenChanged")); // Redirect to home page
      navigate("/");// Store token in cookie for 5 days
    }
  };

  return (
    <div className="container">

      <h1>Login</h1>

      <label>Email</label>
      <input
        onChange={(event) =>
          setUserData({ ...userData, email: event.target.value })
        }
        type="text"
        placeholder="Enter your email"
      />

      <label>Password</label>
      <input
        onChange={(event) =>
          setUserData({ ...userData, password: event.target.value })
        }
        type="password"
        placeholder="Enter your password"
      />

      <button onClick={handleLogin} className="submit">
        Login
      </button>

      <Link className="Link" to="/signup">
       Sign Up
      </Link>

    </div>
  );
}