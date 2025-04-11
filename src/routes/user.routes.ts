import { UserController } from "../controllers/user.controller";
import { Router } from "express";

const router = Router();
const userController = new UserController();

// Route to create a new user
router.post("/create", async (req, res) => {
    try {
        await userController.createUser(req, res);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Route to get a user by email
router.get("/get-user-email", async (req, res) => {
    try {
        await userController.getUserByEmail(req, res);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
})

// Route to get all users
router.get("/get-all-users", async (req, res) => {
    try {
        await userController.getAllUsers(req, res);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
})

export default router;