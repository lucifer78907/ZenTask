import '../../components/Todo.scss'
import Todo from "../../components/Todo";
import Modal from '../../components/UI/Modal';
import { LuListPlus } from "react-icons/lu";
import { useState } from 'react';
import NewTodo from '../../components/Todo/NewTodo';


const Todos = [
  {
    id: 0,
    "title": "Complete Project A",
    "desc": "Finish the tasks outlined in Project A",
    "priority": 1,
    "progress": 20
  },
  {
    id: 1,
    "title": "Review Code Changes",
    "desc": "Check and provide feedback on recent code changes",
    "priority": 2,
    "progress": 40
  },
  {
    id: 2,
    "title": "Plan Team Workshop",
    "desc": "Organize a workshop for team building and skill development Organize a workshop for team building and skill development Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto a officia totam neque, nam rerum sapiente recusandae quod et officiis saepe soluta dicta tempora sed alias deleniti odit quis fugit.",
    "priority": 3,
    "progress": 80
  }
]


const DailyTodo = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const modalOpenHandler = (e) => {
    e.preventDefault();
    setModalOpen(true);
  }

  const modalCloseHandler = () => {
    setModalOpen(false);
  }


  return <section className='todo__section'>
    {isModalOpen && <Modal title='Create new task' closeHandler={modalCloseHandler}><NewTodo /></Modal>}
    <h1 className='heading__primary'>Goals to finish today</h1>
    <main className="todo__container">
      {/* sorting on basis of priority */}
      {Todos.sort((a, b) => a.priority - b.priority).map(todo => {
        return <Todo key={todo.id} title={todo.title} desc={todo.desc} priority={todo.priority} progress={todo.progress} />
      })}
    </main>
    <footer className='todo__footer--btn'>
      <button className='todo__addButton' onClick={modalOpenHandler}>
        <LuListPlus style={{ height: '6rem', width: '6rem' }} />
      </button>
    </footer>
  </section>;
};

export default DailyTodo;


