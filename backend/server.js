import express from "express"
import RegisterRouter from "./src/api/routes/auth.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import CheckAuthRouter from "./src/api/routes/checkAuth.route.js";
import { connectRedis } from "./src/connections/redis.connection.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use("/api", CheckAuthRouter);
app.use("/api", RegisterRouter);

app.get("/", (req, res) => {
    res.send("everything going good mf")
})

const startServer = async () => {
    try {

        await connectRedis();
        console.log("✅ Redis is connected and ready.");
        app.listen(5000, () => {
            console.log("🚀 Server is running on port 5000 with Redis active");
        });
    } catch (error) {
        console.error("❌ Failed to connect to Redis, server not started:", error);
        process.exit(1); 
    }
};

startServer();
