import './Modal.scss'
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCheckCircle } from "react-icons/fa";
import { gsap } from 'gsap/gsap-core';
import { useLayoutEffect, useRef } from 'react';

const Modal = ({ children, title, closeHandler }) => {
    const modalRef = useRef();

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
            <main className="modal__main">
                <p className="modal__title">{title}</p>
                {children}
                <aside>
                    <button className='modal__btn modal__btn--blue'>
                        <FaRegCheckCircle style={{ width: '3rem', height: '3rem' }} />
                        Submit
                    </button>
                    <button className='modal__btn' onClick={handleAnimation}>
                        <RxCrossCircled style={{ width: '3rem', height: '3rem' }} />
                        Close
                    </button>
                </aside>
            </main>

        </section >
    );
}

export default Modal;