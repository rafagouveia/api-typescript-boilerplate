import { DataSource } from "typeorm";
import { Users } from "../models/user-model";

const env = process.env;

//edit this infos in env file
const AppDataSource = new DataSource({
    type: "mariadb", //type of db
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DEFAULT_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Users],
    subscribers: [],
    migrations: [],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Database started successful!");
    })
    .catch((error) => console.log(error));

export { AppDataSource };
