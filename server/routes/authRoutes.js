import express from "express";
import { saveUser } from "../controllers/Authcontroller.js";

const router = express.Router();

router.post("/users", saveUser);

export default router;   // ✅ default export
