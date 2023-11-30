import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Logout from "../userManagement/Logout";

export default function Header() {
  const { loginUser, setLoginUser } = useContext(UserContext);

  return (
    <header>
      <div className="header-logo">
        <h1>Pokedex</h1>
      </div>
      <div className="header-menu">
        <Link to="/" className="enlace">
          Home
        </Link> 
        
        <Link to="/pokedex" className="enlace">
          Pokedex
        </Link> 
        
        <Link to="/games" className="enlace">
          Games
        </Link> 
        {loginUser !== null ? (
          <>
            
            <Link to="/myPokedex" className="enlace">
              My Pokedex
            </Link> 
            
            <Link to="/profile" className="enlace">
              {loginUser.name}
            </Link> 
            | <Logout />
          </>
        ) : location.pathname === "/" ? (
          <>
            
            <Link to="/login" className="enlace">
              Login
            </Link> 
            
            <Link to="/register" className="enlace">
              Register
            </Link>
          </>
        ) : location.pathname.includes("login") ? (
          <>
            
            <Link to="/register" className="enlace">
              Register
            </Link>
          </>
        ) : location.pathname.includes("register") ? (
          <>
            
            <Link to="/login" className="enlace">
              Login
            </Link>
          </>
        ) : (
          <>
            
            <Link to="/register" className="enlace">
              Register
            </Link>
            
            <Link to="/login" className="enlace">
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
