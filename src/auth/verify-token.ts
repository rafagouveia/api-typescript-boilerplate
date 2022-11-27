import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

function Auth(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.get("auth-token");
        const env = process.env;

        if (!token) return res.status(401).send({ message: "Access Denied!" });

        const verified = jwt.verify(token, env.JWT_SECRET);
        req.header = verified;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Invalid Token" });
    }
}

export default Auth;
