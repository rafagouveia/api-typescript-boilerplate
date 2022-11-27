import expressapp, { Express, Router } from "express";
import "reflect-metadata";
var ip = require("ip");
require("dotenv").config();

// to change type of database see this: https://typeorm.io/#installation

export class App {
    private instance: Express;

    constructor() {
        this.instance = expressapp();
    }

    public run(port = 8080) {
        this.instance.listen(port, () => {
            console.log(`Server running at http://${ip.address()}:${port}/`);
        });
    }
    public routes(): Router {
        return this.instance;
    }
}
