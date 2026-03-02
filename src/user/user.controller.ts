import type {Request, Response} from 'express';
import prisma from "../client";

export const createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    await prisma.user.create({
        data: {
            email: email,
            password: password
        }
    });

    res.status(201).send();
}