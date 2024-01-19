import "../../components/Todo.scss";
import Todo from "../../components/Todo";
import Modal from "../../components/UI/Modal";
import { LuListPlus } from "react-icons/lu";
import { Suspense, useState } from "react";
import NewTodo from "../../components/Todo/NewTodo";
import { useLoaderData, useParams, Await, defer } from "react-router";
import { useFetcher } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import TodoSkeleton from "../../components/UI/TodoSkeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteTodo from "../../components/UI/DeleteTodo";
import { backendURL } from "../../util/variables";

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
  const { data } = useLoaderData();

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

  const todoDeleteOnCompleteProgressHandler = (id, isRecurr) => {
    let deleteFlag = true;
    const handleTodoHandler = () => {
      deleteFlag = false;
    };

    toast.error(<DeleteTodo cancelTodo={handleTodoHandler} />, {
      toastId: "delete-toast",
      position: "top-right",
      autoClose: 3000,
      onClose: () => {
        if (deleteFlag) {
          fetcher.submit(
            { id: id, isRecurring: isRecurr },
            { method: "DELETE", action: `/homepage/${userId}/todos` }
          );
          toast.info("Deleted todo", {
            position: "top-right",
            autoClose: 1000,
          });
        }
      },
    });
  };

  return (
    <Suspense fallback={<TodoSkeleton />}>
      <Await resolve={data}>
        {(todos) => {
          const Todos = todos.todos;
          const prevTodos = [];
          const currTodos = [];
          for (const item of Todos) {
            if (checkDateIfPrev(item.dueDate)) prevTodos.push(item);
            else currTodos.push(item);
          }
          return (
            <section className="todo__section">
              <ToastContainer
                style={{ fontSize: "1.7rem", width: "max-content" }}
              />
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
              <h1 className="heading__primary">
                Goals to finish {props.title}
              </h1>
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
                        recurrStatus={todo.recurrStatus}
                      />
                    );
                  })}
              </main>
              {!props.isFuture && (
                <aside className="todo__prev">
                  <p className="todo__prev--title">
                    ----- Previous todos -----
                  </p>
                  {prevTodos.length == 0 && (
                    <p className="todo__prev--subtitle">
                      No more prev todo's ;
                    </p>
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
        }}
      </Await>
    </Suspense>
  );
};

async function loadTodos(params) {
  const { userId } = params;
  const response = await fetch(backendURL + "/user/" + userId + "/todos", {
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  });

  const resData = await response.json();
  return resData;
}

export const loader = async ({ request, params }) => {
  return defer({ data: loadTodos(params) });
};

export default TodoList;
