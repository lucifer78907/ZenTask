import "./Hero.scss";
import hourGlassImage from "../../assets/3d/37.svg";
import todoImage from "../../assets/3d/30.svg";
import downHandImage from "../../assets/3d/downHand.svg";
import cycle from "../../assets/3d/cycle.svg";
import gsap from "gsap";
import { useLayoutEffect } from "react";
import { useRef } from "react";

const Hero = () => {
  const heroHeadingRef = useRef();
  const heroRef = useRef();
  const introRef = useRef();

  useLayoutEffect(() => {
    const mainTl = gsap.timeline({ delay: 1 });
    let ani;

    gsap.context(() => {
      mainTl.set(".intro__heading", { autoAlpha: 1, duration: 2 });
      mainTl
        .from(".intro__heading div", { y: 80, opacity: 0, stagger: 1 })
        .to(".intro__heading div", { y: -80, opacity: 0, stagger: 1 }, 1);
    }, introRef);

    mainTl.to(".intro", { height: 0 });

    gsap.context(() => {
      mainTl
        .from(".hero__heading", { opacity: 0, yPercent: 100, scale: 0.8 })
        .from(".hero__para", { yPercent: 100, opacity: 0, scale: 0.6 }, "<0.2")
        .from(".hero__image", {
          opacity: 0,
          yPercent: -100,
          stagger: {
            amount: 1,
            from: "edges",
          },
        });
    }, heroRef);

    gsap.context(() => {
      const sections = [
        ".hero__heading--span--1",
        ".hero__heading--span--2",
        ".hero__heading--span--3",
      ];
      const colors = ["#10b981", "#3b82f6", "#a855f7"];
      ani = gsap.timeline();
      ani
        .to(sections, {
          color: "#e5e5e5",
          textShadow: "0.7rem 0.7rem #525252",
          stagger: 1,
        })
        .to(
          sections,
          {
            color: gsap.utils.wrap(colors),
            textShadow: "0.1rem 0.1rem #fff",
            stagger: 1,
          },
          1
        )
        .to(".hero__heading--img", { rotate: "360deg" });

      // DONT USE var in gsap
    }, heroHeadingRef);

    mainTl.add(ani);

    // ScrollTrigger.refresh();
  }, []);

  return (
    <main className="index">
      <section className="intro" ref={introRef}>
        <h1 className="intro__heading">
          <div>Tired?</div>
          <div>Lack of Productivity?</div>
          <div>Dont Worry :&#41;</div>
          <div>ZenTask is here</div>
        </h1>
      </section>
      <section className="hero" ref={heroRef}>
        <h1 className="hero__heading" ref={heroHeadingRef}>
          <span className="hero__heading--span--1">To-Do</span>.
          <span className="hero__heading--span--2">Done</span>.
          <span className="hero__heading--span--3">Repeat</span>
          <img className="hero__heading--img" src={cycle} alt="A todo list" />
        </h1>
        <p className="hero__para">
          "Try our app today and transform your to-dos into triumphs! Unlock the
          door to a world of unmatched productivity and task mastery. Say
          goodbye to the chaos of to-do lists and hello to a streamlined life of
          accomplishment. Our app is your personal task wizard, ready to help
          you conquer your day, one task at a time "
        </p>

        <img
          className="hero__image hero__image--2"
          src={hourGlassImage}
          alt="A hour glass "
        />
        <img
          className="hero__image hero__image--3"
          src={downHandImage}
          alt="A hour glass "
        />
        <img
          className="hero__image hero__image--1"
          src={todoImage}
          alt="A todo list"
        />
      </section>
    </main>
  );
};

export default Hero;
