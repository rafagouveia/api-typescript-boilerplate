import { App } from "./config/app";
import Router from "./app/router";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = new App();
app.run();

//Middlewares
app.routes().use(bodyParser.json(), cors());
app.routes().use(Router);
//bodyParser.urlencoded({ extended: false });

//Routes
const routePath = path.join(__dirname, "routes");

fs.readdirSync(routePath).forEach(async (filename) => {
    let route = path.join(routePath, filename);
    try {
        await import(route);
    } catch (error) {
        console.log(error);
    }
});
