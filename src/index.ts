import express from 'express';
import { pokemonCardRouter } from "./pokemonCard/pokemonCard.router";
import { userRouter } from "./user/user.router";
import { authRouter } from "./common/auth.router";

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

export const server = app.listen(process.env.NODE_ENV === 'test' ? 0 : port);
//Si l'on lance un test le serveur se lancera sur un port disponible.

app.use("/pokemons", pokemonCardRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

export function stopServer() {
  server.close();
}
