import './Modal.scss'
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCheckCircle } from "react-icons/fa";
import { gsap } from 'gsap/gsap-core';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useFetcher, json, redirect, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ children, title, closeHandler }) => {
    const { userId } = useParams();
    const fetcher = useFetcher();
    const modalRef = useRef();

    // close modal as soon as toast goes off
    useEffect(() => {
        if (fetcher?.data?.status === 201) {
            toast.success('Created todo', {
                position: toast.POSITION.TOP_RIGHT,
                onClose: () => closeHandler()
            })
        }
    }, [fetcher?.data])


    useLayoutEffect(() => {
        gsap.context(() => {
            gsap.set('.modal__main', { yPercent: 100 })
            gsap.to('.modal__main', { scale: 1, opacity: 1, yPercent: 0, ease: 'power2.out' })
        }, modalRef)
    }, [])

    const handleAnimation = () => {
        closeHandler();
    }



    return (
        <section className="modal__backdrop" ref={modalRef}>
            <fetcher.Form method='POST' action={`/homepage/${userId}/todos`}>
                <main className="modal__main">
                    <ToastContainer style={{ fontSize: "1.7rem", width: "max-content" }} />
                    <p className="modal__title">{title}</p>
                    {children}
                    <aside>
                        <button className='modal__btn modal__btn--blue' >
                            <FaRegCheckCircle style={{ width: '3rem', height: '3rem' }} />
                            Submit
                        </button>
                        <button className='modal__btn' onClick={handleAnimation}>
                            <RxCrossCircled style={{ width: '3rem', height: '3rem' }} />
                            Close
                        </button>
                    </aside>
                </main>
            </fetcher.Form>

        </section >
    );
}

export default Modal;

export const newTodoAction = async ({ request, params }) => {
    const { userId } = params;


    const data = await request.formData();

    const todoData = {
        title: data.get('todo__title'),
        desc: data.get('todo__desc'),
        date: data.get('todo__date'),
        priority: +data.get('todo__priority'),
    }

    console.log(todoData)

    const response = await fetch(`http://localhost:8080/user/${userId}/createTodo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
    });

    console.log(response);

    if (!response.ok) throw json({ message: "Could not create a todo" });


    return response;

}