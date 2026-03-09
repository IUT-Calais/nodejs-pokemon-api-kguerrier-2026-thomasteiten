import request from 'supertest';
import { app } from '../src';
import { prismaMock } from './vitest.setup.js';
import bcrypt from "bcrypt";
import { vi } from 'vitest';

describe('User API', () => {
  describe('POST /users/create', () => {
    it('créer un nouvel utilisateur', async () => {
      const createdUser = {};

      prismaMock.user.create.mockResolvedValue(createdUser as any)

        const response = await request(app).post('/users/create').send({
            "email": "test@test.com",
            "password": "test123",
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdUser);
    });
  });

    describe('GET /users', () => {
        it('retourne la liste des utilisateurs', async () => {

            const mockedUsersArray = [
                { id: 1, email: 'test@gmail.com', password: 'test1' },
                { id: 2, email: 'test2@gmail.com', password: 'test2' },
            ];

            prismaMock.user.findMany.mockResolvedValue(mockedUsersArray);

            const response = await request(app).get('/users');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockedUsersArray);
        });
    });

    describe('GET /user/:id', () => {
        it('retourne un utilisateur en particulier', async () => {
            prismaMock.user.findUnique.mockResolvedValue({
                id: 1,
                email: 'test@gmail.com',
                password: 'test1',
            });

            const response = await request(app).get('/users/:id')
            expect(response.body).toEqual({
                id: 1,
                email: 'test@gmail.com',
                password: 'test1',
            });
        });
    });
});
