import { DataSource } from "typeorm";
import { settings } from "../config/settings";

export const AppDataSource = new DataSource({
    type: settings.DB_TYPE as keyof typeof settings.DB_TYPE,
    host: settings.DB_HOST,
    port: settings.DB_PORT,
    username: settings.DB_USER,
    password: settings.DB_PASSWORD,
    database: settings.DB_NAME,
    synchronize: true,
    logging: true,
    entities: ["./entities/*.ts"],
    subscribers: [],
    migrations: ["./migrations/*.ts"],
})