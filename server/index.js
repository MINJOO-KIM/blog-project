const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ArticleModel = require("./models/Articles");

const cors = require("cors");
app.use(cors());

app.use(express.json());

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(
    "mongodb+srv://MINJOO-KIM:hm021819@cluster0.qxn8zdj.mongodb.net/blog?retryWrites=true&w=majority",
    {},
    (error) => {
      if (error) {
        console.log("mongoose error");
      } else {
        console.log("mongodb connect");
      }
    }
  );

  app.get("/getArticles", (req, res) => {
    // res.json(data);
    ArticleModel.find({}, (error, result) => {
      console.log(result);
      if (error) {
        res.json(error);
        console.log("api error");
      } else {
        console.log("api success");
        res.json(result);
      }
    });
  });

  app.post("/createArticle", async (req, res) => {
    const article = req.body;
    const newArticle = new ArticleModel(article);
    await newArticle.save();

    res.json(article);
  });
};

connect();

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY");
});
