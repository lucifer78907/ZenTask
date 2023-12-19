import '../../components/Todo.scss'
import Todo from "../../components/Todo";
import Modal from '../../components/UI/Modal';
import { LuListPlus } from "react-icons/lu";
import { useEffect, useState } from 'react';
import NewTodo from '../../components/Todo/NewTodo';
import { useLoaderData, json } from 'react-router';



const DailyTodo = () => {
  const { todos: Todos } = useLoaderData();
  console.log(Todos);
  const [isModalOpen, setModalOpen] = useState(false);
  const [todoData, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  // #TODO - Check todo updating func , as it updates all from backend,update using specific id of todo not user
  // #TODO - Check todo update after priority color1



  const modalOpenHandler = (e) => {
    e.preventDefault();
    setModalOpen(true);
  }

  const modalCloseHandler = () => {
    setModalOpen(false);
    setIsEdit(false);
  }

  const setEditModalHandler = (data) => {
    setData(data);
    setIsEdit(true);
  }



  return <section className='todo__section'>
    {isModalOpen && <Modal title='Create new task' edit={false} closeHandler={modalCloseHandler}><NewTodo isEdit={false} /></Modal>}
    {isEdit && <Modal title='Edit todo' edit={true} closeHandler={modalCloseHandler}><NewTodo isEdit={true} todoData={todoData} /></Modal>}
    <h1 className='heading__primary'>Goals to finish today</h1>
    <main className="todo__container">
      {/* sorting on basis of priority */}
      {Todos.sort((a, b) => a.priority - b.priority).map(todo => {
        return <Todo setIsEdit={setEditModalHandler} key={todo.id} id={todo.id} title={todo.title} desc={todo.description} priority={todo.priority} progress={todo.progress} />
      })}
    </main>
    <footer className='todo__footer--btn'>
      <button className='todo__addButton' onClick={modalOpenHandler}>
        <LuListPlus style={{ height: '6rem', width: '6rem' }} />
      </button>
    </footer>
  </section>;
};

export const loader = async ({ request, params }) => {
  const { userId } = params;
  const response = await fetch("http://localhost:8080/user/" + userId + '/todos');

  if (!response.ok)
    throw json({ message: "Server error! Could not process your request" });

  return response;
};


export default DailyTodo;


