import "../assets/css/mobileMenu.css";
import SoundControl from "./nav/SoundControl";
import ScoreTracker from "./nav/ScoreTracker";
import { ScoreContext } from "../context_providers/ScoreContext";
import type { scoreContextShape } from "../interfaces/interfaces";
import { useContext } from "react";
export default function MobileMenu() {
    const {scoreState} = useContext<scoreContextShape>(ScoreContext)
  return (
    <div id="mobile-nav">
      <SoundControl mobile={true}/>
      <ScoreTracker scoreState={scoreState}/>
    </div>
  );
}
