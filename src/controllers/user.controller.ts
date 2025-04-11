import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import { UserProps } from "../types/user.types";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const user: UserProps = req.body;
            const newUser = await this.userService.createUser(user);
            return res.status(201).json(newUser);
        } catch (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({ message: "Error creating user" });
        }
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response> {
        try {
            const {email} = req.body;
            const foundUser = await this.userService.getUserByEmail(email);
            if (!foundUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(foundUser);
        } catch (error) {
            console.error("Error finding user:", error);
            return res.status(500).json({ message: "Error finding user" });
        }
    }

    public async getAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.userService.getAllUsers();
    
            return res.status(200).json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({ message: "Error fetching users" });
        }
    }
    
}   