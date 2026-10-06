import "../assets/css/mobileMenu.css";
import SoundControl from "./nav/SoundControl";
import ScoreTracker from "./nav/ScoreTracker";

export default function MobileMenu() {
  return (
    <div id="mobile-nav">
      <SoundControl mobile={true}/>
      <ScoreTracker />
    </div>
  );
}
