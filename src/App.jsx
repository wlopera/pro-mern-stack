import React from "react";
import ReactDOM from "react-dom";

import { Navbar, Nav, Button } from "react-bootstrap";

import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";

import IssueList from "./IssueList.jsx";
import IssueEdit from "./IssueEdit.jsx";

const contentNode = document.getElementById("contents");

const noMatch = () => {
  return <p>Página no encontrada</p>;
};

function Header() {
  return (
    <Navbar bg="success" variant="light">
      <Navbar.Brand>Explorador de Incidentes</Navbar.Brand>
      <Navbar.Brand href="/issues">Incidentes</Navbar.Brand>
      <Navbar.Brand href="/reports">Reportes</Navbar.Brand>
      <Nav className="navbar-right">
        <Navbar.Brand
          href="/agregar"
          className="glyphicon glyphicon-plus"
          variant="dark"
        >
          Crear-Incidente
        </Navbar.Brand>

        <Navbar.Text>
          <Button size="sm" variant="btn btn-info">
            Salir
          </Button>
        </Navbar.Text>
      </Nav>
    </Navbar>
  );
}

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={IssueList} />
            <Route exact path="/issues" component={withRouter(IssueList)} />
            <Route path="/issues/:id" component={IssueEdit} />
            <Route path="*" component={noMatch} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<App />, contentNode);

if (module.hot) {
  module.hot.accept();
}
