import express, { json } from "express";
import authRouter from "./apps/auth.js";
import dotenv from "dotenv";
import booksRouter from "./apps/books.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", authRouter);
app.use("/books", booksRouter);

app.get("/test", (req, res) => {
  return res.json("server API is working");
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
  console.log("Server is running on http://localhost:4000");
  console.log("API Docs available at http://localhost:4000/api-docs");
});
