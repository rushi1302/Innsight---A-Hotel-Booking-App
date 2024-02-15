import { app } from "./app";
import cors from "cors";
import connectDB from "./db";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error: ", error);
    });
    app.listen(process.env.PORT || 7000, () => {
      console.log(`App is listening on `, process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection Failed", error);
  });
