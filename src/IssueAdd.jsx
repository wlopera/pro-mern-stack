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
        <form name="issueAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="owner" placeholder="Propietario" />
          <input type="text" name="title" placeholder="Título" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}

export default IssueAdd;
