const express = require("express");

const MongoClient = require("mongodb").MongoClient;

const { ObjectID } = require("mongodb");

const Issue = require("./issue.js");

const app = express();

const bodyParser = require("body-parser");

app.use(express.static("static"));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== "production") {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const config = require("../webpack.config");
  config.entry.app.push(
    "webpack-hot-middleware/client",
    "webpack/hot/only-dev-server"
  );
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  const bundler = webpack(config);
  app.use(webpackDevMiddleware(bundler, { noInfo: true }));
  app.use(webpackHotMiddleware(bundler, { log: console.log }));
}

/**
 * Consulta de incidentes
 */
app.get("/api/issues", (req, res) => {
  console.log("##=> req.query: %O", req.query);
  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }
  if (req.query.effort_lte || req.query.effort_gte) {
    filter.effort = {};
  }
  if (req.query.effort_lte) {
    filter.effort.$lte = parseInt(req.query.effort_lte, 10);
  }
  if (req.query.effort_gte) {
    filter.effort.$gte = parseInt(req.query.effort_gte, 10);
  }

  console.log("##=> filter: %O", filter);
  db.collection("issues")
    .find(filter)
    .toArray()
    .then((issues) => {
      const metadata = { total_count: issues.length };
      res.json({ _metadata: metadata, records: issues });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: `Eror interno del servidor: ${error}` });
    });
});

/**
 * Consulta de un incidente por su ID
 */
app.get("/api/issues/:id", (req, res) => {
  let issueId;
  console.log("##=> Consulta req: %O", req.params.id);
  try {
    issueId = new ObjectID(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalido formato del ID: ${error}` });
    return;
  }
  db.collection("issues")
    .find({ _id: issueId })
    .limit(1)
    .next()
    .then((issue) => {
      if (!issue)
        res
          .status(404)
          .json({ message: `No consigue incidente para el ID: ${issueId}` });
      else res.json(issue);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: `Error interno del servidor: ${error}` });
    });
});

/**
 * Modificar un incidente
 */
app.put("/api/issues/:id", (req, res) => {
  let issueId;
  console.log("##=> Actualizacion req: %O", req.params.id);
  try {
    issueId = new ObjectID(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalido formato del ID: ${error}` });
    return;
  }
  const issue = req.body;
  delete issue._id;
  const err = Issue.validateIssue(issue);
  if (err) {
    res.status(422).json({ message: `Petición invalida: ${err}` });
    return;
  }
  if (
    issue.status === "Fixed" ||
    issue.status === "Verified" ||
    issue.status === "Closed"
  ) {
    issue.completionDate = new Date();
  } else {
    issue.completionDate = "";
  }
  db.collection("issues")
    .update({ _id: issueId }, issue)
    .then(() =>
      db
        .collection("issues")
        .find({ _id: issueId })
        .limit(1)
        .next()
    )
    .then((savedIssue) => {
      res.json(savedIssue);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: `Error interno dle servidor: ${error}` });
    });
});

/**
 * Borrar un incidente
 */
app.delete("/api/issues/:id", (req, res) => {
  let issueId;
  console.log("##=> Borrando req: %O", req.params.id);
  try {
    issueId = new ObjectID(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalido formato dle ID: ${error}` });
    return;
  }
  db.collection("issues")
    .deleteOne({ _id: issueId })
    .then((deleteResult) => {
      if (deleteResult.result.n === 1) res.json({ status: "OK" });
      else res.json({ status: "Advertencia: Objeto no encontrado" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: `Error internal del servidor: ${error}` });
    });
});

/**
 * Agregar un incidente
 */
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
