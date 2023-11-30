import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { debounce } from "lodash";

export default function WhatPokemon() {
  const { listaPokemon, setListaPokemon } = useContext(UserContext);

  const [chosenPokemon, setChosenPokemon] = useState(null);
  const [typingName, setTypingName] = useState("");
  const [guessed, setGuessed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [endless, setEndless] = useState(false);

  function newChosenPokemon() {
    setChosenPokemon(
      listaPokemon[Math.floor(Math.random() * listaPokemon.length)]
    );
    setGuessed(false);
    setTypingName("");
  }

  function handleReveal(){
    setEndless(false);
    setTypingName(chosenPokemon.name);
    alert("Total streak " + streak);
    setStreak(0);
  }

  function handleEndles(){
    setStreak(0);
    setEndless(!endless);
  }

  useEffect(() => {
    if (listaPokemon !== null) {
      newChosenPokemon();
    }
  }, [listaPokemon]);

  useEffect(() => {
    if (chosenPokemon !== null) {
      const debounceFunction = debounce(newChosenPokemon, 1000);
      if (typingName.toLowerCase() === chosenPokemon.name.toLowerCase()) {
        setGuessed(true);
        setStreak(streak + 1)
        if (endless) {
          debounceFunction();
        }
      }
    }
  }, [typingName, endless]);

  return (
    <main className="wordleGame">
      {chosenPokemon !== null ? (
        <div className="wordleGame-gameBox">
          <div>
            <h2>WHOS THAT POKEMON</h2>
          </div>

          <div className="wordle-imgContainer">
            <img
              src={chosenPokemon.urlImg}
              alt=""
              className={!guessed ? "guessing" : "guessed"}
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              value={typingName}
              onChange={(e) => setTypingName(e.target.value)}
              className="textBox"
            />
            <button onClick={handleEndles}>Keep Playing</button>
            <button onClick={handleReveal}>Reveal the Pokemon!</button>
          </div>
          <div className={guessed ? "mostrar" : "ocultar"}>
            <h2>Correct Answer</h2>
          </div>
          <div className={endless ? "mostrar" : "ocultar"}>
            <h2>Endless Mode Activated. Total Streak: {streak}</h2>
          </div>
        </div>
      ) : (
        <div>Loading a Pokemon</div>
      )}
    </main>
  );
}
