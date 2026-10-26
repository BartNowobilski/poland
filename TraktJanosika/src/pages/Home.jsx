import Hero from "../sections/Hero";
import Intro from "../sections/Intro";
import Architecture from "../sections/Architecture";
import Masterplan from "../sections/Masterplan";
import Location from "../sections/Location";
import Roots from "../sections/Roots";
import Contact from "../sections/Contact";

/* Homepage — sections in story order. Each section owns its id/anchor. */
export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Architecture />
      <Masterplan />
      <Location />
      <Roots />
      <Contact />
    </>
  );
}
