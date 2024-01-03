import Hero from "../components/LandingPage/Hero";
import Features from "../components/LandingPage/Features";
import Testimonials from "../components/LandingPage/Tesitimonials";
import Gallery from "../components/LandingPage/Gallery";

const IndexPage = () => {
  //to prevent overflow
  return (
    <div style={{ overflowX: "hidden" }}>
      <Hero />
      <Features />
      <Testimonials />
      <Gallery />
    </div>
  );
};

export default IndexPage;
