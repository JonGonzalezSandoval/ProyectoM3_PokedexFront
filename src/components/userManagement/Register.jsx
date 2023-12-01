import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * TODO: Revisar si ya existe un usuario con ese nombre antes de poder registrar el nuevo. Y el metodo de creación.
 */

export default function Register() {
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleInput(e) {
    let tempNewUser = { ...newUser };
    tempNewUser[e.target.name] = e.target.value;
    setNewUser(tempNewUser);
  }

  function handleClick(e) {
    e.preventDefault();
    let { name, username, password } = newUser;

    let data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, password }),
    };

    fetch("http://p01--pokebancoapi--x42njn4vlmsz.code.run/api/users/newUser", data)
      .then((res) => {
        if (res.status == 202) {
          return res.text();
        }
        if (res.status == 401) throw new Error("Unauthorized");
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        if (error.message === "Unauthorized") {
          console.log("Not logged");
        } else {
          console.log("Other error handling: " + error);
          // Handle other errors here
        }
      });
    navigate("/");
  }

  return (
    <main className="main-manage">
      <form onSubmit={handleClick}>
        <label htmlFor="">
          Name:
          <input
            onChange={handleInput}
            type="text"
            name="name"
            required
            placeholder="John"
          />
        </label>
        <label htmlFor="">
          Username
          <input
            onChange={handleInput}
            type="text"
            name="username"
            required
            placeholder="Username"
          />
        </label>
        <label htmlFor="">
          Password
          <input
            onChange={handleInput}
            type="password"
            name="password"
            required
            placeholder="Your password here"
          />
        </label>
        <input type="submit" value="Register" />
      </form>
    </main>
  );
}
