import dotenv from 'dotenv';

dotenv.config();
const routerUrl = process.env.ENVIROMENT === 'DEV' ? 'api/qa/v1': 'api/deploybro/v1' 
export const settings = {
    PORT: process.env.PORT || 3000,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: Number(process.env.DB_PORT) || 5432,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_TYPE: process.env.DB_TYPE,
    ROUTE_URL: routerUrl
};
