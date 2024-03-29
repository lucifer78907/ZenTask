import "./Todo.scss";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import colorMap from "../data/PriorityColorMap";
import { colorArr } from "../data/PriorityColorMap";

const checkTodoRecurr = (dueDate) => {
  dueDate.setDate(dueDate.getDate() + 1);
  dueDate.setHours(0, 0, 0);
  const currDate = new Date();
  return currDate.getTime() < dueDate.getTime(); //return true if the todo is still recurring
};

const Todo = (props) => {
  const todoRef = useRef();
  const sliderRef = useRef();
  const [priority, setPriority] = useState(props.priority);
  // Dates related
  const monthMap = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  const date = new Date(props.dueDate);
  const [day, month, year] = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
  ];
  // Is todo recurring
  const isRecurringTodo = props.recurrStatus?.isRecurring;
  let isOpen = false;

  useLayoutEffect(() => {
    // by default closed
    gsap.context(() => {
      gsap.set(".todo__footer", { height: 0, autoAlpha: 0 });
    }, todoRef);
  }, []);

  useEffect(() => {
    setPriority(props.priority);
  }, [props.priority]);

  const descShowHandler = () => {
    if (isOpen) {
      //if open then close
      isOpen = false;
      gsap.to(todoRef.current, { backgroundColor: "var(--color-bg)", gap: 0 });
      gsap.context(() => {
        gsap.to(".todo__title", { color: "var(--color-text)" });
        gsap.to(".todo__footer", { height: 0, autoAlpha: 0 });
        gsap.to(".todo__priority", {
          scale: 1,
          zIndex: "auto",
          position: "relative",
          left: "0",
          transform: "none",
        });
        gsap.to(".todo__slider--label", { color: "#a3a3a3" });
      }, todoRef);
    } else {
      //open it
      isOpen = true;
      gsap.to(todoRef.current, {
        backgroundColor: colorMap.get(priority),
        gap: "2rem",
      });
      gsap.context(() => {
        const tl = gsap.timeline();
        tl.to(".todo__footer", { height: "auto", autoAlpha: 1 });
        tl.to(
          ".todo__priority",
          {
            duration: 0.4,
            scale: 3,
            zIndex: -2,
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translate(-50%,0)",
          },
          "<"
        );
        tl.to(".todo__title", { color: "#fafafa" }, "<+0.1");
        tl.to(
          ".todo__desc",
          { height: "auto", autoAlpha: 1, duration: 0.4, color: "#262626" },
          "<"
        );
        tl.to(".todo__slider--label", { color: "#fafafa" }, "<");
      }, todoRef);
    }
  };

  const dragHandler = (e) => {
    e.stopPropagation();
  };

  const filterArr = colorArr.filter(
    (color) => color !== colorMap.get(priority)
  );

  const changePriority = (event) => {
    // e.stopPropagation();
    const selectedColor = event.currentTarget.dataset.color;
    const selectedPriority = colorArr.findIndex(
      (color) => color === selectedColor
    );

    setPriority(+(selectedPriority + 1));
    props.changePriority({
      id: props.id,
      title: props.title,
      description: props.desc,
      priority: +(selectedPriority + 1),
      percCompleted: props.progress,
      dueDate: props.dueDate,
      isRecurr: isRecurringTodo,
    });
  };

  const editHandler = () => {
    props.setIsEdit({
      id: props.id,
      title: props.title,
      description: props.desc,
      priority: props.priority,
      percCompleted: props.progress,
      dueDate: props.dueDate,
      isRecurr: isRecurringTodo,
    });
  };

  const progressChangeHandler = (e) => {
    const currValue = +e.target.value;
    if (currValue === 100) {
      //todo is completed
      // Add a deletion Confirmation
      console.log(isRecurringTodo);
      props.todoDelete(props.id, isRecurringTodo);
    }
  };

  const returnDate = (year, month, date) => {
    const now = new Date();
    const currMonth = now.getMonth() + 1;
    const currYear = now.getFullYear();
    const currDay = now.getDate();
    if (currMonth === month && currYear === year && currDay === date)
      return "Today";
    else if (currMonth === month && currYear === year && currDay + 1 === date)
      return "Tomorrow";
    else return `${monthMap[month]} ${date} ${year}`;
  };

  return (
    <article
      className="todo__container--item"
      ref={todoRef}
      onClick={descShowHandler}
    >
      <header className="todo__title">
        <aside
          className="todo__priority"
          style={{ backgroundColor: colorMap.get(priority) }}
        >
          &nbsp;
        </aside>
        <p className="todo__content">{props.title}</p>
        {isRecurringTodo && checkTodoRecurr(date) && (
          <p className="todo__recurr">Recurring</p>
        )}
        <label
          className="todo__slider--label"
          ref={sliderRef}
          onClick={dragHandler}
        >
          Progress
          <input
            type="range"
            min={0}
            max={100}
            step="20"
            defaultValue={props.progress}
            className="todo__slider"
            onChange={progressChangeHandler}
          />
        </label>
      </header>
      <footer className="todo__footer">
        <p className="todo__desc">Description - : {props.desc}</p>
        <aside>
          <p className="todo__change">Change priority :</p>
          <div
            className="todo__color "
            data-color={filterArr[0]}
            style={{ backgroundColor: filterArr[0] }}
            onClick={changePriority}
          >
            &nbsp;
          </div>
          <div
            className="todo__color "
            data-color={filterArr[1]}
            onClick={changePriority}
            style={{ backgroundColor: filterArr[1] }}
          >
            &nbsp;
          </div>
          <button className="todo__editBtn" onClick={editHandler}>
            Edit todo
          </button>
        </aside>
        <div className="todo__dueDate">
          <span>Due Date</span>{" "}
          <span className="todo__dueDate--date">
            {returnDate(year, month, day)}
          </span>
        </div>
      </footer>
    </article>
  );
};

export default Todo;
