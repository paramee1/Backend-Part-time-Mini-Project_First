import connectionPool from "../utils/db.mjs";

export const validateBook = async (req, res, next) => {
  const bookId = req.params.id;
  const getBook = await connectionPool.query(
    `SELECT * FROM books WHERE book_id = $1`,
    [bookId]
  );

  if (getBook.rows.length === 0) {
    return res.status(404).json({ message: "Book not found" });
  }

  next();
};
