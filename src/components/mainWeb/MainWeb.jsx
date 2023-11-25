import { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function MainWeb() {

    const {listaPokemon, setListaPokemon} = useContext(UserContext)


  return (
    <>
      <div>
        {listaPokemon !== null ? (
          listaPokemon.map((pokemon) => (
            <div key={pokemon.pokemonNumber}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1)}
            </div>
          ))
        ) : (
          <h3>Cargando datos</h3>
        )}
      </div>
    </>
  );
}
