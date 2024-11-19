import connectionPool from "../utils/db.mjs";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: ระบบสมัครสมาชิก
 *     description: ระบบสมัครสมาชิก
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "test1"
 *               password:
 *                 type: string
 *                 example: "test1"
 *               firstName:
 *                 type: string
 *                 example: "testest"
 *               lastName:
 *                 type: string
 *                 example: "tsetsetsetset"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *       400:
 *         description: Missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required fields"
 *       404:
 *         description: Username already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Username already exists"
 *       500:
 *         description: Failed to register user due to server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to register user"
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: ระบบล็อกอิน
 *     description: ระบบล็อกอิน
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "test1"
 *               password:
 *                 type: string
 *                 example: "test1"
 *     responses:
 *       200:
 *         description: Login successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successfully"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Username and password are required"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       401:
 *         description: Invalid username or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid username or password"
 *       500:
 *         description: Failed to authenticate due to server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server connection error"
 */

authRouter.post("/register", async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  if (!username || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const userCheck = await connectionPool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    if (userCheck.rows.length > 0) {
      return res.status(404).json({ message: "Username already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await connectionPool.query(
      `INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4)`,
      [user.username, user.password, user.firstName, user.lastName]
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to register user" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  try {
    const user = await connectionPool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "user not found" });
    }

    const isPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!isPassword) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.rows[0].user_id,
        firstName: user.rows[0].firstName,
        lastName: user.rows[0].lastName,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "900000",
      }
    );

    return res.status(200).json({
      message: "login successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server connection error",
    });
    console.log(`Login Error: ${error}`);
  }
});

export default authRouter;
