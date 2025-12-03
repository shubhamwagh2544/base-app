import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { sequelize, testConnection } from "./db.js";
import { initModels } from "./models/index.js";

const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

const PORT = process.env.ENV === 'production' ? 8080 : 3000;

async function start() {
    const models = initModels(sequelize);
    const { User } = models;

    await testConnection();

    // NO sequelize.sync() call because we manage tables manually.
    // await sequelize.sync({ alter: true });

    app.get("/", (req, res) => {
        res.send("API is up and healthy!!!");
    });

    app.post("/users", async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.create({ email, password });
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    });

    app.get("/users/:userId", async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await User.findByPk(userId);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    });

    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({ error: err.message || "Internal server error" });
    });

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

start().catch((err) => {
    console.error("Failed to start app:", err);
    process.exit(1);
});
