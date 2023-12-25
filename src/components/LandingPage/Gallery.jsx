import './Gallery.scss'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

const Gallery = () => {
    const galleryRef = useRef();

    gsap.registerPlugin(ScrollTrigger);

    useLayoutEffect(() => {
        gsap.context(() => {
            gsap.set('.gallery__backdrop', {
                width: 0, height: 0,
            })
            gsap.set('.heading__primary--gallery', { yPercent: 100 })
            const tl = gsap.timeline();
            tl.to('.gallery__backdrop', {
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                transform: 'translate(0%,0%)',
            })
            tl.to('.heading__primary--gallery', {
                ease: 'power4.in',
                zIndex: 200,
                yPercent: 0,
                duration: 1,
            }, "<+1")
            ScrollTrigger.create({
                animation: tl,
                trigger: galleryRef.current,
                start: 'top 90%',
                end: '+=2000px',
                scrub: true,
                markers: true,
                pin: true,
                pinSpacing: false,
                scroller: galleryRef.current,
            })
        }, galleryRef)
    }, [])




    return (
        <section className='gallery' ref={galleryRef}>
            <div className='gallery__backdrop'></div>
            <h1 className='heading__primary heading__primary--gallery'>Modern <br />Yet <br />Minimal</h1>
            <aside className='gallery__main' >

            </aside>
        </section>
    );
}

export default Gallery;