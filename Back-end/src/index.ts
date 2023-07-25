/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import clubsRouter from "./club/clubs.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string);

const app = express();

mongoose
  .connect(String(process.env.CONNECTION_STRING))
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(1022, () => {
      console.log(`Server running on port ${1022}`);
    });
  })
  .catch((error: Error) => {
    console.log("Error connecting to MongoDB", error);
  });

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api", clubsRouter);
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${1032}`);
});
