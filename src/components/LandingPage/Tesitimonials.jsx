import './Testimonials.scss'
import Tesitimonial from './Testimonial';
import {testimonialsData,testimonialsData2,testimonialsData3} from '../../data/Testimonials'
import gsap from 'gsap';
import { useLayoutEffect ,useRef} from 'react';

const Testimonials = () => {
    const testRef = useRef();

    useLayoutEffect(() => {
        gsap.defaults({repeat:-1,yoyo:true,duration:60,ease:'linear'})
        gsap.set('.testimonials__cards--2',{left:'-180%'})
        gsap.to('.testimonials__cards--1',{left:'-180%'});
        gsap.to('.testimonials__cards--2',{left:'0%',duration:80});
        gsap.to('.testimonials__cards--3',{left:'-180%',duration:70});
    },[])


    

    return <section className="testimonials" ref={testRef}>
        <h2 className='heading__secondary heading__secondary--testimonials'>Our customers <span>loves us</span> </h2>
        <article className='testimonials__cards testimonials__cards--1' >
            {testimonialsData.map(test => {
                return <Tesitimonial key={test.id} title={test.title} desc={test.description}/>
            })}
        </article>
        <article className='testimonials__cards testimonials__cards--2'>
            {testimonialsData2.map(test => {
                return <Tesitimonial key={test.id} title={test.title} desc={test.description}/>
            })}
        </article> 
        <article className='testimonials__cards testimonials__cards--3'>
            {testimonialsData3.map(test => {
                return <Tesitimonial key={test.id} title={test.title} desc={test.description}/>
            })}
        </article>
    </section>
}

export default Testimonials;