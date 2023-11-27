import { useState } from "react";

/**
* TODO: revisar si ya existe un usuario con ese nombre antes de poder registrar el nuevo.
*/


export default function Register() {
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    password: "",
  });

  function handleInput(e) {
    let tempNewUser = { ...newUser };
    tempNewUser[e.target.name] = e.target.value;
    setNewUser(tempNewUser);
  }

  function handleClick(e) {
    e.preventDefault();
    let {name, username, password} = newUser;


    let data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, password }),
    };

    fetch("http://localhost:3000/api/users/newUser", data)
      .then((res) => {
        if (res.status == 202) {
          return res.text();
        }
        if (res.status == 401) throw new Error("Unauthorized");
      })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        if (error.message === "Unauthorized") {
          console.log("Not logged");
        } else {
          console.log("Other error handling: " + error);
          // Handle other errors here
        }
      });
  }

  return (
    <>
      <form onSubmit={handleClick}>
        <input
          onChange={handleInput}
          type="text"
          name="name"
          placeholder="John"
        />
        <input
          onChange={handleInput}
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          onChange={handleInput}
          type="password"
          name="password"
          placeholder="yourpasswordhere"
        />
        <input type="submit" value="Register" />
      </form>
    </>
  );
}
