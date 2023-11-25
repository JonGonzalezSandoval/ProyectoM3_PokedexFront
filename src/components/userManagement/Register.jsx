import { useState } from "react";

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
    console.log(newUser)
  }

  return (
    <>
      <form onSubmit={handleClick}>
        <input onChange={handleInput} type="text" name="name" placeholder="John"/>
        <input onChange={handleInput} type="text" name="username" placeholder="Username"/>
        <input onChange={handleInput} type="password" name="password" placeholder="yourpasswordhere"/>
        <input type="submit" value="Register" />
      </form>
    </>
  );
}
