const express = require("express");

const MongoClient = require("mongodb").MongoClient;

const app = express();

const bodyParser = require("body-parser");

app.use(express.static("static"));
app.use(bodyParser.json());

const issues = [
  {
    id: 1,
    status: "Open",
    owner: "Ravan",
    created: new Date("2016-08-15"),
    effort: 5,
    completionDate: undefined,
    title: "Error in console when clicking Add"
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    created: new Date("2016-08-16"),
    effort: 14,
    completionDate: new Date("2016-08-30"),
    title: "Missing bottom border on panel"
  }
];

const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Clsed: true
};

const issueFieldType = {
  id: "required",
  status: "required",
  owner: "required",
  effort: "optional",
  created: "required",
  completionDate: "optional",
  title: "required"
};

const keyValue = {
  owner: "Propietario",
  title: "Título"
};

function validateIssue(issue) {
  for (const field in issueFieldType) {
    const type = issueFieldType[field];
    console.log(
      "Campo, Tipo, Valor ==>> %s, %s, %s",
      field,
      type,
      issue[field]
    );
    if (!type) {
      delete issue[field];
    } else if (type === "required" && !issue[field]) {
      return `${keyValue[field]} es requerido.`;
    }
  }
  if (!validIssueStatus[issue.status]) {
    return `${issue.status} no es un valido estado.`;
  }
  return null;
}

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

  newIssue.id = issues.length + 1;
  newIssue.created = new Date();
  if (!newIssue.status) {
    newIssue.status = "New";
  }

  const err = validateIssue(newIssue);
  if (err) {
    res.status(442).json({ message: `Petición invalida: ${err}` });
    return;
  }

  issues.push(newIssue);

  res.json(newIssue);
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
