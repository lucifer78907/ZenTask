import TodoList from "./TodoList";
import { getAuthToken } from "../../util/auth";

const FutureTodo = () => {
  return <TodoList title="ultimately" isFuture={true} />;
};

export default FutureTodo;

export const loader = async ({ request, params }) => {
  const { userId } = params;
  const response = await fetch(
    "http://localhost:8080/user/" + userId + "/futureTodos",
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
