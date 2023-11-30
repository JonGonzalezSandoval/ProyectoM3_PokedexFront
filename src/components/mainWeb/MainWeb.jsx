import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function MainWeb() {
  const { listaPokemon, setListaPokemon } = useContext(UserContext);
  const [randomPokemon, setRandomPokemon] = useState(null);

  function fillRandom(positions) {
    let temp = [];
    for (let i = 0; i < 12; i++) {
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
    <main className="mainHome">
      <div className="home">
        <div className="imgFondoHolder">
          <h2>WELCOME TO OUR HOMEMADE POKEBANK</h2>
        </div>
        <div className="gameDisplay">
          <h2>Did you try our Games?</h2>
          <ul>
            <li>
              <Link to="/guessPokemon">WHO'S THAT POKEMON</Link>
            </li>
            <li>
              <Link to="/sudoku" className="" disabled>
                SUDOKU (Work in progres)
              </Link>
            </li>
          </ul>
        </div>
        <div className="randomDisplay">
          <h2>A random selection of pokemon!</h2>
          <div className="card-displayer">
            {randomPokemon !== null ? (
              randomPokemon.map((pokemon) => (
                <div key={pokemon.pokemonNumber} className="card">
                  <Link to={`/pokemon/${pokemon.name}`}>
                    <div className="imgCard">
                      <img
                        src={pokemon.urlImg}
                        alt={`Imagen del pokemon ${pokemon.name}`}
                      />
                    </div>
                    <span>Nº {pokemon.pokemonNumber}</span>
                    <h4>
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.substring(1)}
                    </h4>
                    <ul className="typeDisplayerMenu">
                      {pokemon.pokemonType.map((tipo, i) => (
                        <li key={i} className={`pokemonType ${tipo.name}`}>
                          {tipo.name.charAt(0).toUpperCase() +
                            tipo.name.substring(1)}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </div>
              ))
            ) : (
              <h3>Cargando datos</h3>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
