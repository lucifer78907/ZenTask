import './NewTodo.scss'
import PriorityPicker from './PriorityPicker';

const NewTodo = () => {
    return <section className="newtodo">
        <header className='newtodo__header'>
            <label className="newtodo__label">Name :
                <input
                    className="newtodo__input"
                    type="text"
                    name="todo__title"
                    placeholder='Do 2 leetcode questions'
                />
            </label>
            <label className="newtodo__label">Due Date :

                <input
                    className="newtodo__input"
                    type='date'
                    name="todo__date"
                />
            </label>
        </header>
        <label className="newtodo__label">Description :
            <textarea
                className="newtodo__input "
                type='area'
                name="todo__desc"
                placeholder="Complete 2 subarray problems and 2 dynamic programming problems"
                rows={5}
                cols={43}

            />
        </label>
        <PriorityPicker />
    </section>
}

export default NewTodo;