import { App } from "./config/app";
import Router from './app/router';
import fs from 'fs';
import path from "path";

const app = new App();
app.run();
app.routes().use(Router);

const routePath = path.join(__dirname, 'routes');

fs.readdirSync(routePath).forEach(async (filename) => {
    let route = path.join(routePath, filename);
    try {
         await import(route);
    } catch (error) {
        console.log(error);
    }
});