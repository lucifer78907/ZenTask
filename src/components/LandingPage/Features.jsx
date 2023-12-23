import './Features.scss'
import taskImg from '../../assets/3d/1.svg'
import percImg from '../../assets/3d/25.svg'
import barChartImg from '../../assets/3d/9.svg'
import arrowImg from '../../assets/3d/2.svg'
import lazyImg from '../../assets/3d/lazy.svg'
import gsap from "gsap"
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

const Features = () => {
    const featureRef = useRef();

    gsap.registerPlugin(ScrollTrigger);

    useLayoutEffect(() => {
        gsap.context(() => {
            gsap.set('.feature', { autoAlpha: 0, y: 80 })
            const featues = gsap.utils.toArray('.feature');
            featues.forEach(f => {
                gsap.to(f, {
                    y: 0, autoAlpha: 1,
                    scrollTrigger: {
                        trigger: f,
                        // element,viewport
                        start: 'center bottom',
                        end: () => "+=" + f.offsetHeight < 150 ? f.offsetHeight : f.offsetHeight - 200,
                        scrub: 2,
                        onLeaveBack: (self) => {
                            return self.animation.timeScale(0.1)
                        },
                    }
                })
            })
        }, featureRef)
    }, [])


    return <section className='features'>
        <main className='features__main' ref={featureRef}>
            <article className='feature feature--1'> </article>
            <article className='feature feature--2'>
                <h3 className='heading__tertiary'>
                    Task Prioritization
                </h3>
                <p className='feature__para'>
                    Allow users to prioritize their tasks by assigning different levels of importance or urgency to each task.
                </p>
                <img src={taskImg} alt='Stars with hand' className='feature__img--1' />
            </article>
            <article className='feature feature--3'> </article>
            <article className='feature feature--4'>
                <h3 className='heading__tertiary'>
                    Percentage Completion
                </h3>
                <p className='feature__para'>Users can specify the percentage of a task that is complete, helping them quantify their progress accurately.</p>
                <img src={percImg} alt='Stars with hand' className='feature__img feature__img--2' />
            </article>

            <article className='feature feature--5'>
                <img src={barChartImg} alt='Stars with hand' className='feature__img feature__img--3' />
                <h3 className='heading__tertiary heading__tertiary--light'>Productivity Analytics</h3>
                <p className='feature__para feature__para--light'>
                    Track and display statistics on your task completion rate, allowing you to visualize your progress over time.
                </p>
            </article>
            <article className='feature feature--6'>
                <img src={arrowImg} alt='Stars with hand' className='feature__img feature__img--4' />
                <h3 className='heading__tertiary heading__tertiary--light'>Hit your goals</h3>
                <p className='feature__para feature__para--light'>
                    Track and display statistics on your task completion rate, allowing you to visualize your progress over time.
                </p>
            </article>  <article className='feature feature--7'>
                <img src={lazyImg} alt='Stars with hand' className='feature__img feature__img--5' />
                <h4 className='heading__quaternery'>#stoplaziness</h4>
            </article>
        </main>
    </section>
}

export default Features;