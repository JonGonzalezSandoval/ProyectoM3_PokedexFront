import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Logout from "../userManagement/Logout";

export default function Header() {
  const { loginUser, setLoginUser } = useContext(UserContext);

  return (
    <header>
      <div>
        <h1>Pokedex</h1>
      </div>
      <div>
        <Link to="/" className="">
          Home
        </Link>{" "}
        |{" "}
        <Link to="/pokedex" className="">
          Pokedex
        </Link>{" "}
        |{" "}
        <Link to="/games" className="">
          Games
        </Link>{" "}
        {loginUser !== null ? (
          <>
            |{" "}
            <Link to="/myPokedex" className="">
              My Pokedex
            </Link>{" "}
            |{" "}
            <Link to="/profile" className="">
              {loginUser.name}
            </Link>{" "}
            | <Logout />
          </>
        ) : location.pathname === "/" ? (
          <>
            |{" "}
            <Link to="/login" className="">
              Login
            </Link>{" "}
            |{" "}
            <Link to="/register" className="">
              Register
            </Link>
          </>
        ) : location.pathname.includes("login") ? (
          <>
            |{" "}
            <Link to="/register" className="">
              Register
            </Link>
          </>
        ) : location.pathname.includes("register") ? (
          <>
            |{" "}
            <Link to="/login" className="">
              Login
            </Link>
          </>
        ) : (
          <>
            |{" "}
            <Link to="/register" className="">
              Register
            </Link>
            |{" "}
            <Link to="/login" className="">
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
