import './Hero.scss'
import hourGlassImage from '../../assets/3d/37.svg'
import todoImage from '../../assets/3d/30.svg'
import downHandImage from '../../assets/3d/downHand.svg'
import cycle from '../../assets/3d/cycle.svg'

const Hero = () => {
return <main className="index">
            <section className='hero'>
                <h1 className='hero__heading'>
                    <span className='hero__heading--span--1'>To-Do</span>.
                    <span className='hero__heading--span--2'>Done</span>.
                    <span className='hero__heading--span--3'>Repeat</span>
                    <img className='hero__heading--img' src={cycle} alt='A todo list'/>
                </h1>
                <p className='hero__para'>
                    "Try our app today and transform your to-dos into triumphs!
                   Unlock the door to a world of unmatched productivity and task mastery. Say goodbye to the chaos of to-do lists and hello to a streamlined life of accomplishment. Our app is your personal task wizard, ready to help you conquer your day, one task at a time 
                    "
                </p>
                
                <img className='hero__image hero__image--1' src={todoImage} alt='A todo list'/>
                <img className='hero__image hero__image--2' src={hourGlassImage} alt='A hour glass '/>
                <img className='hero__image hero__image--3' src={downHandImage} alt='A hour glass '/>
            </section>
    </main>
}

export default Hero;