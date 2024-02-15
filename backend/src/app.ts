import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "Jay shree Ram Jay Hanuman" });
});

// import routes
app.use("/api/v1/user", userRouter);

export { app };
