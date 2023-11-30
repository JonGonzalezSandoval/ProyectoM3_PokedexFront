import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Pokemon() {
  const { chosenPokemon } = useParams();
  //   const { listaPokemon, setListaPokemon } = useContext(UserContext);
  const [pokemon, setPokemon] = useState(null);

  function findPokemonInfo(pokemonParam) {
    fetch(`http://localhost:3000/api/pokemon/unique/${pokemonParam}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPokemon(res);
      });
  }

  useEffect(() => {
    findPokemonInfo(chosenPokemon);
    console.log(pokemon);
  }, []);

  return pokemon !== null ? (
    <main className="pokemon">
      <div className="pokemon-displayer">
        <h2 className="pokemon-displayer__title">
          {pokemon[0].name.charAt(0).toUpperCase() +
            pokemon[0].name.substring(1)}
        </h2>
        <h2 className="pokemon-displayer__number">
          Nº {pokemon[0].pokemonNumber}
        </h2>
        <div className="pokemon-displayer__img-container">
          <img
            src={pokemon[0].urlImg}
            alt={`Imagen del pokemon ${pokemon[0].name}`}
          />
        </div>
        <div className="pokemon-displayer__abilities">
          <h3>Abilities</h3>
          <ul>
            {pokemon[0].pokemonAbilities.map((ability, i) => (
              <li key={i}>
                {ability.name.charAt(0).toUpperCase() +
                  ability.name.substring(1)}
                : {ability.shortEffect}
              </li>
            ))}
          </ul>
        </div>
        <div className="pokemon-displayer__types">
          <ul className="typeDisplayerMenu">
            {pokemon[0].pokemonType.map((typePo, i) => (
              <li key={i} className={`pokemonType ${typePo.name}`}>
                {typePo.name.charAt(0).toUpperCase() + typePo.name.substring(1)}
              </li>
            ))}
          </ul>
          {/* <table>
          <thead>
            <tr>
              <th>Damage Multiplier</th>
              <th>Types Atacking</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>4</th>
              <td>{}</td>
            </tr>
            <tr>
              <th>2</th>
              <td>{}</td>
            </tr>
            <tr>
              <th>Neutral</th>
              <td>{}</td>
            </tr>
            <tr>
              <th>1/2</th>
              <td>{}</td>
            </tr>
            <tr>
              <th>1/4</th>
              <td>{}</td>
            </tr>
          </tbody>
        </table> */}
        </div>
        <div className="pokemon-displayer__more-Info">
          <a
            href={`https://www.wikidex.net/wiki/${pokemon[0].name.replace(
              "-",
              " "
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            
          >
            More info
          </a>
        </div>
      </div>
    </main>
  ) : (
    <div>Loading...</div>
  );
}
