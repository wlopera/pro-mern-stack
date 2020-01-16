import React from "react";

import { Form, FormControl, Button } from "react-bootstrap";

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.issueAdd;
    this.props.createIssue({
      status: "New",
      created: new Date(),
      owner: form.owner.value,
      title: form.title.value
    });
    // Limpiar el formulario
    form.owner.value = "";
    form.title.value = "";
  }

  render() {
    return (
      <div>
        <Form inline name="issueAdd" onSubmit={this.handleSubmit}>
          <FormControl name="owner" placeholder="Propietario" />
          <FormControl name="title" placeholder="Título" />
          <Button type="submit" bsStyle="primary">
            Agregar
          </Button>
        </Form>
      </div>
    );
  }
}

export default IssueAdd;
