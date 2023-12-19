import './Modal.scss'
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCheckCircle } from "react-icons/fa";
import { gsap } from 'gsap/gsap-core';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useFetcher, json, redirect, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ children, title, closeHandler, edit }) => {
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
        if (fetcher?.data?.status === 200) {
            toast.success('Updated todo', {
                position: toast.POSITION.TOP_RIGHT,
                onClose: () => {
                    closeHandler();
                }
            })
        }
    }, [fetcher?.data, fetcher?.data?.status])


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
            <fetcher.Form method={edit ? 'PATCH' : 'POST'} action={`/homepage/${userId}/todos`}>
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
    const method = request.method;
    const { userId } = params;


    const data = await request.formData();

    const todoData = {
        id: data.get('todo__id'),
        title: data.get('todo__title'),
        desc: data.get('todo__desc'),
        date: data.get('todo__date'),
        priority: +data.get('todo__priority'),
    }

    let url = `http://localhost:8080/user/${userId}/`

    if (method === 'POST')
        url += 'createTodo';
    else if (method === 'PATCH')
        url += 'updateTodo'

    console.log(todoData)

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
    });

    console.log(response);

    if (!response.ok) throw json({ message: "Could not create a todo" });


    return response;

}