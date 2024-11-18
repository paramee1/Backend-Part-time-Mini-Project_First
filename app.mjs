import express, { json } from "express";
import connectionPool from "./utils/db.mjs";
import authRouter from "./apps/auth.js";
import dotenv from "dotenv";
import booksRouter from "./apps/books.js";

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use("/auth", authRouter);
app.use("/books", booksRouter);

app.get("/test", (req, res) => {
  return res.json("server API is working");
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
