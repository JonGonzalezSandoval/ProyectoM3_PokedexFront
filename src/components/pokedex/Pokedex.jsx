import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import Filter from "../filter/Filter";
import { Link } from "react-router-dom";

export default function Pokedex() {
  const { listaPokemon, setListaPokemon } = useContext(UserContext);

  return (
    <>
      <main>
        <div className="pokemon-box">
          <div className="card-displayer">
            {listaPokemon !== null ? (
              listaPokemon.map((pokemon) => (
                <div key={pokemon.pokemonNumber} className="card">
                  {/* <Link to={`/pokemon/${pokemon.name}`}> */}
                    <div>
                      <img
                        src={pokemon.urlImg}
                        alt={`Imagen del pokemon ${pokemon.name}`}
                        />
                    </div>
                    <span>Nº {pokemon.pokemonNumber}</span>
                    <h4>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1)}</h4>
                    <ul>
                    {pokemon.pokemonType.map((tipo, i) => (
                      <li key={i}>{tipo.name.charAt(0).toUpperCase() + tipo.name.substring(1)}</li>
                    ))}
                    </ul>
                  {/* </Link> */}
                </div>
              ))
            ) : (
              <h3>Cargando datos</h3>
            )}
          </div>
        </div>
        <Filter />
      </main>
    </>
  );
}
