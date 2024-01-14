import TodoList from "./TodoList";
import { getAuthToken } from "../../util/auth";
import { useRouteLoaderData, defer } from "react-router";

const FutureTodo = () => {
  return <TodoList title="ultimately" isFuture={true} />;
};

export default FutureTodo;

async function loadTodos(params) {
  const { userId } = params;
  const response = await fetch(
    "https://zentask-xru5.onrender.com/user/" + userId + "/futureTodos",
    {
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    }
  );

  const resData = await response.json();
  return resData;
}

export const loader = async ({ request, params }) => {
  return defer({ data: loadTodos(params) });
};
