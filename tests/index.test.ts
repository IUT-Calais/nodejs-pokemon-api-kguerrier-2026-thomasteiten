import { server, stopServer } from '../src';

describe('Server', () => {
    it('le serveur démarre', () => {
        expect(server).toBeDefined();
        expect(server.listening).toBe(true);
    });

    it('le serveur s\'arrête', () => {
        stopServer();
        expect(server.listening).toBe(false);
    });
});