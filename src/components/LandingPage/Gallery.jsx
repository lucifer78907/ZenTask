import './Gallery.scss'
import image1 from '../../assets/Gallery/Light.png'
import image2 from '../../assets/Gallery/Login.png'
import image3 from '../../assets/Gallery/Signup.png'
import image4 from '../../assets/Gallery/Welcome.png'
import image5 from '../../assets/Gallery/WelcomeDark.png'
import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'

const Gallery = () => {
    const galleryRef = useRef();
    let tl;
    const mouseHoverHandler = () => {
        gsap.context(() => {
            gsap.defaults({duration:0.2,yoyo:false,repeat:0})
            tl = gsap.timeline();
            tl.to('.gallery__img--1',{translateY:'-5%',ease:'linear'})
            tl.to('.gallery__img--2',{translateX:'-5%',ease:'linear'})
        },galleryRef)
    }

    const mouseLeaveHandler = () => {
        tl.reverse();
    }


    return (
    <section className='gallery'>
        <h1 className='heading__primary heading__primary--gallery'>Modern <br/>Yet <br/>Minimal</h1>
        <aside className='gallery__main' ref={galleryRef} onMouseEnter={mouseHoverHandler} onMouseLeave={mouseLeaveHandler}>
                <img src={image1} className='gallery__img gallery__img--1'/>
                <img src={image2} className='gallery__img gallery__img--2'/>
                <img src={image5} className='gallery__img gallery__img--3'/>
                <img src={image4} className='gallery__img gallery__img--4'/>
                <img src={image3} className='gallery__img gallery__img--5'/>
        </aside>
    </section>
    );
}

export default Gallery;