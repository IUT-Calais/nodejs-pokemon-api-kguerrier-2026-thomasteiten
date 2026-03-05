import { defineConfig } from "vitest/config";
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    test: {
        globals: true,
        environment: 'node',
        setupFiles: ['./tests/vitest.setup.ts'],
        coverage: {
            provider: 'istanbul',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'dist/',
                '**/*.config.ts',
                '**/*.test.ts',
                '**/*.spec.ts',
            ],
        },
    },
})