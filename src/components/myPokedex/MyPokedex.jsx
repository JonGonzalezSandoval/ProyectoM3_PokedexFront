import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Filter from "../filter/Filter";

export default function MyPokedex() {
  const [paginados, setPaginados] = useState(null);
  const [pagina, setPagina] = useState(1);
  const { loginUser, setLoginUser } = useContext(UserContext);

  const navigate = useNavigate();

  function handleFavorite(id, actualWeb) {
    const pokemonId = id;
    const username = loginUser.username;
    let data = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("SavedToken"),
      },
      body: JSON.stringify({ username, pokemonId }),
    };
    fetch(`http://localhost:3000/api/users/updateFavorite`, data)
      .then((res) => res.json())
      .then((res) => {
        getMyPokemonList(actualWeb);
      });
  }

  function getMyPokemonList(enlaceFetch) {
    const username = loginUser.username;
    // console.log(username)
    let data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("SavedToken"),
      },
      body: JSON.stringify({ username }),
    };

    fetch(enlaceFetch, data)
      .then((res) => {
        if (res.status === 401) {
          setLoginUser(null);
          navigate("/login");
          return Promise.reject("Unauthorized");
        }
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        setPaginados(res);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("SavedToken") !== null) {
      fetch("http://localhost:3000/api/auth/profile", {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      })
        .then((res) => {
          if (res.status === 401) {
            setLoginUser(null);
            navigate("/login");
            return;
          }
          return res.json();
        })
        .then((res) => {
          setLoginUser(res);
        });
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    getMyPokemonList(
      "http://localhost:3000/api/users/getUserList?range=30&offset=0"
    );
  }, [loginUser]);

  return (
    <main>
      <div className="my-pokemon-box">
        {paginados !== null ? (
          <>
            <div className="cabeceraCajas">
              <div
                onClick={() => getMyPokemonList(paginados.before)}
                className="arrow"
              >
                <span>&lt;</span>
              </div>
              <div className="boxNumber">
                <span>Box {pagina}</span>
              </div>
              <div
                onClick={() => getMyPokemonList(paginados.after)}
                className="arrow"
              >
                <span>&gt;</span>
              </div>
            </div>
            <div className="card-displayer">
              {paginados.pokemon.map((pokemon) => (
                <div
                  key={pokemon[0].pokemonNumber}
                  className={!pokemon[1] ? "card missing" : "card "}
                >
                  <div
                    onClick={() =>
                      handleFavorite(pokemon[0]._id, paginados.actual)
                    }
                    className="img-container"
                  >
                    <img
                      src="../../../images/pokeball.png"
                      alt="Pokeball image"
                    />
                  </div>
                  <div className="pokemonImg-myPokedex">
                    <Link to={`/pokemon/${pokemon[0].name}`}>
                      <img
                        src={pokemon[0].urlImg}
                        alt={`Imagen del pokemon ${pokemon[0].name}`}
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      {/* <Filter /> */}
    </main>
  );
}
