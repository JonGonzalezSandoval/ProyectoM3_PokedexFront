import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "./context/UserContext";
import MainWeb from "./components/mainWeb/MainWeb";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./components/userManagement/Login";
import Register from "./components/userManagement/Register";

function App() {
  const [listaPokemon, setListaPokemon] = useState(null);
  const [listaTipos, setListaTipos] = useState(null)
  const [listaHabilidades, setListaHabilidades] = useState(null)
  const [loginUser, setLoginUser] = useState(null)

  function pedidaTestPokemon() {
    fetch("http://localhost:3000/api/pokemon/paginated")
      .then((res) => res.json())
      .then((res) => {
        setListaPokemon(res.pokemon);
      });
  }
  function pedidaTestTipos() {
    fetch("http://localhost:3000/api/pokemon-types/allTypes")
      .then((res) => res.json())
      .then((res) => {
        setListaTipos(res);
      });
  }
  function pedidaTestHabilidades() {
    fetch("http://localhost:3000/api/pokemon-abilities/allAbilities")
      .then((res) => res.json())
      .then((res) => {
        setListaHabilidades(res)
        
      });
  }

  useEffect(() => {
    pedidaTestPokemon();
    pedidaTestTipos();
    pedidaTestHabilidades();
  }, []);

  return (
    <UserContext.Provider value={{ listaPokemon, setListaPokemon, listaTipos, setListaTipos, listaHabilidades, setListaHabilidades, loginUser, setLoginUser}}>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<MainWeb/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </UserContext.Provider>
  );
}

export default App;
