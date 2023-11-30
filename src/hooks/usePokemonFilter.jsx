import { useCallback, useMemo, useState } from "react";
import { searchPokemon } from "../services/pokemons";

export const usePokemonFilter = (selectedTypes, selectedAbilities) => {
  const [pokemon, setPokemon] = useState([]);

  const getPokemon = useCallback(async () => {
    try {
      const allPokemon = await searchPokemon(
        "http://localhost:3000/api/pokemon/paginated"
      );
      setPokemon(allPokemon);
    } catch (error) {}
  }, []);

  const pokemonOrdenado = useMemo(() => {
    let returnearPokemon;
    if (selectedTypes.length > 0 || selectedAbilities !== null) {
      returnearPokemon = pokemon.pokemon.filter((p) => {
        if (
          p.hiddenAbility !== null &&
          p.hiddenAbility._id.toString() === selectedAbilities ||
          p.pokemonAbilities.includes(selectedAbilities) ||
          p.pokemonType.some((tipo) => selectedTypes.includes(tipo.name))
        ) {
          return true;
        }
        return false;
      });
    }else{
        returnearPokemon = pokemon;
    }

    return returnearPokemon
  },[pokemon, selectedTypes, selectedAbilities]);

  return { getPokemon, pokemon:  pokemonOrdenado};
};
