import { useEffect, useState } from "react";
import { Routes, Route, HashRouter, useLocation } from "react-router-dom";
import TranscriptRev from "./components/case_review/CaseReview";
import "./assets/css/App.css";
import "./assets/css/tutorial.css";
import "./assets/css/nav.css";

import { LoaderCircle } from "lucide-react";
import UpgradeShop from "./components/upgrade_shop/UpgradeShop";
import CommandCentre from "./components/terminal/Terminal";
import Login from "./components/login/Login";
import { ScoreContext } from "./context_providers/ScoreContext";
import { AdminContext } from "./context_providers/AdminContext";
import Inbox from "./components/inbox/Inbox";
import CurrentSlug from "./components/footer/CurrentSlug";
import { CurrentSlugContext } from "./context_providers/CurrentSlugContext";
import { UnlocksContext } from "./context_providers/unlocksContext";
import {
  type unlockContextShape,
  type currentSlugShape,
  type adminContextShape,
  type scoreContextShape,
  type errorStateShape,
  type tutorialContextShape,
  type tutorialStateShape,
  type playerDataShape,
  type playerContextShape,
} from "./interfaces/interfaces";
import { SoundProvider } from "react-sounds";
import WelcomeScreen from "./components/login/WelcomeScreen";
import GoodbyeScreen from "./components/login/GoodbyeScreen";
import HumanResources from "./components/human_resources/HumanResources";
import PersonalRecord from "./components/personal_record/PersonalRecord";
import HowToPlay from "./components/login/HowToPlay";
import Footer from "./components/footer/Footer";
import ErrorPage from "./components/error_page/ErrorPage";
import { ErrorContext } from "./context_providers/ErrorContext";
import { TutorialContext } from "./context_providers/TutorialContext";
import TutorialOverlay from "./components/tutorial/TutorialOverlay";
import { createPortal } from "react-dom";
import NavBar from "./components/nav/NavBar";
import { PlayerContext } from "./context_providers/PlayerContext";
import { newPlayerData } from "./models/newPlayerData";
function App() {
  // const [typedName, setTypedName] = useState<string>("");
  const [adminName, setAdminName] = useState<string>("");
  const [playerData, setPlayerData] = useState<playerDataShape | null>(null);
  const [playerUnlocks, setPlayerUnlocks] = useState<string[] | null>(null);
  const [loadingState, _setLoadingState] = useState<boolean>(false);
  // const [workDes, setWorkDes] = useState<boolean>(false);
  // const [transcriptRev, setTranscriptRev] = useState<boolean>(false);
  const [scoreState, setScoreState] = useState<number>(
   (playerData ? playerData.player_credits : 0) ,
  );
  const [_instructionsPrompt, setInstructionsPrompt] = useState<boolean>(true);
  const [currentSlug, setCurrentSlug] = useState<string>("nav.terminal");
  const [_terminalLoaded, setTerminalLoaded] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<string>("");
  const [tutorialState, setTutorialState] = useState<tutorialStateShape>({
    tutorialActive: false,
    tutorialStep: 0,
  });

  const playerContextValue: playerContextShape = { playerData, setPlayerData };
  const adminContextValue: adminContextShape = { adminName, setAdminName };
  const unlocksContextValue: unlockContextShape = {
    playerUnlocks,
    setPlayerUnlocks,
  };

  const errorStateValue: errorStateShape = { errorState, setErrorState };
  const scoreContextValue: scoreContextShape = { scoreState, setScoreState };
  const tutorialContextValue: tutorialContextShape = {
    tutorialState,
    setTutorialState,
  };
  const currentSlugContextValue: currentSlugShape = {
    currentSlug,
    setCurrentSlug,
  };

 

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
              <ErrorContext value={errorStateValue}>
                <CurrentSlugContext value={currentSlugContextValue}>
                  <AdminContext value={adminContextValue}>
                    <PlayerContext value={playerContextValue}>
                      <ScoreContext value={scoreContextValue}>
                        <UnlocksContext value={unlocksContextValue}>
                          <TutorialContext value={tutorialContextValue}>
                            {tutorialState.tutorialActive &&
                              createPortal(<TutorialOverlay />, document.body)}
                            <ErrorPage />
                            <NavBar />

                            <div id="content-container">
                              <Routes>
                                <Route
                                  path="/Welcome"
                                  element={<WelcomeScreen />}
                                />
                                <Route
                                  path="/HowToPlay"
                                  element={<HowToPlay />}
                                />
                                <Route
                                  path="/Goodbye"
                                  element={<GoodbyeScreen />}
                                />
                                <Route
                                  path="/HR"
                                  element={<HumanResources />}
                                />
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
                            <Footer>
                              <CurrentSlug pageName={currentSlug} />
                            </Footer>
                          </TutorialContext>
                        </UnlocksContext>
                      </ScoreContext>
                    </PlayerContext>
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
