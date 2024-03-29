import "./PriorityPicker.scss";
import "./NewTodo.scss";
import { useState } from "react";

const PriorityPicker = ({ priorityData }) => {
  const [priority, setPriority] = useState(3);
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e) => {
    setIsActive(true);
    const target = +e.target.dataset.priority;
    setPriority(target);
  };

  return (
    <article className="picker">
      <p className="newtodo__label newtodo__label--footer">Priority :</p>
      <div
        data-priority="1"
        className={`picker__box picker__box--1 ${
          isActive && priority == 1 && "picker__box--active"
        }`}
        onClick={handleClick}
      >
        &nbsp;
      </div>
      <div
        data-priority="2"
        className={`picker__box picker__box--2 ${
          isActive && priority == 2 && "picker__box--active"
        }`}
        onClick={handleClick}
      >
        &nbsp;
      </div>
      <div
        data-priority="3"
        className={`picker__box picker__box--3 ${
          isActive && priority == 3 && "picker__box--active"
        }`}
        onClick={handleClick}
      >
        &nbsp;
      </div>
      <input
        hidden
        type="text"
        name="todo__priority"
        value={priority}
        onChange={(e) => console.log("")}
      />
    </article>
  );
};

export default PriorityPicker;
