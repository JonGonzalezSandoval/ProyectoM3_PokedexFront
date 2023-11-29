import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { debounce } from "lodash";

export default function WhatPokemon() {
  const { listaPokemon, setListaPokemon } = useContext(UserContext);

  const [chosenPokemon, setChosenPokemon] = useState(null);
  const [typingName, setTypingName] = useState("");
  const [guessed, setGuessed] = useState(false);
  const [streak, setStreak] = useState(0)
  const [endless, setEndless] = useState(false)

  function newChosenPokemon(){
    setChosenPokemon(
      listaPokemon[Math.floor(Math.random() * listaPokemon.length)]
    );
    setGuessed(false);
    setTypingName("");
  }

  useEffect(() => {
    if (listaPokemon !== null) {
      newChosenPokemon()
    }
  }, [listaPokemon]);

  useEffect(() => {
    if (chosenPokemon !== null) {
      const debounceFunction = debounce(newChosenPokemon, 1000);
      if (typingName.toLowerCase() === chosenPokemon.name.toLowerCase()) {
        setGuessed(true);
        console.log("acertado")
        if(endless){ 
          debounceFunction();
        }
      }
    }
  }, [typingName]);


  return (
    <>
      {chosenPokemon !== null ? (
        <div>
          <div>WHOS THAT POKEMON</div>
          <div>
            <div></div>
            <div >
            <img src={chosenPokemon.urlImg} alt="" className={!guessed?"guessing":"guessed"} />
            </div>
          </div>
          <div>
            <input
              type="text"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              value={typingName}
              onChange={(e) => setTypingName(e.target.value)}
            />
          </div>
          <div className={guessed?"mostrar":"ocultar"}>
            <h2>ACERTADO</h2>
          </div>
          <button onClick={() => setEndless(!endless)}>Endless Mode</button>
          <div className={endless?"mostrar":"ocultar"}>
            <h2>Endless Mode Activated</h2>
          </div>
        </div>
      ) : (
        <div>Loading a Pokemon</div>
      )}
    </>
  );
}
