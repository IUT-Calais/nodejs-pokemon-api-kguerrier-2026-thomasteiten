import { PrismaClient } from '../src/generated/prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'vitest-mock-extended';
import { vi, beforeEach } from 'vitest';
import prisma from '../src/client';
import {stopServer} from "../src";

vi.mock('../src/client', () => ({
    default: mockDeep<PrismaClient>(),
}));

vi.mock('jsonwebtoken', () => ({
    verify: vi.fn((token: string) => {
        if (token === 'mockedToken') {
            return { userId: 'mockedUserId' };
        }
        throw new Error('Invalid token');
    }),
    sign: vi.fn(() => 'mockedToken'),
}));

vi.mock('bcrypt', () => ({
    compare: vi.fn((password: string) => password === 'truePassword'),
}));

beforeEach(() => {
    mockReset(prismaMock);
    vi.clearAllMocks();
});

afterAll(() => {
    stopServer();
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;