import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import Filter from "../filter/Filter";
import { Link } from "react-router-dom";

export default function MainWeb() {
  const { listaPokemon, setListaPokemon } = useContext(UserContext);
  const [randomPokemon, setRandomPokemon] = useState(null);

  function fillRandom(positions) {
    let temp = [];
    for (let i = 0; i < 6; i++) {
      let pok = listaPokemon[Math.floor(Math.random() * listaPokemon.length)];
      while (temp.includes(pok)) {
        pok = listaPokemon[Math.floor(Math.random() * listaPokemon.length)];
      }
      temp.push(pok);
    }
    setRandomPokemon(temp);
  }

  useEffect(() => {
    if (listaPokemon !== null) fillRandom();
  }, [listaPokemon]);

  return (
    <>
      <div className="card-displayer">
        {randomPokemon !== null ? (
          randomPokemon.map((pokemon) => (
          <div key={pokemon.pokemonNumber} className="card">
            <Link to={`/pokemon/${pokemon.name}`}>
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
                <li key={i}>{tipo.name}</li>
              ))}
              </ul>
            </Link>
          </div>
          ))
        ) : (
          <h3>Cargando datos</h3>
        )}
      </div>
    </>
  );
}
