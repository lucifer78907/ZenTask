import './Todo.scss'
import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import { colorArr } from '../data/PriorityColorMap';

const Todo = (props) => {
  const todoRef = useRef();
  const sliderRef = useRef();
  let isOpen = false;

  useLayoutEffect(() => {
    // by default closed
    gsap.context(() => {
      gsap.set('.todo__footer', { height: 0, autoAlpha: 0 })
    }, todoRef)
  }, [])



  const descShowHandler = () => {
    if (isOpen) //if open then close
    {
      isOpen = false;
      gsap.to(todoRef.current, { backgroundColor: '#fafafa', gap: 0 })
      gsap.context(() => {
        gsap.to('.todo__title', { color: '#171717' })
        gsap.to('.todo__footer', { height: 0, autoAlpha: 0 })
        gsap.to('.todo__priority', { scale: 1, zIndex: 'auto', position: 'relative', left: '0' })
        gsap.to('.todo__slider--label', { color: '#a3a3a3' })
      }, todoRef)
    }
    else { //open it
      isOpen = true;
      gsap.to(todoRef.current, { backgroundColor: props.priority, gap: '2rem' })
      gsap.context(() => {
        const tl = gsap.timeline();
        tl.to('.todo__footer', { height: 'auto', autoAlpha: 1 })
        tl.to('.todo__priority', { duration: 0.4, scale: 3, zIndex: -2, position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%,0)' }, "<")
        tl.to('.todo__title', { color: '#fafafa' }, "<+0.1")
        tl.to('.todo__desc', { height: 'auto', autoAlpha: 1, duration: 0.4, color: '#262626' }, "<")
        tl.to('.todo__slider--label', { color: '#fafafa' }, '<')
      }, todoRef)
    }
  }

  const dragHandler = (e) => {
    e.stopPropagation();
  }

  const filterArr = colorArr.filter(color => color !== props.priority)
  console.log(filterArr)



  return (
    <article className="todo__container--item" ref={todoRef} onClick={descShowHandler}>
      <header className="todo__title" >
        <aside className="todo__priority" style={{ backgroundColor: props.priority }}>&nbsp;</aside>
        <p>{props.title}</p>
        <label className='todo__slider--label' ref={sliderRef} onClick={dragHandler}>
          Progress
          <input type='range' min={0} max={100} step='20' defaultValue={props.progress} className='todo__slider' />
        </label>
      </header>
      <footer className='todo__footer'>
        <p className="todo__desc" >Description - : {props.desc}</p>
        <aside>
          <p className='todo__change'>Change priority :</p>
          <div className='todo__color todo__color--1' style={{ backgroundColor: filterArr[0] }}>&nbsp;</div>
          <div className='todo__color todo__color--2' style={{ backgroundColor: filterArr[1] }}>&nbsp;</div>
        </aside>
      </footer>

    </article>
  );
}

export default Todo;