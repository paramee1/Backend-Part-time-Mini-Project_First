import { validateCreateBook } from "../middlewares/validateCreateBook.mjs";
import { validateBook } from "../middlewares/validateBook.mjs";
import connectionPool from "../utils/db.mjs";
import { Router } from "express";

const booksRouter = Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: เรียกดูข้อมูลของ Book ทั้งหมด
 *     description: เรียกดูข้อมูลของ Book ทั้งหมด
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       book_id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "NameBook"
 *                       description:
 *                         type: string
 *                         example: "Morbi non quam nec dui luctus rutrum. Nulla tellus."
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-17T03:13:29.590Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-17T03:13:29.590Z"
 *                       user_id:
 *                         type: integer
 *                         example: 1
 *       404:
 *         description: No books found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No books found"
 *       500:
 *         description: Server connection error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server connection error"
 */

/**
 * @swagger
 * /books/{bookId}:
 *   get:
 *     summary: เรียกดูข้อมูลของ Book แต่ละอันได้ด้วย Id
 *     description: เรียกดูข้อมูลของ Book แต่ละอันได้ด้วย Id
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the book to retrieve.
 *     responses:
 *       200:
 *         description: A single book object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       book_id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "NameBook"
 *                       description:
 *                         type: string
 *                         example: "Morbi non quam nec dui luctus rutrum. Nulla tellus."
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-17T03:13:29.590Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-17T03:13:29.590Z"
 *                       user_id:
 *                         type: integer
 *                         example: 1
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 *       500:
 *         description: Server connection error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server connection error"
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: สร้าง new book
 *     description: เพิ่มข้อมูล Book เข้า Database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Name Book"
 *               description:
 *                 type: string
 *                 example: "Morbi non quam nec dui luctus rutrum. Nulla tellus."
 *               user_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Book created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book created successfully"
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
 *       500:
 *         description: Server could not create the book due to a database error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server could not create because database connection"
 */

/**
 * @swagger
 * /books/{bookId}:
 *   delete:
 *     summary: ลบข้อมูล book
 *     description: ลบข้อมูล Book โดยใช้ ID
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the book to delete.
 *     responses:
 *       200:
 *         description: Book deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book deleted successfully"
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 *       500:
 *         description: Server connection error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server connection error"
 */

/**
 * @swagger
 * /books/{bookId}:
 *   put:
 *     summary: แก้ไข book
 *     description: Update ข้อมูล Book โดยใช้ ID
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the book to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Book Title"
 *               description:
 *                 type: string
 *                 example: "Updated book description."
 *     responses:
 *       200:
 *         description: Book updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book updated successfully"
 *       400:
 *         description: No fields to update.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No fields to update"
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 *       500:
 *         description: Server connection error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server connection error"
 */

booksRouter.get("/", async (req, res) => {
  try {
    const getBooks = await connectionPool.query(`SELECT * FROM books`);
    if (getBooks.rows.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    return res.status(200).json({ data: getBooks.rows });
  } catch (error) {
    res.status(500).json({
      message: "Server connection error",
    });
    console.log(`Get books Error: ${error}`);
  }
});

booksRouter.get("/:id", validateBook, async (req, res) => {
  const bookId = req.params.id;
  try {
    const getBook = await connectionPool.query(
      `SELECT * FROM books WHERE book_id = $1`,
      [bookId]
    );
    return res.status(200).json({ data: getBook.rows });
  } catch (error) {
    res.status(500).json({
      message: "Server connection error",
    });
    console.log(`Get books Error: ${error}`);
  }
});

booksRouter.post("/", validateCreateBook, async (req, res) => {
  const { title, description, user_id } = req.body;

  try {
    await connectionPool.query(
      `INSERT INTO books (title, description, user_id) VALUES ($1, $2, $3)`,
      [title, description, user_id] //user_id สมมุติ จาก login
    );

    res.status(200).json({ message: "Book created successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server could not create because database connection",
    });
    console.log(`Create book Error: ${error}`);
  }
});

booksRouter.delete("/:id", validateBook, async (req, res) => {
  const bookId = req.params.id;
  try {
    await connectionPool.query(`DELETE FROM books WHERE book_id = $1`, [
      bookId,
    ]);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server connection error",
    });
    console.log(`Delete book Error: ${error}`);
  }
});

booksRouter.put("/:id", validateBook, async (req, res) => {
  const bookId = req.params.id;
  const { title, description } = req.body;
  try {
    if (!title && !description) {
      return res.status(400).json({ message: "No fields to update" });
    }

    await connectionPool.query(
      `UPDATE books SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE book_id = $3`,
      [title, description, bookId]
    );

    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server connection error",
    });
    console.log(`Update book Error: ${error}`);
  }
});

export default booksRouter;
