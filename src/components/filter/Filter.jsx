import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { usePokemonFilter } from "../../hooks/usePokemonFilter";

export default function Filter() {
  const { listaHabilidades, setListaHabilidades, listaTipos, setListaTipos, setListaPokemon } = useContext(UserContext);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAbilities, setSelectedAbilities] = useState(null);

  const { getPokemon, pokemon } = usePokemonFilter(selectedTypes, selectedAbilities);

  const [sugerencias, setSugerencias] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    // Update the selectedTypes array based on checkbox changes
    if (checked) {
      setSelectedTypes((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedTypes((prevSelected) =>
        prevSelected.filter((tipo) => tipo !== value)
      );
    }
  };

  const handleSelectChange = (e) => {
    setSelectedAbilities(e.target.value);
  };

  function handleFilter(e) {
    e.preventDefault();

    console.log(
      "Selected types:",
      selectedTypes,
      "Selected ability:",
      selectedAbilities
    );
    console.log(pokemon)
    setListaPokemon(pokemon);
  }

  useEffect(() => {
    getPokemon();
  },[])

  return (
    <div className="filter">
      {/* <div>
        <h3>Busca un pokemon:</h3>
        <input type="text" />
      </div> */}
      <form onSubmit={handleFilter}>
        <div>
          <h3>Tipos</h3>
          {listaTipos !== null ? (
            listaTipos.map((tipo, i) => (
              <div key={tipo._id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(tipo.name)?true:false}
                    name="tipo"
                    value={tipo.name}
                    onChange={handleCheckboxChange}
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
            <select name="" id="" onChange={handleSelectChange}>
              <option value="none">Select Hability</option>
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
        <input type="submit" value="Filter" />
      </form>
    </div>
  );
}
