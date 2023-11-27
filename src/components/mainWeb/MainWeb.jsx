import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import Filter from "../filter/Filter";

export default function MainWeb() {
  const { listaPokemon, setListaPokemon } = useContext(UserContext);
  const [randomPokemon, setRandomPokemon] = useState(null);

  function fillRandom(positions) {
    let temp = [];
    for (let i = 0; i < 6; i++) {
      temp.push(listaPokemon[Math.floor(Math.random()*listaPokemon.length)])
    }
    setRandomPokemon(temp)
  }

  useEffect(() => {
    if(listaPokemon !== null)
      fillRandom();
  },[listaPokemon])

  return (
    <>
      <div>
        {randomPokemon !== null ? (
          randomPokemon.map((pokemon) => (
            <div key={pokemon.pokemonNumber}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1)}
              <div>
                <img
                  src={pokemon.urlImg}
                  alt={`Imagen del pokemon ${pokemon.name}`}
                />
              </div>
            </div>
          ))
        ) : (
          <h3>Cargando datos</h3>
        )}
        <Filter />
      </div>
    </>
  );
}
