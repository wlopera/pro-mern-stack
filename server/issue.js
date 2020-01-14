"use strict";

const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Clsed: true
};

const issueFieldType = {
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

module.exports = {
  validateIssue: validateIssue
};
