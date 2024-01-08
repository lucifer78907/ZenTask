import "../../components/Todo.scss";
import Todo from "../../components/Todo";
import Modal from "../../components/UI/Modal";
import { LuListPlus } from "react-icons/lu";
import { useState } from "react";
import NewTodo from "../../components/Todo/NewTodo";
import { useLoaderData, json, useParams } from "react-router";
import { useFetcher } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

const checkDateIfPrev = (dueDate) => {
  // this checks if currentdate is a prev date or future date
  const currDate = new Date();
  const todoDate = new Date(dueDate);
  currDate.setHours(0, 0, 0);

  if (currDate.getTime() > todoDate.getTime())
    return true; //it is a prev todo do not add this
  else return false;
};

const TodoList = (props) => {
  const fetcher = useFetcher();
  const { userId } = useParams();
  const { todos: Todos } = useLoaderData();
  const prevTodos = [];
  const currTodos = [];
  for (const item of Todos) {
    if (checkDateIfPrev(item.dueDate)) prevTodos.push(item);
    else currTodos.push(item);
  }
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
        {currTodos
          .sort((a, b) => a.priority - b.priority)
          .map((todo) => {
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
      {!props.isFuture && (
        <aside className="todo__prev">
          <p className="todo__prev--title">----- Previous todos -----</p>
          {prevTodos.length == 0 && (
            <p className="todo__prev--subtitle">No more prev todo's ;</p>
          )}
          {prevTodos
            .sort((a, b) => a.priority - b.priority)
            .map((todo) => {
              return (
                <Todo
                  setIsEdit={setEditModalHandler}
                  changePriority={changePriorityHandler}
                  todoDelete={todoDeleteOnCompleteProgressHandler}
                  isPrev={true}
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
        </aside>
      )}

      <footer className="todo__footer--addBtn">
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
    "http://localhost:8080/user/" + userId + "/todos",
    {
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    }
  );

  if (!response.ok)
    throw json({ message: "Server error! Could not process your request" });

  return response;
};

export default TodoList;
