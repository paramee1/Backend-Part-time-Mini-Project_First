import { validateCreateBook } from "../middlewares/validateCreateBook.mjs";
import connectionPool from "../utils/db.mjs";
import { Router } from "express";

const booksRouter = Router();

booksRouter.get("/", async (req, res) => {
  try {
    const getBooks = await connectionPool.query(`SELECT * FROM books`);
    return res.status(200).json({ data: getBooks.rows });
  } catch (error) {
    res.status(500).json({
      message: "Server connection error",
    });
    console.log(`Get books Error: ${error}`);
  }
});

booksRouter.get("/:id", async (req, res) => {
  const bookId = req.params.id;
  const getBook = await connectionPool.query(
    `SELECT * FROM books WHERE book_id = $1`,
    [bookId]
  );

  console.log(getBook);
  return res.status(200).json({ data: getBook.rows });
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
  }
});

booksRouter.delete("/:id", async (req, res) => {
  const bookId = req.params.id;
  await connectionPool.query(`DELETE FROM books WHERE book_id = $1`, [bookId]);

  res.status(200).json({ message: "Book deleted successfully" });
});

booksRouter.put("/:id", async (req, res) => {
  const bookId = req.params.id;
  const { title, description } = req.body;
  await connectionPool.query(
    `UPDATE books SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE book_id = $3`,
    [title, description, bookId]
  );

  res.status(200).json({ message: "Book updated successfully" });
});

export default booksRouter;
