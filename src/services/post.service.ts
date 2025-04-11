import { PrismaClient, Post } from "@prisma/client";
import { PostProps } from "../types/post.types";

import { UserService } from "./user.service";

const prisma = new PrismaClient();
const userService = new UserService();

export class PostService {
    async createPost(post: PostProps, userEmail: string): Promise<Post> {
        try {
            if (post) {
                const user = await userService.getUserByEmail(userEmail);
                if (!user) {
                    throw new Error("User not found");
                }

                const new_post = await prisma.post.create({
                    data: {
                        ...post,
                        userId: user.id
                    }
                })
                return new_post;
            } else {
                throw new Error("Post data is required");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            throw new Error("Error creating post");
        }
    }

    async getPostsByUserId(userId: string): Promise<Post[]> {
        console.log("userId", userId);
        try {
            if (userId) {
                const posts = await prisma.post.findMany({
                    where: { userId }
                })
                return posts;
            } else {
                throw new Error("User ID is required to find posts");
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw new Error("Error fetching posts");
        }
    }

    async getAllPosts(): Promise<Post[]> {
        try {
            const posts = await prisma.post.findMany();
            return posts;
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw new Error("Error fetching posts");
        }
    }
}