import { PostController } from "../controllers/post.controller";
import { Router } from "express";

const router = Router();
const postController = new PostController();

// Route to create a new post
router.post("/create", async (req, res) => {
    try {
        await postController.createPost(req, res);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Route to get a post by user ID
router.get("/get-posts/:userId", async (req, res) => {
    try {
        await postController.getPostsByUserId(req, res);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Route to get all posts
router.get("/get-all-posts", async (req, res) => {
    try {
        await postController.getAllPosts(req, res);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

export default router;