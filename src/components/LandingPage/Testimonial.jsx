import { useLayoutEffect } from 'react'
import './Testimonials.scss'
import gsap from 'gsap'

const Tesitimonial = (props) => {

    const borderColors = ['#8B5CF6','#22C55E','#F43F5E','#F97316','#0EA5E9']
    const colors = ['#D8B4FE','#86EFAC','#FDA4AF','#FDBA74','#67E8F9']

    useLayoutEffect(() => {
         gsap.set('.testimonials__card',{backgroundColor:gsap.utils.wrap(colors) }) 
         gsap.set('.testimonials__card--title',{color:gsap.utils.wrap(borderColors)})
        }
    ,[])

    

    return <article className='testimonials__card'>
                <blockquote className='testimonials__card--title'>" {props.title} "</blockquote>
                <p className='testimonials__card--desc'>{props.desc}</p>
            </article>
}

export default Tesitimonial;