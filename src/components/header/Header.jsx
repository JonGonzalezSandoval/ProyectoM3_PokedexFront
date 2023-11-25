import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Header() {
  const { loginUser, setLoginUser } = useContext(UserContext);

  let navigate = useNavigate();

  function handleLogout() {
    setLoginUser(null);
    navigate("/");
  }
  return (
    <header>
      <div>
        <h1>Pokedex</h1>
      </div>
      <div>
        <Link to="/" className="">
          Home
        </Link>{" "}
        {loginUser !== null ? (
          <>
            <h2>Welcome {loginUser.username}</h2>
            <h4 className="logout" onClick={handleLogout}>
              {" "}
              Logout{" "}
            </h4>
          </>
        ) : location.pathname === "/" ? (
          <>
            |{" "}
            <Link to="/login" className="">
              Login
            </Link>{" "}
            |{" "}
            <Link to="/register" className="">
              Regristate
            </Link>
          </>
        ) : location.pathname.includes("login") ? (
          <>
            |{" "}
            <Link to="/register" className="">
              Regrister
            </Link>
          </>
        ) : (
          <>
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
