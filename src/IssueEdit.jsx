import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default class IssueEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: {
        _id: "",
        title: "",
        status: "",
        owner: "",
        effort: "",
        completionDate: "",
        created: ""
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prepProp) {
    // if (prepProp.match.params.id !== this.props.id) {
    //   this.loadData();
    // }
  }

  onSubmit(event) {
    event.preventDefault();
    // if (Object.keys(this.state.invalidFields).length !== 0) {
    //   return;
    // }
    fetch(`/api/issues/${this.props.match.params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.issue)
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((updatedIssue) => {
            updatedIssue.created = new Date(
              updatedIssue.created
            ).toDateString();
            if (updatedIssue.completionDate) {
              updatedIssue.completionDate = new Date(
                updatedIssue.completionDate
              ).toDateString();
            }
            this.setState({ issue: updatedIssue });
            alert("Incidente actualizado satisfactoriamente.");
          });
        } else {
          response.json().then((error) => {
            alert(`Fallo la actualización del incidente: ${error.message}`);
          });
        }
      })
      .catch((err) => {
        alert(`Error enviado data al servidor: ${err.message}`);
      });
  }

  onChange(e) {
    const issue = Object.assign({}, this.state.issue);
    issue[e.target.name] = e.target.value;
    this.setState({ issue });
  }

  loadData() {
    console.log(
      "##=> IssueEdit-this.props.params: %O",
      this.props.match.params.id
    );

    fetch(`/api/issues/${this.props.match.params.id}`)
      .then((response) => {
        if (response.ok) {
          response.json().then((issue) => {
            issue.created = new Date(issue.created).toDateString();
            issue.completionDate =
              issue.completionDate != null
                ? new Date(issue.completionDate).toDateString()
                : "";
            issue.effort = issue.effort != null ? issue.effort.toString() : "";
            this.setState({ issue });
            console.log("##=> IssueEdit-loadData: %O", this.state);
          });
        } else {
          response.json().then((error) => {
            alert(`Fallo la consulta de incidentes: ${error.message}`);
          });
        }
      })
      .catch((err) => {
        alert(`Error del servidor en consulta de incidentes: ${err.message}`);
      });
  }

  render() {
    const issue = this.state.issue;
    console.log("##=> IssueEdit-render-issue: %O", issue);
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          ID: {issue._id}
          <br />
          Creado: {issue.created}
          <br />
          Estado:
          <select name="status" value={issue.status} onChange={this.onChange}>
            <option value="New">Nuevos</option>
            <option value="Open">Abierto</option>
            <option value="Assigned">Asignado</option>
            <option value="Fixed">Resuelto</option>
            <option value="Verified">Verificado</option>}
            <option value="Closed">Cerrado</option>
          </select>
          <br />
          Propietario:
          <input name="owner" value={issue.owner} onChange={this.onChange} />
          <br />
          Esfuerzo:
          <input
            size={5}
            name="effort"
            value={issue.effort}
            onChange={this.onChange}
          />
          <br />
          Fecha de completado:
          <input
            name="completionDate"
            value={issue.completionDate}
            onChange={this.onChange}
          />
          <br />
          Título:
          <input
            name="title"
            size={50}
            value={issue.title}
            onChange={this.onChange}
          />
          <br />
          <button type="submit">Submit</button>
          <Link to="/issues"> Regresar a lista de incidentes</Link>
        </form>
      </div>
    );
  }
}

IssueEdit.propTypes = {
  params: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
};
