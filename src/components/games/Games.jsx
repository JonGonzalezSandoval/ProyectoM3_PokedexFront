import { Link } from "react-router-dom";

export default function Games() {
  return (
    <>
      <Link to="/guessPokemon" className="">
        WHO'S THAT POKEMON
      </Link>
      {"   "}|{"   "}
      <Link to="/sudoku" className="">
        SUDOKU
      </Link>
    </>
  );
}
