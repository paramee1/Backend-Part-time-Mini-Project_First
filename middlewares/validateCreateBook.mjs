export const validateCreateBook = (req, res, next) => {
  const { title, description, user_id } = req.body;

  if (!title || !description || !user_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  next();
};
