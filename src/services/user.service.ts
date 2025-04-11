import { PrismaClient, User } from "@prisma/client";
import { UserProps } from "../types/user.types";

// PrismaClient is an instance of the Prisma Client that allows us to interact with the database
const prisma = new PrismaClient();

// A class called UserService that contains methods for creating and searching users
export class UserService {
    async createUser(user: UserProps): Promise<User> {
        try {
            // Check if user was passed in the request
            if (user) {
                // Create a new user in the database using Prisma Client
                const new_user = await prisma.user.create({
                    data: {
                        ...user,
                        posts: {
                            create: user.posts?.map(post => ({
                                title: post.title,
                                content: post.content,
                            }))
                        }
                    }
                })
        
                // Return the new created user
                return new_user;
            } else {
                // If no user was passed in the request, throw an error
                throw new Error("User data is required");
            }
        } catch (error) {
            // If an error occurs, log the error and throw a new error
            console.error("Error creating user:", error);
            throw new Error("Error creating user");
        }
    }

    // Method to find a user by their email address
    async getUserByEmail(email: string): Promise<User | null> {
        try {
            // Check if email was passed in the request
            if (email) {
                // Find a user in the database using Prisma Client
                const found_user = await prisma.user.findUnique({
                    where: {email}
                })

                // If no user was found, throw an error
                if(!found_user) {
                    throw new Error("User not found");
                }

                // Return the found user
                return found_user;

            } else {
                throw new Error("Email is required to find user");
            }
        } catch (error) {
            console.error("Error finding user:", error);
            throw new Error("Error finding user");
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            // Get all users from the database using Prisma Client
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new Error("Error fetching users");
        }
    }
}
