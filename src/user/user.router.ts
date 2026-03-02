import { Router } from "express";
import {createUser, getUser} from './user.controller'
import {verifyJWT} from "../common/jwt.middleware";

export const userRouter = Router();

userRouter.get("/:id", verifyJWT, getUser)
userRouter.post("/create", createUser);
