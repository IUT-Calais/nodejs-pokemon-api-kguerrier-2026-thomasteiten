import { Router } from "express";
import {
    getPokemonsCard,
    getPokemonCard,
    createPokemonCard,
    modifyPokemonCard,
    deletePokemonCard, createPokemonCards
} from './pokemonCard.controller'
import {verifyJWT} from "../common/jwt.middleware";

export const pokemonCardRouter = Router();

pokemonCardRouter.get("/", getPokemonsCard);
pokemonCardRouter.get("/:id", getPokemonCard);
pokemonCardRouter.post("/create", createPokemonCard, verifyJWT);
pokemonCardRouter.post("/createMany", createPokemonCards, verifyJWT)
pokemonCardRouter.put("/modify/:id", modifyPokemonCard, verifyJWT);
pokemonCardRouter.delete("/delete/:id", deletePokemonCard, verifyJWT);
