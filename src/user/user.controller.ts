import type {Request, Response} from 'express';
import prisma from "../client";

export const getUsers = async (req: Request, res: Response) => {
    const user = await prisma.user.findMany();

    res.status(200).send(user);
}

export const getUser = async (req: Request, res: Response) => {
    const idUser = Number(req.params.id);
    const user = await prisma.user.findUnique({
        where : {
            id: idUser
        }
    });

    res.status(200).send(user);
}

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

export const modifyUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const idUser = Number(req.params.id);
    const user = await prisma.user.update({
        data: {
            email, password
        },
        where: {
            id: idUser,
        }
    })
}