export const validateCreateBook = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).json({ error: "Invalid title provided" });
  }

  if (!req.body.description) {
    return res.status(400).json({ error: "Invalid description provided" });
  }

  next();
};
