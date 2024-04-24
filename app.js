const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require('cors')
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.use(bodyParser.json({ extended: true ,limit:"10000kb"}));
app.use(express.static(path.join(__dirname + '/public') ));
app.use(cors());

mongoose.connect(
 "mongodb://127.0.0.1:27017/27017?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.3",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const itemsSchema = {
  title: String,
  body: String,
  cardimage: String,
};
// C:\Users\Ayush\Mini-Project\editor\src\components\Form.jsx

const Item = mongoose.model("blogs", itemsSchema);

app.post("/add", async (req, res) => {
  const newItem = new Item({
    title: req.body.title,
    body: req.body.body,
    cardimage: req.body.cardimage,
    text: req.body.text,
  });

  try {
    await newItem.save();
    res.send(req.body);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/", async (req, res) => {
  const posts = await Item.find();
  res.render("Scripts/home2.ejs", { posts }); // Pass the retrieved posts to the view
});

app.get("/newItem/:newItemId", async (req, res) => {
  const requestedPostId = req.params.newItemId;

  const post = await Item.findOne({ _id: requestedPostId });

  if (!post) {
    res.status(404).send("Post not found");
    return;
  }

  res.render("newItem", {
    title: post.title,
    body: post.body,
    cardimage: post.cardimage,
    text: post.text,
  });
});

app.listen(3004, () => {
  console.log("Server started on port 3004");
});