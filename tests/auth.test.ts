import {prismaMock} from "./vitest.setup";
import {vi} from "vitest";
import bcrypt from "bcrypt";
import request from "supertest";
import {app} from "../src";

describe('POST /auth/login', () => {
    it('l\'utilisateur peut se connecter et reçoit un token', async () => {
        prismaMock.user.findUnique.mockResolvedValue({
            id: 1,
            email: 'test@test.com',
            password: 'hashedPassword',
        });

        vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

        const response = await request(app).post('/auth/login').send({
            "email": "test@test.com",
            "password": "test123",
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Connexion réussie!");
        expect(response.body.token).toBeDefined();
        expect(response.body.user).toEqual({
            id: 1,
            email: "test@test.com",
        })
    });

    it('l\'utilisateur reçoit une erreur si ses identifiants sont incorrects', async () => {
        prismaMock.user.findUnique.mockResolvedValue(null);

        vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

        const response = await request(app).post('/auth/login').send({
            "email": "test2@test.com",
            "password": "test123",
        });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Email ou mot de passe incorrect");
    });

    it('une erreur est retournée si le mot de passe est incorrect', async () => {
        prismaMock.user.findUnique.mockResolvedValue({
            id: 1,
            email: 'test@test.com',
            password: 'test123',
        } as any);

        vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

        const response = await request(app).post('/auth/login').send({
            email: 'test@test.com',
            password: 'wrongpassword',
        });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Email ou mot de passe incorrect' });
    });

    it('retourne une erreur si la bdd n\'est pas disponible', async () => {
        prismaMock.user.findUnique.mockRejectedValue(new Error('error'));

        const response = await request(app).post('/auth/login').send({
            "email": "test@test.com",
            "password": "test123",
        });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Erreur serveur!' });
    });
});