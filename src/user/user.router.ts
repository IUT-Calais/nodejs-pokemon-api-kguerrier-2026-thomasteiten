import { Router } from "express";
import {createUser, getUser, getUsers} from './user.controller'
import {verifyJWT} from "../common/jwt.middleware";

export const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", verifyJWT, getUser);
userRouter.post("/create", createUser);
