import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

export default function MainWeb() {
  const { listaPokemon, setListaPokemon } = useContext(UserContext);
  const { listaHabilidades, setListaHabilidades } = useContext(UserContext);
  const { listaTipos, setListaTipos } = useContext(UserContext);

  const [listaTiposBooleana, setListaTiposBooleana] = useState(null);

  // function crearBooleana(){
  //   let temp = []
  //   listaTipos.map(tipo => {

  //   })
  // }

  // useEffect(() => {
  //   crearBooleana();
  // }, [])

  return (
    <>
      <div>
        {listaTipos !== null ? (
          listaTipos.map((tipo, i) => (
            <div key={tipo._id}>
              <label>
                <input
                  type="checkbox"
                  checked={tipo.checked}
                  // onChange={() => handleCheckboxChange(tipo.id)}
                />
                {tipo.name.charAt(0).toUpperCase() + tipo.name.substring(1)}
              </label>
            </div>
          ))
        ) : (
          <h3>Cargando datos</h3>
        )}
        {listaPokemon !== null ? (
          listaPokemon.map((pokemon) => (
            <div key={pokemon.pokemonNumber}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1)}
            </div>
          ))
        ) : (
          <h3>Cargando datos</h3>
        )}
        {listaHabilidades !== null ? (
          <select name="" id="">
            {listaHabilidades.map((habilidad, i) => (
              <option key={i} value={habilidad._id}>
                {habilidad.name.charAt(0).toUpperCase() +
                  habilidad.name.substring(1)}
              </option>
            ))}
          </select>
        ) : (
          <h3>Cargando datos</h3>
        )}
      </div>
    </>
  );
}
