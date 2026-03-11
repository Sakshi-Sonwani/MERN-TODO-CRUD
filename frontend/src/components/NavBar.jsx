import { Link, useNavigate } from "react-router-dom";
import "../style/navbar.css";
import { useEffect, useState } from "react";

function NavBar() {

  const [login, setLogin] = useState(localStorage.getItem("token") ? true : false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setLogin(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleTokenChange = () => {
      setLogin(localStorage.getItem("token") ? true : false);
    };

    window.addEventListener("tokenChanged", handleTokenChange);

    return () => {
      window.removeEventListener("tokenChanged", handleTokenChange);
    };

  }, []);

  return (
    <nav className="navbar">
      <div className="logo">To Do App</div>

      <ul className="nav-links">

        {!login ? (
          <>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/">List</Link></li>
            <li><Link to="/add">Add Task</Link></li>
            <li><Link onClick={logout}>Logout</Link></li>
          </>
        )}

      </ul>
    </nav>
  );
}

export default NavBar;