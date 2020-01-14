import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export default class IssueEdit extends React.Component {
  constructor(props) {
    super(props);
    console.log("##=> props: %O", props);
  }

  render() {
    return (
      <div>
        <p>
          Este es un marcador de posición para un incidente:
          {this.props.match.params.name}.
        </p>
        <Link to="/issues">Regresar a la lista de incidentes</Link>
      </div>
    );
  }
}

IssueEdit.propTypes = {
  params: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
};
