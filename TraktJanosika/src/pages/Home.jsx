import Hero from "../sections/Hero";
import Intro from "../sections/Intro";
import Architecture from "../sections/Architecture";
import Residences from "../sections/Residences";
import Masterplan from "../sections/Masterplan";
import Location from "../sections/Location";
import Roots from "../sections/Roots";
import Progress from "../sections/Progress";
import GalleryPreview from "../sections/GalleryPreview";
import Contact from "../sections/Contact";
import { useLanguage } from "../i18n/context";
import { useDocumentMeta } from "../lib/useDocumentMeta";

/* Homepage — sections in story order. Each section owns its id/anchor:
   #about #architecture #homes #masterplan #panorama #location #story
   #progress #gallery #contact */
export default function Home() {
  const { t } = useLanguage();
  useDocumentMeta({ title: t.meta.title, description: t.meta.description, path: "/" });
  return (
    <>
      <Hero />
      <Intro />
      <Architecture />
      <Residences />
      <Masterplan />
      <Location />
      <Roots />
      <Progress />
      <GalleryPreview />
      <Contact />
    </>
  );
}
