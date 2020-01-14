import React from "react";
import { Link } from "react-router-dom";

export default class IssueFilter extends React.Component {
  render() {
    const Separator = () => <span> | </span>;
    return (
      <div>
        <Link to="/issues">Todos</Link>
        <Separator />
        <Link to="/issues?status=New">Nuevos</Link>
        <Separator />
        <Link to={{ pathname: "/issues", query: { status: "Open" } }}>
          Abiertos
        </Link>
        <Separator />
        <Link to="/issues?status=Assigned">Asignados</Link>
      </div>
    );
  }
}
