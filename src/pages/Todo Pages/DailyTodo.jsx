import '../../components/Todo.scss'
import Todo from "../../components/Todo";

const Todos = [
  {
    id:0,
    "title": "Complete Project A",
    "desc": "Finish the tasks outlined in Project A",
    "priority": "#e11d48",
    "progress": 20
  },
  {
    id:1,
    "title": "Review Code Changes",
    "desc": "Check and provide feedback on recent code changes",
    "priority": "#f59e0b",
    "progress": 50
  },
  {
    id:2,
    "title": "Plan Team Workshop",
    "desc": "Organize a workshop for team building and skill development",
    "priority": "#3b82f6",
    "progress": 75
  }
]


const DailyTodo = () => {
  return <section className='todo__section'>
    <h1 className='heading__primary'>Goals to finish today</h1>
    <main className="todo__container">
      {Todos.map(todo => {
        return <Todo key={todo.id} title={todo.title} desc={todo.desc} priority={todo.priority} progress={todo.progress}/>
      })}
    </main>
  </section>;
};

export default DailyTodo;
