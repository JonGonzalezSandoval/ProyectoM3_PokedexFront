import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Login() {
  const [user, setUser] = useState({ username: "", password: "" });

  const { loginUser, setLoginUser } = useContext(UserContext);

  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();

    let username = user.username;
    let password = user.password;

    
    let data = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password}),
  }

  fetch('http://localhost:3000/api/auth/login', data)
    .then(res => {
        if(res.status == 202){
           return  res.text()
        }
        if(res.status == 401)
            throw new Error("Unauthorized")
        })
    .then(res => {
        localStorage.removeItem('SavedToken')
        localStorage.setItem("SavedToken", 'Bearer ' + res)
            fetch('http://localhost:3000/api/auth/profile', { headers: { Authorization:localStorage.getItem('SavedToken') }})
            .then(res => res.json())
            .then(res =>{
              console.log(res)
              setLoginUser(res);
              navigate("/");
        })
    })
    .catch(error => {
        if (error.message === "Unauthorized") {
            console.log("Ande vas fiera que no estás logeado")
          } else {
            console.log('Other error handling: ' + error);
            // Handle other errors here
          }
    })

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
