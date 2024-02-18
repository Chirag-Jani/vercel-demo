const express = require("express");
const { json } = require("express");
const { join } = require("path");
const cors = require("cors");
const simpleGit = require("simple-git");
const { generate } = require("./utils.js");
const { getAllFiles } = require("./filereader.js");
const { readdirSync } = require("fs");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(json());

app.post("/deploy", async (req, res) => {
  const { repoURL } = req.body;
  let id = generate();

  await simpleGit().clone(repoURL, `./output/${id}`);

  const files = getAllFiles(join(__dirname, `../output/${id}`));
  console.log(files);

  res.status(200).json({
    succes: true,
    id: id,
    message: "Repository cloned.",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
