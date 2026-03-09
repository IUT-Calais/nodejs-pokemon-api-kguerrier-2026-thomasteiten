import {prismaMock} from "./vitest.setup";
import {vi} from "vitest";
import request from "supertest";
import {app} from "../src";
import {response} from "express";

describe('PokemonCard API', () => {
  describe('GET /pokemons', () => {
    it('retourne les cartes pokémons que l\'on a en base', async () => {
      const mockPokemonCards = [
          {
              "id": 1,
              "name": "Salamèche",
              "pokedexId": 4,
              "typeId": 56,
              "lifePoints": 39,
              "size": 0.6,
              "weight": 8.5,
              "imageUrl": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
          }
      ];

      prismaMock.pokemonCard.findMany.mockResolvedValue(mockPokemonCards);

      const response = await request(app).get('/pokemons')
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPokemonCards);
    });
  });

  describe('GET /pokemons/:id', () => {
    it('retrouve un pokemon avec son \'id\'', async () => {
        prismaMock.pokemonCard.findUnique.mockResolvedValue(
            {
            "id": 1,
            "name": "Salamèche",
            "pokedexId": 4,
            "typeId": 56,
            "lifePoints": 39,
            "size": 0.6,
            "weight": 8.5,
            "imageUrl": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
            }
        );

      const response = await request(app).get('/pokemons/:id')
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
          "id": 1,
          "name": "Salamèche",
          "pokedexId": 4,
          "typeId": 56,
          "lifePoints": 39,
          "size": 0.6,
          "weight": 8.5,
          "imageUrl": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
      });
    });

    it('retourne une erreur 404 si rien n\'est trouvé', async () => {
      prismaMock.pokemonCard.findUnique.mockResolvedValue(null);

      const response = await request(app).get('/pokemons/:id');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'PokemonCard non trouvée!' });
    });
  });

  describe('POST /pokemonCard', () => {
    it('Créer une pokemonCard', async () => {
      const createdPokemonCard = {};

      prismaMock.pokemonCard.create(createdPokemonCard as any);

      const response = await request(app).post('/pokemons/create').send({
          "id": 1,
          "name": "Salamèche",
          "pokedexId": 4,
          "typeId": 56,
          "lifePoints": 39,
          "size": 0.6,
          "weight": 8.5,
          "imageUrl": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
      })
      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdPokemonCard);
    });
  });

    describe('POST /pokemons/createMany', () => {
        it('Créer plusieurs pokemonsCard en même temps', async () => {
            const newPokemonCards = [
                {
                    id: 1,
                    name: 'Salamèche',
                    pokedexId: 4,
                    typeId: 56,
                    lifePoints: 39,
                    size: 0.6,
                    weight: 8.5,
                    imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
                },
                {
                    id: 2,
                    name: 'Bulbizarre',
                    pokedexId: 1,
                    typeId: 12,
                    lifePoints: 45,
                    size: 0.7,
                    weight: 6.9,
                    imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                },
            ];

            prismaMock.pokemonCard.createMany.mockResolvedValue(newPokemonCards as any);

            const response = await request(app).post('/pokemons/createMany').send(newPokemonCards);

            expect(response.status).toBe(201);
            expect(response.text).toBe('Création réussie !');
        });
    });

  describe('PUT /pokemons/modify', () => {
      it('modifier une pokemonCard', async () => {
          const updatedPokemonCard = {
              id: 2,
              name: 'Salamèche',
              pokedexId: 4,
              typeId: 56,
              lifePoints: 39,
              size: 0.6,
              weight: 8.5,
              imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
          };

          prismaMock.pokemonCard.update.mockResolvedValue(updatedPokemonCard as any);

          const response = await request(app).put('/pokemons/modify/:id').send(updatedPokemonCard);

          expect(response.status).toBe(200);
          expect(response.body).toEqual(updatedPokemonCard);
      });
  });

    describe('DELETE /pokemons/delete/:id', () => {
        it('supprimer une pokemonCard', async () => {
            prismaMock.pokemonCard.delete.mockResolvedValue({ id: 2 } as any);

            const response = await request(app).delete('/pokemons/delete/:id');

            expect(response.status).toBe(204);
            expect(response.body).toEqual({});
        });
    });
});
