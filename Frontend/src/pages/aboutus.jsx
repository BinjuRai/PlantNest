import AboutCTA from "../components/aboutus/AboutCTA";
import AboutHero from "../components/aboutus/AboutHero";
import { OurJourney } from "../components/aboutus/OurJourney";
import { MissionVision } from "../components/aboutus/VisionMission";
import { WhoWeAre } from "../components/aboutus/WhoareWe";

import WhyChoose from "../components/home/WhyChoose";



export default function Aboutus() {

  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <MissionVision />
      <WhyChoose />
     
      {/* <OurJourney />
      <AboutCTA /> */}

    </>
  );
}
