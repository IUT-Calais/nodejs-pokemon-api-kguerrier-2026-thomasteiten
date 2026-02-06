import { Router } from "express";
import {
    getPokemonsCard,
    getPokemonCard,
    createPokemonCard,
    modifyPokemonCard,
    deletePokemonCard
} from './pokemonCard.controller'

export const pokemonCardRouter = Router();

pokemonCardRouter.get("/", getPokemonsCard);
pokemonCardRouter.get("/:id", getPokemonCard);
pokemonCardRouter.post("/create/", createPokemonCard);
pokemonCardRouter.put("/modify/:id", modifyPokemonCard);
pokemonCardRouter.delete("/delete/:id", deletePokemonCard);
