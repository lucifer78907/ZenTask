import "./DeleteTodo.scss";
const DeleteTodo = (props) => {
  return (
    <section className="delete__todo">
      <h1 className="delete__heading">Deleting todo...</h1>
      <button className="delete__btn" onClick={props.cancelTodo}>
        Undo
      </button>
    </section>
  );
};

export default DeleteTodo;
