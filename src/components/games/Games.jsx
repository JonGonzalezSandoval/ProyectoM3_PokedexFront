import { Link } from "react-router-dom";

export default function Games() {
  return (
    <main className="main-games">
      <h2>ALL THE GAMES</h2>
      <div className="main-gameBox">
        <Link to="/guessPokemon" className="">
          WHO'S THAT POKEMON
        </Link>
      </div>

      <div className="main-gameBox">
        <Link to="/sudoku" className="">
          SUDOKU
        </Link>
      </div>
    </main>
  );
}
