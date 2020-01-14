"use strict";
const MongoClient = require("mongodb");

function usage() {
  console.log("Usage:");
  console.log("node", "_filename", "<option>");
  console.log("Opciones:");
  console.log("  callbacks -> Uso de paradigma callback");
  console.log("  promises  -> Uso de paradigma promesa");
  console.log("  generator -> Uso de paradigma del generador");
  console.log("  async     -> Uso de módulo asíncrono");
}

if (process.argv.length > 3) {
  console.log("Incorrecto número de argumentos");
  usage();
} else {
  if (process.argv[2] === "callbacks") {
    testWithCallbacks();
  } else if (process.argv[2] === "promises") {
    testWithPromises();
  } else if (process.argv[2] === "generator") {
    testWithGenerator();
  } else if (process.argv[2] === "async") {
    testWithAsync();
  } else {
    console.log("Opción invalida: ", process.argv[2]);
    usage();
  }
}

function testWithCallbacks() {
  MongoClient.connect("mongodb://localhost/playground", function(err, db) {
    db.collection("employees").insertOne(
      { id: 1, name: "A. Callback" },
      function(err, result) {
        console.log("Resultado de la insección: ", result.insertedId);
        db.collection("employees")
          .find({ id: 1 })
          .toArray(function(err, docs) {
            console.log("Resultados encontrados: ", docs);
            db.close();
          });
      }
    );
  });
}

function testWithPromises() {
  let db;
  MongoClient.connect("mongodb://localhost:playground")
    .then((connection) => {
      db = connection;
      return db
        .collection("employees")
        .insertOne({ id: 1, name: "B. Promise" });
    })
    .then((result) => {
      console.log("Resultado de la insección: ", result.insertedId);
      return db
        .collection("employees")
        .find({ id: 1 })
        .toArray();
    })
    .then((docs) => {
      console.log("Resultados encontrados: ", docs);
      db.close();
    })
    .catch((err) => {
      console.error("ERROR: ", err);
    });
}

function testWithGenerator() {
  const co = require("co");
  co(function*() {
    const db = yield MongoClient.connect("mongodb://localhost:playground");

    const result = yield db.collection("employees").insertOne({
      id: 1,
      name: "C Generator"
    });
    console.log("Resultado de la insección: ", result.insertedId);

    const docs = yield db
      .collection("employees")
      .find({ id: 1 })
      .toArray();
    console.log("Resultados encontrados: ", docs);

    db.close();
  }).catch((err) => {
    console.error("ERROR: ", err);
  });
}

function testWithAsync() {
  const async = require("async");
  let db;
  async.watherfall(
    [
      (next) => {
        MongoClient.connect("mongodb://localhost;playground", next);
      },
      (connection, next) => {
        db = connection;
        db.connection("employees").insertOne({ id: 1, name: "D Async" }, next);
      },
      (insertResult, next) => {
        console.log("Resultado de la insección: ", insertResult.insertedId);
        db.connection("employees")
          .find({ id: 1 })
          .toArray(next);
      },
      (docs, next) => {
        console.log("Resultados encontrados: ", docs);
        db.close();
        next(null, "Todos Listo");
      }
    ],
    (err, result) => {
      if (err) {
        console.error("ERROR: ", err);
      } else {
        console.log(result);
      }
    }
  );
}
