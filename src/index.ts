import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import PostRoutes from "./routes/post.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", PostRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the User Management API!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});