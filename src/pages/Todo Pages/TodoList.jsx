import "../../components/Todo.scss";
import Todo from "../../components/Todo";
import Modal from "../../components/UI/Modal";
import { LuListPlus } from "react-icons/lu";
import { useState } from "react";
import NewTodo from "../../components/Todo/NewTodo";
import { useLoaderData, json, useParams } from "react-router";
import { useFetcher } from "react-router-dom";

const TodoList = (props) => {
  const fetcher = useFetcher();
  const { userId } = useParams();
  const { todos: Todos } = useLoaderData();
  const [isModalOpen, setModalOpen] = useState(false);
  const [todoData, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const modalOpenHandler = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const modalCloseHandler = () => {
    setModalOpen(false);
    setIsEdit(false);
  };

  const setEditModalHandler = (data) => {
    setData(data);
    setIsEdit(true);
  };

  const changePriorityHandler = (data) => {
    fetcher.submit(
      {
        todo__id: data.id,
        todo__title: data.title,
        todo__desc: data.description,
        todo__priority: +data.priority,
        todo__percCompleted: data.percCompleted,
        todo__date: data.dueDate,
      },
      { method: "PATCH", action: `/homepage/${userId}/todos` }
    );
  };

  const todoDeleteOnCompleteProgressHandler = (id) => {
    fetcher.submit(
      { id: id },
      { method: "DELETE", action: `/homepage/${userId}/todos` }
    );
  };

  return (
    <section className="todo__section">
      {isModalOpen && (
        <Modal
          title="Create new task"
          edit={false}
          closeHandler={modalCloseHandler}
        >
          <NewTodo isEdit={false} />
        </Modal>
      )}
      {isEdit && (
        <Modal
          title="Edit todo"
          edit={true}
          todoData={todoData}
          closeHandler={modalCloseHandler}
        >
          <NewTodo isEdit={true} todoData={todoData} />
        </Modal>
      )}
      <h1 className="heading__primary">Goals to finish {props.title}</h1>
      <main className="todo__container">
        {/* sorting on basis of priority */}
        {Todos.sort((a, b) => a.priority - b.priority).map((todo) => {
          return (
            <Todo
              setIsEdit={setEditModalHandler}
              changePriority={changePriorityHandler}
              todoDelete={todoDeleteOnCompleteProgressHandler}
              key={todo.id}
              id={todo.id}
              title={todo.title}
              desc={todo.description}
              priority={todo.priority}
              progress={todo.progress}
              dueDate={todo.dueDate}
            />
          );
        })}
      </main>
      <footer className="todo__footer--btn">
        <button className="todo__addButton" onClick={modalOpenHandler}>
          <LuListPlus style={{ height: "5rem", width: "5rem" }} />
        </button>
      </footer>
    </section>
  );
};

export const loader = async ({ request, params }) => {
  const { userId } = params;
  const response = await fetch(
    "http://localhost:8080/user/" + userId + "/todos"
  );

  if (!response.ok)
    throw json({ message: "Server error! Could not process your request" });

  return response;
};

export default TodoList;
