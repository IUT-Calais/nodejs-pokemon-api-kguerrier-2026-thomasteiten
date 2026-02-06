import type {Request, Response} from 'express';
import prisma from "../client";

export const getPokemonsCard = async (req: Request, res: Response) => {
    const pokemonsCard = await prisma.pokemonCard.findMany();

    res.status(200).send(pokemonsCard);
}

export const getPokemonCard = async (req: Request, res: Response) => {
    const idPokemon = Number(req.params.id)
    const pokemonsCard = await prisma.pokemonCard.findUnique({
        where: {
            id: idPokemon
        }
    });

    res.status(200).send(pokemonsCard);
}

export const createPokemonCard = async (req: Request, res: Response) => {
    const { name, pokedexId, typeId, lifePoints, size, weight, imageUrl } = req.body;
    await prisma.pokemonCard.create({
        data: {
            name, pokedexId, typeId, lifePoints, size, weight, imageUrl
        }
    });

    res.status(201).send();
}

export const modifyPokemonCard = async (req: Request, res: Response) => {
    const idPokemon = Number(req.params.id);
    const { name, pokedexId, typeId, lifePoints, size, weight, imageUrl } = req.body;
    const modifyPokemonCard = await prisma.pokemonCard.update({
        data: {
            name, pokedexId, typeId, lifePoints, size, weight, imageUrl
        },
        where: {
            id: idPokemon
        }
    });

    res.status(200).json(modifyPokemonCard);
}

export const deletePokemonCard = async (req: Request, res: Response) => {
    const idPokemon = Number(req.params.id);
    await prisma.pokemonCard.delete({
        where: {
            id: idPokemon
        }
    });

    res.status(204).send();
}


