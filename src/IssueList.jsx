import React from "react";

import IssueAdd from "./IssueAdd.jsx";
import IssueFilter from "./IssueFilter.jsx";

import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const IssueRow = (props) => (
  <tr>
    <td>
      <Link to={`/issues/${props.issue._id}`}>
        {props.issue._id.substr(-4)}
      </Link>
    </td>
    <td>{props.issue.status}</td>
    <td>{props.issue.owner}</td>
    <td>{props.issue.created.toDateString()}</td>
    <td>{props.issue.effort}</td>
    <td>
      {props.issue.completionDate
        ? props.issue.completionDate.toDateString()
        : ""}
    </td>
    <td>{props.issue.title}</td>
  </tr>
);

function IssueTable(props) {
  const issueRows = props.issues.map((issue) => (
    <IssueRow key={issue._id} issue={issue} />
  ));

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Estado</th>
          <th>Propietario</th>
          <th>Fecha de creación</th>
          <th>Esfuero</th>
          <th>Fecha de finalización</th>
          <th>Título</th>
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
    </table>
  );
}

export default class IssueList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      status: ""
    };

    this.createIssue = this.createIssue.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  setFilter(query) {
    console.log("##=> Query-filter: %O", query);
    this.props.location.search = "";
    if (query.status) {
      this.props.location.search = "?status=" + query.status;
      this.props.location.status = query.status;
    }
    this.loadData();
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prepProps) {
    // const oldLocation = prepProps.location;
    // const newLocation = this.props.location;
    // console.log("##=> oldLocation: %O", oldLocation);
    // console.log("##=> newLocation: %O", newLocation);
    // if (newLocation.key === oldLocation.key) {
    //   return;
    // }
    // if (newLocation.query !== undefined) {
    //   newLocation.search = "?status=Open";
    // }
    // this.loadData();
  }

  loadData() {
    console.log("carga: %O", `/api/issues${this.props.location.search}`);
    fetch(`/api/issues${this.props.location.search}`)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log("total de registros: ", data._metadata.total_count);
            data.records.forEach((issue) => {
              issue.created = new Date(issue.created);
              if (issue.completionDate) {
                issue.completionDate = new Date(issue.completionDate);
              }
            });

            this.setState({ issues: data.records });
          });
        } else {
          response.json().then((error) => {
            alert("Error al consultas incidentes: ", error.message);
          });
        }
      })
      .catch((err) => {
        alert("Error al recuperar datos del servidos; ", err);
      });
  }

  createIssue(newIssue) {
    fetch("/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newIssue)
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((updateIssue) => {
            console.log("1: %O", updateIssue);
            updateIssue.created = new Date(updateIssue.created);
            if (updateIssue.completionDate) {
              updateIssue.completionDate = new Date(updateIssue.completionDate);
            }
            const newIssues = this.state.issues.concat(updateIssue);
            this.setState({ issues: newIssues });
          });
        } else {
          response.json().then((error) => {
            console.log("error: %o", error);
            alert(
              "Error al agregar un nuevo incidente [" +
                response.status +
                "]: \n  " +
                error.message
            );
          });
        }
      })
      .catch((err) => {
        alert(
          "Error enviando data al servidor [" +
            response.status +
            "]:  \n  " +
            error.message
        );
      });
  }

  render() {
    console.log("##=> IssueFilter-this.setFilter: %O", this.setFilter);
    console.log(
      "##=> IssueFilter-this.props.location: %O",
      this.props.location
    );
    return (
      <div>
        <h1>Explorador de incidentes</h1>
        <IssueFilter
          setFilter={this.setFilter}
          initFilter={this.props.location}
        />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}

// IssueList.propTypes = {
//   location: PropTypes.object.isRequired,
//   setFilter: PropTypes.func.isRequired,
//   initFilter: PropTypes.object.isRequired
// };
