import express from "express";
import { getPasswordPolicy } from "../controllers/passwordPolicyController.js";

const router = express.Router();

router.get("/", getPasswordPolicy);

export default router;
