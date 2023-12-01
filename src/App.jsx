import { useEffect, useState } from "react";
import "./styles/App.scss";
import "./styles/pokemonCard.scss"
import "./styles/header.scss"
import "./styles/games.scss"
import "./styles/userManagement.scss"
import "./styles/home.scss"
import "./styles/pokedex.scss"
import "./styles/myPokedex.scss"
import "./styles/filter.scss"
import "./styles/footer.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "./context/UserContext";
import MainWeb from "./components/mainWeb/MainWeb";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./components/userManagement/Login";
import Register from "./components/userManagement/Register";
import Pokedex from "./components/pokedex/Pokedex";
import Games from "./components/games/Games";
import MyPokedex from "./components/myPokedex/MyPokedex";
import WhatPokemon from "./components/games/WhatPokemon";
import Profile from "./components/userManagement/Profile";
import Pokemon from "./components/pokemon/Pokemon";
import SudokuPokemon from "./components/games/SudokuPokemon";
import Logout from "./components/userManagement/Logout";


function App() {
  const [listaPokemon, setListaPokemon] = useState(null);
  const [listaTipos, setListaTipos] = useState(null)
  const [listaHabilidades, setListaHabilidades] = useState(null)
  const [loginUser, setLoginUser] = useState(null)

  function pedidaTestPokemon() {
    fetch("http://p01--pokebancoapi--x42njn4vlmsz.code.run/api/pokemon/paginated")
      .then((res) => res.json())
      .then((res) => {
        setListaPokemon(res.pokemon);
      });
  }
  function pedidaTestTipos() {
    fetch("http://p01--pokebancoapi--x42njn4vlmsz.code.run/api/pokemon-types/allTypes")
      .then((res) => res.json())
      .then((res) => {
        setListaTipos(res);
      });
  }
  function pedidaTestHabilidades() {
    fetch("http://p01--pokebancoapi--x42njn4vlmsz.code.run/api/pokemon-abilities/allAbilities")
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
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/pokedex" element={<Pokedex/>}/>
          <Route path="/myPokedex" element={<MyPokedex/>}/>
          <Route path="/pokemon/:chosenPokemon" element={<Pokemon/>}/>
          <Route path="/games" element={<Games/>}/>
          <Route path="/guessPokemon" element={<WhatPokemon/>} />
          <Route path="/sudoku" element={<SudokuPokemon/>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </UserContext.Provider>
  );
}

export default App;
