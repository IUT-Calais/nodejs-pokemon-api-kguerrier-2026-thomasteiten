import type { DeepMockProxy } from 'vitest-mock-extended'
import { mockDeep, mockReset } from 'vitest-mock-extended'
import { beforeEach, vi } from 'vitest'
// Import du client mocké
import prisma from '../src/client.js'
import type { PrismaClient } from "../src/generated/prisma/client";
import {stopServer} from "../src";
// Mock du module Prisma
vi.mock('../src/client', () => ({
    default: mockDeep<PrismaClient>(),
}))
// Mock du middleware d'authentification
vi.mock('../src/common/jwt.middleware', () => ({
    verifyJWT: vi.fn((req, res, next) => {
// Simule un utilisateur authentifié
        req.userId = 1
        next()
    }),
}))
// Mock du mot de passe hashé
vi.mock('bcrypt', () => ({
    default: {
        compare: vi.fn(() => true),
    },
}));

process.env.JWT_SECRET = 'test_secret';

// Reset des mocks avant chaque test
beforeEach(() => {
    mockReset(prismaMock)
})

afterAll(() => {
    stopServer();
});

// Export du mock typé
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>