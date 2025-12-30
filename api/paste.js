const connectDB = require("../lib/db");
const Paste = require("../models/Paste");
const { nanoid } = require("nanoid");

module.exports = async (req, res) => {
  await connectDB();

  // CREATE PASTE
  if (req.method === "POST") {
    const { content, expiresIn } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const id = nanoid(8);

    const expiresAt = expiresIn
      ? new Date(Date.now() + expiresIn * 1000)
      : null;

    await Paste.create({
      _id: id,
      content,
      expiresAt,
    });

    return res.status(201).json({
      id,
      url: `${process.env.BASE_URL}/paste/${id}`,
    });
  }

  // GET PASTE
  if (req.method === "GET") {
    const { id } = req.query;

    const paste = await Paste.findById(id);

    if (!paste) {
      return res.status(404).json({ error: "Paste not found" });
    }

    if (paste.expiresAt && paste.expiresAt < new Date()) {
      return res.status(410).json({ error: "Paste expired" });
    }

    paste.views += 1;
    await paste.save();

    return res.json({ content: paste.content });
  }

  res.status(405).json({ error: "Method not allowed" });
};
