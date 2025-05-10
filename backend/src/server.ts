import express from "express";
import cors from "cors";
import "dotenv/config";
import "reflect-metadata";
import { AppDataSource } from "./db/dataSource";
import { router } from "./routes";
import { settings } from "config/settings";

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(settings.ROUTE_URL, router);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
