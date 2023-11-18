import './Todo.scss'
import gsap from 'gsap';
import { useLayoutEffect, useRef, useState } from 'react';

const Todo = (props) => {
  const todoRef = useRef();
  let isOpen = false;

  useLayoutEffect(() => {
    // by default closed
      gsap.context(() => {
        gsap.set('.todo__desc',{height:0,autoAlpha:0})
      },todoRef)
  },[])
  
  

  const descShowHandler = () => {
    if(isOpen) //if open then close
    {
      isOpen = false;
      gsap.to(todoRef.current,{backgroundColor:'#fafafa'})
      gsap.context(() => {
        gsap.to('.todo__title',{color:'#171717'})
        gsap.to('.todo__desc',{height:0,autoAlpha:0})
        gsap.to('.todo__priority',{scale:1,zIndex:'auto',position:'relative',left:'0'})
      },todoRef)
    }
    else
    { //open it
      isOpen=true;
      gsap.to(todoRef.current,{backgroundColor:props.priority})
      gsap.context(() => {
        const tl = gsap.timeline();
        tl.to('.todo__priority',{duration:0.4,scale:3,zIndex:-2,position:'absolute',top:0,left:'50%',transform:'translate(-50%,0)'})
        tl.to('.todo__title',{color:'#fafafa'},"<+0.1")
        tl.to('.todo__desc',{height:'auto',autoAlpha:1,duration:0.4,color:'#262626'},"<")
      },todoRef)
    }
  }

  

 return (
    <article className="todo__container--item" ref={todoRef} onClick={descShowHandler}>
        <header className="todo__title" >
          <aside className="todo__priority" style={{backgroundColor:props.priority}}>&nbsp;</aside>
          <p>{props.title}</p>
        </header>
          <p className="todo__desc" >{props.desc}</p>
      </article>
 );
}

export default Todo;