import React from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";

import IssueList from "./IssueList.jsx";
import IssueEdit from "./IssueEdit.jsx";

const contentNode = document.getElementById("contents");

const noMatch = () => {
  return <p>Página no encontrada</p>;
};

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={IssueList} />
          <Route exact path="/issues" component={withRouter(IssueList)} />
          <Route path="/issues/:id" component={IssueEdit} />
          <Route path="*" component={noMatch} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

// const RouteApp = () => (
//   <BrowserRouter>
//     <React.Fragment>
//       <Switch>
//         <Route exact path="/" component={IssueList} />
//         <Route path="/issues" component={IssueList} />
//         <Route path="/edit" component={IssueEdit} />
//         <Route path="*" component={noMatch} />
//       </Switch>
//     </React.Fragment>
//   </BrowserRouter>
// );

ReactDOM.render(<App />, contentNode);

if (module.hot) {
  module.hot.accept();
}
