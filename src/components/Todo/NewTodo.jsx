import "./NewTodo.scss";
import PriorityPicker from "./PriorityPicker";

const NewTodo = ({ isEdit, todoData }) => {
  const date = new Date();
  const currYear = date.getFullYear();
  const currMonth = date.getMonth();
  const currDay = date.getDate();

  return (
    <section className="newtodo">
      <header className="newtodo__header">
        <label className="newtodo__label">
          Name :
          <input
            className="newtodo__input"
            type="text"
            name="todo__title"
            placeholder="Do 2 leetcode questions"
            defaultValue={isEdit ? todoData?.title : ""}
          />
        </label>
        <label className="newtodo__label">
          Due Date :
          <input
            className="newtodo__input"
            type="date"
            name="todo__date"
            min={`${currYear}-${currMonth + 1}-${currDay}`}
            defaultValue={
              isEdit ? `${currYear}-${currMonth + 1}-${currDay}` : ``
            }
          />
        </label>
      </header>
      <label className="newtodo__label">
        Description :
        <textarea
          className="newtodo__input "
          type="textarea"
          name="todo__desc"
          placeholder="Complete 2 subarray problems and 2 dynamic programming problems"
          rows={5}
          cols={43}
          defaultValue={isEdit ? todoData?.description : ""}
        />
      </label>
      <input
        hidden
        type="text"
        name="todo__id"
        value={todoData?.id}
        onChange={(e) => console.log("")}
      />
      <PriorityPicker priorityData={isEdit ? todoData?.priority : null} />
    </section>
  );
};

export default NewTodo;
