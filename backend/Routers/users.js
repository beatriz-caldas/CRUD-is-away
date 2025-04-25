import express from "express";
import { addUser, deleteUser, getUsers, updateUser, getUserById } from "../Controllers/users.js";

const router = express.Router();

router.get("/",getUsers);
router.get("/:id", getUserById);
router.post("/",addUser);
router.delete("/:id",deleteUser);
router.put("/:id",updateUser);


export default router;


