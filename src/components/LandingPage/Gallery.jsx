import "./Gallery.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import FeatureImg from "../../assets/features/Feature.svg";
import FeatureOne from "../../assets/features/7.svg";
import FeatureTwo from "../../assets/features/22.svg";
import FeatureThree from "../../assets/features/17.svg";
import FeatureFour from "../../assets/features/48.svg";
import { useLayoutEffect, useRef } from "react";

const Gallery = () => {
  const galleryRef = useRef();

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ ease: "power2.in" });
      tl.from(".gallery__main--0", { yPercent: 130 })
        .from(
          ".heading__primary--0",
          { yPercent: 100, opacity: 0, scale: 0.3 },
          "<"
        )
        .from(".gallery__img--0", { opacity: 0, scale: 0.3 }, "<")
        .from(".gallery__main--1", { xPercent: -100 })
        .from(
          ".heading__primary--1",
          { xPercent: -100, opacity: 0, scale: 0.3 },
          "<"
        )
        .from(".gallery__img--1", { opacity: 0, scale: 0.3 }, "<")
        .from(".gallery__main--2", { xPercent: 100 })
        .from(
          ".heading__primary--2",
          { xPercent: 130, opacity: 0, scale: 0.3 },
          "<"
        )
        .from(".gallery__img--2", { opacity: 0, scale: 0.3 }, "<")
        .from(".gallery__main--3", { yPercent: -100 })
        .from(
          ".heading__primary--3",
          { yPercent: -100, opacity: 0, scale: 0.3 },
          "<"
        )
        .from(".gallery__img--3", { opacity: 0, scale: 0.3 }, "<");

      // pin the container and link the animation to the scrollbar (scrub: true). We could easily embed this in the gsap.timeline() to shorten things a bit, but this is to show that you can create the ScrollTrigger separately if you prefer.
      ScrollTrigger.create({
        animation: tl,
        trigger: galleryRef.current,
        start: "top top",
        end: "+=2000",
        scrub: 2,
        pin: true,
        anticipatePin: 1,
      });
    }, galleryRef);

    return ctx.clear();
  }, []);

  return (
    <section className="gallery" ref={galleryRef}>
      <aside className="gallery__main">
        <img src={FeatureImg} alt="A book" className="gallery__img" />
        <h1 className="heading__primary heading__primary--gallery ">
          Features of our app!
        </h1>
        <p className="gallery__para"> Scroll Down to find out</p>
      </aside>
      <aside className="gallery__main gallery__main--0" number="01">
        <img
          src={FeatureOne}
          alt="A book"
          className="gallery__img gallery__img--0"
        />
        <h1 className="heading__primary heading__primary--gallery heading__primary--0 ">
          Modern Yet Minimal
        </h1>
      </aside>
      <aside className="gallery__main gallery__main--1" number="02">
        <img
          src={FeatureTwo}
          alt="A book"
          className="gallery__img gallery__img--1"
        />
        <h1 className="heading__primary heading__primary--gallery heading__primary--1">
          Track Future Todos
        </h1>
      </aside>
      <aside className="gallery__main gallery__main--2" number="03">
        <img
          src={FeatureThree}
          alt="A book"
          className="gallery__img gallery__img--2"
        />
        <h1 className="heading__primary heading__primary--gallery heading__primary--2">
          Customize Your Profile
        </h1>
      </aside>
      <aside className="gallery__main gallery__main--3">
        <img
          src={FeatureFour}
          alt="A book"
          className="gallery__img gallery__img--3"
        />
        <h1 className="heading__primary heading__primary--gallery heading__primary--3">
          Still Not Convinced?
        </h1>
        <p className="gallery__para">
          <span>Sign up</span> to know more
        </p>
      </aside>
    </section>
  );
};

export default Gallery;
