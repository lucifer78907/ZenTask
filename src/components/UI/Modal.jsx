import "./Modal.scss";
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCheckCircle } from "react-icons/fa";
import { gsap } from "gsap/gsap-core";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useFetcher, json, redirect, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuthToken } from "../../util/auth";
import { backendURL } from "../../util/variables";

const Modal = ({ children, title, closeHandler, edit, todoData }) => {
  const { userId } = useParams();
  const fetcher = useFetcher();
  const modalRef = useRef();
  const state = fetcher.state;

  // close modal as soon as toast goes off
  useEffect(() => {
    if (fetcher?.data?.status === 201) {
      toast.success("Created todo", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        onClose: () => closeHandler(),
      });
    }
    if (fetcher?.data?.status === 200) {
      toast.success(`${fetcher?.data?.deleted ? "Deleted" : "Updated"} todo`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        onClose: () => {
          closeHandler();
        },
      });
    }
  }, [fetcher?.data, fetcher?.data?.status]);

  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.set(".modal__main", { yPercent: 100 });
      gsap.to(".modal__main", {
        scale: 1,
        opacity: 1,
        yPercent: 0,
        ease: "power2.out",
      });
    }, modalRef);
  }, []);

  const handleAnimation = () => {
    closeHandler();
  };

  const deleteTodo = () => {
    fetcher.submit(
      { id: todoData.id },
      { method: "DELETE", action: `/homepage/${userId}/todos` }
    );
  };

  return (
    <section className="modal__backdrop" ref={modalRef}>
      <div className="modal__ref">
        {edit && (
          <button
            className="todo__editBtn todo__editBtn--delete"
            onClick={deleteTodo}
          >
            Delete todo
          </button>
        )}
        <fetcher.Form
          method={edit ? "PATCH" : "POST"}
          action={`/homepage/${userId}/todos`}
        >
          <main className="modal__main">
            <p className="modal__title">{title}</p>
            {children}
            <aside>
              <button
                disabled={state === "submitting"}
                className={`modal__btn modal__btn--blue ${
                  state === "submitting" ? "modal__btn--disabled" : ""
                }`}
              >
                <FaRegCheckCircle style={{ width: "3rem", height: "3rem" }} />
                {state === "submitting" ? "Submitting" : "Submit"}
              </button>
              <button
                disabled={state === "submitting"}
                className="modal__btn"
                onClick={handleAnimation}
              >
                <RxCrossCircled style={{ width: "3rem", height: "3rem" }} />
                Close
              </button>
            </aside>
          </main>
        </fetcher.Form>
      </div>
    </section>
  );
};

export default Modal;

export const newTodoAction = async ({ request, params }) => {
  const method = request.method;
  const { userId } = params;

  const data = await request.formData();

  if (method === "DELETE") {
    const id = data.get("id");
    const response = await fetch(`${backendURL}/user/deleteTodo/${id}`, {
      method: method,
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    });

    console.log(response);

    if (!response.ok) throw json({ message: "Could not delete a todo" });

    return response;
  }

  const todoData = {
    id: data.get("todo__id"),
    title: data.get("todo__title"),
    desc: data.get("todo__desc"),
    date: data.get("todo__date"),
    priority: +data.get("todo__priority"),
    percCompleted: data.get("todo__percCompleted"),
    isRecurr: data.get("todo__checkbox") === "on" ? true : false,
  };

  console.log(todoData);

  let url = `${backendURL}/user/${userId}/`;

  if (method === "POST") url += "createTodo";
  else if (method === "PATCH") url += "updateTodo";

  console.log(todoData);

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
    body: JSON.stringify(todoData),
  });

  console.log(response);

  if (!response.ok) throw json({ message: "Could not create a todo" });

  return response;
};
