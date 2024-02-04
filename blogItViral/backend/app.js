require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authroutes");

const cors = require("cors"); // Import the cors middleware

const PORT = process.env.PORT;

const bodyParser = require("body-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//using cors
const corsOptions = {
  origin: "http://localhost:3001", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

// -------------------------------connecting-db, schema, model-----------------------------------------------------

mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => console.log("Server is Connected!"))
  .catch((error) => console.error("MongoDB connection error:", error));

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date,
});

const BlogModel = mongoose.model("Blog", BlogPost);

// --------------------------------routes---------------------------------------------

app.get('*', checkUser);

app.post("/create-blog", async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res
      .status(400)
      .json({ error: "Please provide both title and body for the blog post." });
  }

  try {
    const newPost = await BlogModel.create({
      title,
      body,
      date: new Date(),
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all blog posts
app.get("/", async (req, res) => {
  try {
    const allPosts = await BlogModel.find();
    //console.log("All Posts:", allPosts);
    res.json(allPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific blog post by ID
app.get("/blog-page/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await BlogModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error fetching blog post by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a blog post by ID
app.put("/edit-blog/:id", async (req, res) => {
  const postId = req.params.id;
  const { title, body } = req.body;

  if (!title || !body) {
    return res
      .status(400)
      .json({ error: "Please provide both title and body for the blog post." });
  }

  try {
    const updatedPost = await BlogModel.findByIdAndUpdate(
      postId,
      { title, body },
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating blog post by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a blog post by ID
app.delete("/delete-blog/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedPost = await BlogModel.findById(postId).deleteOne();

    if (!deletedPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json(deletedPost);
  } catch (error) {
    console.error("Error deleting blog post by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ------------------------------user routes--------------------------------------------------
app.use(authRoutes);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
