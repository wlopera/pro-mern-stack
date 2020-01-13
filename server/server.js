const express = require("express");

const MongoClient = require("mongodb").MongoClient;
const Issue = require("./issue.js");

const app = express();

const bodyParser = require("body-parser");

app.use(express.static("static"));
app.use(bodyParser.json());

app.get("/api/issues", (req, res) => {
  db.collection("issues")
    .find()
    .toArray()
    .then((issues) => {
      const metadata = { total_count: issues.length };
      res.json({ _metadata: metadata, records: issues });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: `Eror interno del servidor: ${error}` });
    });
  // const metadata = { total_count: issues.length };
  // app.set("json spaces", 2);
  // console.log("##=> Peticion... /api/issues");
  // res.json({ _metadata: metadata, records: issues });
  //res.set("Content-Type", "application/json");
  //res.send(JSON.stringify({ _metadata: metadata, records: issues }, null, 2));
});

app.post("/api/issues", (req, res) => {
  const newIssue = req.body;
  console.log("##=> newIssue: %O", newIssue);
  newIssue.created = new Date();
  if (!newIssue.status) {
    newIssue.status = "New";
  }

  const err = Issue.validateIssue(newIssue);
  if (err) {
    res.status(442).json({ message: `Petición invalida: ${err}` });
    return;
  }

  db.collection("issues")
    .insertOne(newIssue)
    .then((result) =>
      db
        .collection("issues")
        .find({ _id: result.insertedId })
        .limit(1)
        .next()
    )
    .then((newIssue) => {
      res.json(newIssue);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

let db;
MongoClient.connect("mongodb://localhost:27017/issuetracker", {
  useUnifiedTopology: true
})
  .then((connection) => {
    db = connection.db("issuetracker");
    app.listen(3000, () => console.log("App iniciada en puerto 3000"));
  })
  .catch((error) => {
    console.log("ERROR:", error);
  });
