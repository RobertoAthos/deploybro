import { userController } from "controllers/userController";
import express from "express";

export const router = express.Router();

const user = new userController();
router.post("/create-user", user.createUser);
