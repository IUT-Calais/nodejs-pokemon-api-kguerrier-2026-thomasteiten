import request from 'supertest';
import { app } from '../src';
import { prismaMock } from './vitest.setup';
import {response} from "express";
import prisma from "../src/client";

describe('User API', () => {
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const createdUser = {};

      prismaMock.user.create.mockResolvedValue(createdUser as any)

        const response = await request(app).post('/users').send({
            email : 'test@test.com',
            password : 'test123',
        })

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdUser);
    });
  });

  describe('POST /login', () => {
    it('should login a user and return a token', async () => {
      const user = {};
      const token = 'mockedToken';

        const response = await request(app).post('/login').send({
            email: 'test@test.com',
            password: 'testvraimdp',
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        token,
        message: 'Connexion réussie',
      });
    });
  });
});
