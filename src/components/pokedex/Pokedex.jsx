import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import Filter from "../filter/Filter";

export default function Pokedex() {
  const { listaPokemon, setListaPokemon } = useContext(UserContext);

  return (
    <>
      <div> 
        {listaPokemon !== null ? (
          listaPokemon.map((pokemon) => (
            <div key={pokemon.pokemonNumber}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1)}
              <div>
                <img src={pokemon.urlImg} alt={`Imagen del pokemon ${pokemon.name}`} />
              </div>
            </div>
          ))
        ) : (
          <h3>Cargando datos</h3>
        )}
        <Filter/>
      </div>
    </>
  );
}
