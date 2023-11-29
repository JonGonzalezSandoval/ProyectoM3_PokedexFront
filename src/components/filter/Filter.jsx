import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

export default function Filter() {
  const { listaHabilidades, setListaHabilidades } = useContext(UserContext);
  const { listaTipos, setListaTipos } = useContext(UserContext);

  const [sugerencias, setSugerencias] = useState([]);
  const [inputValue, setInputValue] = useState("");

function handleFilter(e){
    
}




  return (
    <div className="filter">
        <div>
          <h3>Busca un pokemon:</h3>
          <input type="text" />
        </div>
      <form onSubmit={handleFilter}>
        <div>
          <h3>Tipos</h3>
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
        </div>
        <div>
          <h3>Habilidades</h3>
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
        <input type="submit" value="Filter"/>
      </form>
    </div>
  );
}
