import MobileMenu from "../MobileMenu";
import CommandInput from "./CommandInput";
import NotLoggedIn from "./NotLoggedIn";
import ScoreTracker from "./ScoreTracker";
import SoundControl from "./SoundControl";
import TutorialButton from "./TutorialButton";

import { AdminContext } from "../../context_providers/AdminContext";
import { ScoreContext } from "../../context_providers/ScoreContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

export default function NavBar() {
const {adminName, setAdminName} = useContext(AdminContext)
const {scoreState} = useContext(ScoreContext)
const {pathname} = useLocation()
 {/* check to see if the current route is the login, welcome or goodbye page, if so, disable component */}
  let componentEnabled : boolean = true
  if(pathname === "/" || pathname === "/Goodbye" ||  pathname === "/Welcome" || pathname === "/HowToPlay"){
    componentEnabled= false
  }

    return (
        <>
        {componentEnabled && 
    <nav>
      {adminName != "" ? (
        <>
          <div id="desktop-nav">
            <div id="interactive-nav-el-container">
              <SoundControl mobile={false} />
              <TutorialButton />
            </div>

            <CommandInput adminNameSetter={setAdminName} />
            <ScoreTracker scoreState={scoreState} />
          </div>
          <MobileMenu />
        </>
      ) : (
        <NotLoggedIn soundControls />
      )}
    
    </nav>
}
    </>
  );
}
