import { useEffect, useState } from "react";
import {Routes, Route, HashRouter } from "react-router-dom";
import TranscriptRev from "./components/case_review/CaseReview";
import "./assets/css/App.css";
import "./assets/css/nav.css"

import ScoreTracker from "./components/nav/ScoreTracker";
import { LoaderCircle } from "lucide-react";
import UpgradeShop from "./components/upgrade_shop/UpgradeShop";
import CommandCentre from "./components/terminal/Terminal";
import Login from "./components/login/Login";
import { ScoreContext } from "./context_providers/ScoreContext";
import { AdminContext } from "./context_providers/AdminContext";
import Inbox from "./components/inbox/Inbox";
import CommandInput from "./components/nav/CommandInput";
import NewMessage from "./components/nav/NewMessage";
import CurrentSlug from "./components/footer/CurrentSlug";
import { CurrentSlugContext } from "./context_providers/CurrentSlugContext";
import { UnlocksContext } from "./context_providers/unlocksContext";
import NotLoggedIn from "./components/nav/NotLoggedIn";
import {
  type unlockContextShape,
  type currentSlugShape,
  type adminContextShape,
  type scoreContextShape,
  type errorStateShape,
  type tutorialContextShape,
} from "./interfaces/interfaces";
import { SoundProvider } from "react-sounds";
import SoundControl from "./components/nav/SoundControl";
import WelcomeScreen from "./components/login/WelcomeScreen";
import GoodbyeScreen from "./components/login/GoodbyeScreen";
import HumanResources from "./components/human_resources/HumanResources";
import PersonalRecord from "./components/personal_record/PersonalRecord";
import HowToPlay from "./components/login/HowToPlay";
import MobileMenu from "./components/MobileMenu";
import Footer from "./components/footer/Footer";
import ErrorPage from "./components/error_page/ErrorPage";
import { ErrorContext } from "./context_providers/ErrorContext";
import { TutorialContext } from "./context_providers/TutorialContext";
import TutorialButton from "./components/nav/TutorialButton";

function App() {
  // const [typedName, setTypedName] = useState<string>("");
  const [adminName, setAdminName] = useState<string>("");
  const [playerUnlocks, setPlayerUnlocks] = useState<string[] | null>(null);
  const [loadingState, _setLoadingState] = useState<boolean>(false);
  // const [workDes, setWorkDes] = useState<boolean>(false);
  // const [transcriptRev, setTranscriptRev] = useState<boolean>(false);
  const [scoreState, setScoreState] = useState<number>(0);
  const [instructionsPrompt, setInstructionsPrompt] = useState<boolean>(true);
  const [currentSlug, setCurrentSlug] = useState<string>("nav.terminal");
  const [terminalLoaded, setTerminalLoaded] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<string>("")
  const [tutorialState, setTutorialState] = useState<boolean>(true);

  const adminContextValue: adminContextShape = { adminName, setAdminName };
  const unlocksContextValue: unlockContextShape = {
    playerUnlocks,
    setPlayerUnlocks,
  };

  const errorStateValue : errorStateShape = {errorState, setErrorState};
  const scoreContextValue: scoreContextShape = { scoreState, setScoreState };
   const tutorialContextValue: tutorialContextShape = { tutorialState, setTutorialState };
  const currentSlugContextValue: currentSlugShape = {
    currentSlug,
    setCurrentSlug,
  };

  //if user dismissed the message notification then logged out and logged back in, show the message notification again
  //ensures a consistent approach if user logs out and back in with the same or different username.
  //may adjust when moving to localstorage for game progress (record if its been dismissed locally and conditionally render)
  useEffect(() => {
    if (adminName === "") {
      setInstructionsPrompt(true);
    }
  }, [adminName]);

  useEffect(() => {
    if (adminName != "") {
      const interval = setTimeout(() => {
        setTerminalLoaded(true);
      }, 5000);
      console.log("timeout set");
      return () => clearInterval(interval);
    } else if (adminName === "") {
      setTerminalLoaded(false);
    }
  }, [adminName]);

  return (
    <>
      <div id="main-content">
        <HashRouter>
          {loadingState ? (
            <p>
              <LoaderCircle className="loader" />
            </p>
          ) : (
            <SoundProvider>
              <ErrorContext  value={errorStateValue}>
              <CurrentSlugContext value={currentSlugContextValue}>
                <AdminContext value={adminContextValue}>
                  <ScoreContext value={scoreContextValue}>
                    <UnlocksContext value={unlocksContextValue}>
                      <TutorialContext value={tutorialContextValue}>
                      <ErrorPage />
                      <nav>
                        {adminName != "" ? (
                          <>
                            <div id="desktop-nav">
                              <div id="interactive-nav-el-container">
                                <SoundControl mobile={false}/>
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
                        {instructionsPrompt &&
                          adminName != "" &&
                          terminalLoaded && (
                            <NewMessage
                              messageStateSetter={setInstructionsPrompt}
                            />
                          )}
                      </nav>
                      <div id="content-container">
                        <Routes>
                          <Route path="/Welcome" element={<WelcomeScreen />} />
                          <Route path="/HowToPlay" element={<HowToPlay />} />
                          <Route path="/Goodbye" element={<GoodbyeScreen />} />
                          <Route path="/HR" element={<HumanResources />} />
                          <Route
                            path="PersonalRecord"
                            element={<PersonalRecord />}
                          />
                          <Route path="/" element={<Login />} />
                          <Route
                            path="/Terminal"
                            element={<CommandCentre />}
                          />
                          <Route
                            path="/CaseReview"
                            element={<TranscriptRev />}
                          />
                          <Route
                            path="/UpgradeShop"
                            element={<UpgradeShop />}
                          />
                          <Route path="/Inbox" element={<Inbox />} />
                        </Routes>
                        
                      </div>
                      <Footer >
                          <CurrentSlug pageName={currentSlug} />
                        </Footer>
                        </TutorialContext>
                    </UnlocksContext>
                  </ScoreContext>
                </AdminContext>
              </CurrentSlugContext>
              </ErrorContext>
            </SoundProvider>
          )}

          
        </HashRouter>
      </div>
    </>
  );
}

export default App;
