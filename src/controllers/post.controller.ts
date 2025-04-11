import { PostService } from "../services/post.service";
import { Request, Response } from "express";
import { PostProps } from "../types/post.types";

export class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    public async createPost(req: Request, res: Response): Promise<Response> {
        try {
            const {post, userEmail} = req.body;
            const newPost = await this.postService.createPost(post, userEmail);
            return res.status(201).json(newPost);
        } catch (error) {
            console.error("Error creating post:", error);
            return res.status(500).json({ message: "Error creating post" });
        }
    }

    public async getPostsByUserId(req: Request, res: Response): Promise<Response> {
        try {
            const { userId } = req.params;
            const posts = await this.postService.getPostsByUserId(userId);
            return res.status(200).json(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
            return res.status(500).json({ message: "Error fetching posts" });
        }
    }

    public async getAllPosts(req: Request, res: Response): Promise<Response> {
        try {
            const posts = await this.postService.getAllPosts();
            return res.status(200).json(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
            return res.status(500).json({ message: "Error fetching posts" });
        }
    }
}
