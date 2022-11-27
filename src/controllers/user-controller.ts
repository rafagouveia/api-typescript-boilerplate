import { Request, Response } from "express";
import { Users as User } from "../models/user-model";
import manager from "../config/manager";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const env = process.env;

class UserController {
    public async getAllUsers(req: Request, res: Response) {
        try {
            const users = await manager.find(User, {
                select: {
                    id: true,
                    username: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    age: true,
                },
            });
            return res.status(200).send(users);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    public async getById(req: Request, response: Response) {
        try {
            const userFound = await manager.findOne(User, {
                select: {
                    id: true,
                    username: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    age: true,
                },
                where: {
                    id: req.params.id,
                },
            });

            if (!userFound) return response.status(404).send("User not found!");

            return response.status(200).send(userFound);
        } catch (err) {
            return response.status(500).send(err);
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const user = await manager.findOne(User, {
                select: {
                    id: true,
                    username: true,
                    email: true,
                    password: true,
                },
                where: [
                    { username: req.body.username },
                    { email: req.body.email },
                ],
            });

            if (!user)
                return res
                    .status(400)
                    .send({ message: "email or username incorrect" });

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!validPassword)
                return res.status(400).send({ message: "Incorrect password" });

            const token = jwt.sign(
                { _id: user.id },
                String(process.env.JWT_SECRET),
                { expiresIn: 300 }
            );

            res.header("auth-token", token).send({
                message: "successfully logged in",
                token: token,
            });
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    public async register(req: Request, res: Response) {
        try {
            const userExist = await manager.findOne(User, {
                where: [
                    { username: req.body.firstName },
                    { email: req.body.email },
                ],
            });

            if (userExist)
                return res.status(200).send({
                    message: "User with username or email already exists",
                });

            //Create user
            const user = new User();
            user.username = req.body.username;
            user.email = req.body.email;

            //Password encrypt
            const salt = await bcrypt.genSalt(10);
            const hashedPwd = await bcrypt.hash(req.body.password, salt);

            user.password = hashedPwd;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.age = req.body.age;
            user.createdAt = new Date();
            user.updatedAt = new Date();
            user.active = true;
            await manager.save(user);

            //this line is to select and exclude any columns unnecessary
            const userCreated = await manager.findOne(User, {
                where: { id: user.id },
            });

            return res.status(200).send({
                message: "User created successful!",
                data: userCreated,
            });
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

export default UserController;
