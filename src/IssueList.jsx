import IssueAdd from "./IssueAdd.jsx";
import IssueFilter from "./IssueFilter.jsx";

const IssueRow = (props) => (
  <tr>
    <td>{props.issue._id}</td>
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
  constructor() {
    super();
    this.state = {
      issues: []
    };

    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch("/api/issues")
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
            alert("Erroa al consultas problemas: ", error.message);
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
              "Error al agregar nuevo problema [" +
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
    return (
      <div>
        <h1>Explorador de problemas</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}
