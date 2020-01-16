import React from "react";

export default class IssueFilter extends React.Component {
  constructor(props) {
    super(props);
    console.log("##=> IssueFilter-props: %O", props);
    this.state = {
      status: props.initFilter.status || "",
      effort_gte: props.initFilter.effort_gte || "",
      effort_lte: props.initFilter.effort_lte || "",
      changed: false
    };
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
    this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  render() {
    console.log("IssueList-{this.state.status}: %O", this.state);
    return (
      <div>
        <div class="panel panel-default">
          <div class="panel-heading">Filtros</div>
          <div class="row">
            <div class="col-md-12">
              <div class="col-md-3">
                Estado:
                <select
                  value={this.state.status}
                  onChange={this.onChangeStatus}
                >
                  <option value="">Todos</option>
                  <option value="New">Nuevos</option>
                  <option value="Open">Abiertos</option>
                  <option value="Assigned">Asignados</option>
                  <option value="Fixed">Resueltos</option>
                  <option value="Verified">Verificados</option>
                  <option value="Closed">Cerrados</option>
                </select>
              </div>
              <div class="col-md-3">
                &nbsp;Esfuerzo entre:
                <input
                  size={5}
                  value={this.state.effort_gte}
                  onChange={this.onChangeEffortGte}
                />
                &nbsp;-&nbsp;
                <input
                  size={5}
                  value={this.state.effort_lte}
                  onChange={this.onChangeEffortLte}
                />
              </div>
              <div class="col-md-6">
                <div class="col-md-2">
                  <button onClick={this.applyFilter} class="btn btn-success">
                    Aplicar
                  </button>
                </div>
                <div class="col-md-2">
                  <button
                    onClick={this.resetFilter}
                    disabled={!this.state.changed}
                    class="btn btn-success"
                  >
                    Cancelar
                  </button>
                </div>
                <div class="col-md-2">
                  <button onClick={this.clearFilter} class="btn btn-success">
                    Limpiar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value,
      changed: true
    });
  }

  onChangeEffortGte(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effort_gte: e.target.value, changed: true });
    }
  }

  onChangeEffortLte(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effort_lte: e.target.value, changed: true });
    }
  }

  applyFilter() {
    const newFilter = {};
    if (this.state.status) {
      newFilter.status = this.state.status;
    }
    if (this.state.effort_gte) {
      newFilter.effort_gte = this.state.effort_gte;
    }
    if (this.state.effort_lte) {
      newFilter.effort_lte = this.state.effort_lte;
    }

    console.log("##=> IssueFilter-newFilter: %O", newFilter);
    this.props.setFilter(newFilter);
  }

  clearFilter() {
    this.setState({
      status: "",
      changed: false
    });
    this.props.setFilter({});
  }

  resetFilter() {
    console.log(1, this.props.initFilter);
    this.setState({
      status: this.props.initFilter.status || "",
      effort_gte: this.props.initFilter.effort_gte || "",
      effort_lte: this.props.initFilter.effort_lte || "",
      changed: false
    });
  }
}
