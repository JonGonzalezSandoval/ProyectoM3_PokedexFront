import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

export default function WhatPokemon() {
  const { listaPokemon, setListaPokemon } = useContext(UserContext);

  const [chosenPokemon, setChosenPokemon] = useState(null);

  useEffect(() => {
    if (listaPokemon !== null) {
      setChosenPokemon(
        listaPokemon[Math.floor(Math.random() * listaPokemon.length)]
      );
      console.log(chosenPokemon)
    }
  }, [listaPokemon]);

  return (
    <>
      {chosenPokemon !== null ? (
        <div>
          <div>WHOS THAT POKEMON</div>
          <div>
            <img src={chosenPokemon.urlImg} alt="" className="img-game"/>
          </div>
          <div>
            <input
              type="text"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
          </div>
        </div>
      ) : (
        <div>Loading a Pokemon</div>
      )}
    </>
  );
}
