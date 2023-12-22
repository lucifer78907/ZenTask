import TodoList from './TodoList';

const FutureTodo = () => {
    return <TodoList title="ultimately" />
};

export default FutureTodo;

export const loader = async ({ request, params }) => {
    const { userId } = params;
    const response = await fetch("http://localhost:8080/user/" + userId + '/futureTodos');

    if (!response.ok)
        throw json({ message: "Server error! Could not process your request" });

    return response;
};

