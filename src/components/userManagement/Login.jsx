import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Login() {
  const [user, setUser] = useState({ username: "", password: "" });

  const { loginUser, setLoginUser } = useContext(UserContext);

  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();

    setLoginUser(user);
    navigate("/");
  }

  function handleInput(e) {
    let userTemp = { ...user };
    userTemp[e.target.name] = e.target.value;
    setUser(userTemp);
  }

  return (
    <>
      <form>
        <label htmlFor="">
          Username: 
          <input
            onChange={handleInput}
            type="text"
            name="username"
            placeholder="Username"
          />
        </label>
        <label htmlFor="">
          Password: 
          <input
            onChange={handleInput}
            type="password"
            name="password"
            placeholde
            r="Password"
          />
        </label>
        <button onClick={handleClick}>Login</button>
      </form>
      <div>
        <Link to="/register">No tienes cuenta? Registrate</Link>
      </div>
    </>
  );
}
