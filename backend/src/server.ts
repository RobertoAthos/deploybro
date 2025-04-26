import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import 'reflect-metadata'
import { AppDataSource } from './db/dataSource';


const PORT = 3000
const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error) => {
    console.error("Error during Data Source initialization:", error)
})
