import { useEffect, useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import TranscriptRev from "./components/case_review/CaseReview";
import "./assets/css/App.css";
import "./assets/css/tutorial.css";
import "./assets/css/nav.css";

import { LoaderCircle } from "lucide-react";
import UpgradeShop from "./components/upgrade_shop/UpgradeShop";
import CommandCentre from "./components/terminal/Terminal";
import Login from "./components/login/Login";
import { AdminContext } from "./context_providers/AdminContext";
import Inbox from "./components/inbox/Inbox";
import CurrentSlug from "./components/footer/CurrentSlug";
import { CurrentSlugContext } from "./context_providers/CurrentSlugContext";
import {
  type currentSlugShape,
  type adminContextShape,
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
import Stats from "./components/statistics/Stats";
function App() {
  // const [typedName, setTypedName] = useState<string>("");
  const [adminName, setAdminName] = useState<string>("");
  const [playerData, setPlayerData] = useState<playerDataShape | null>(null);
  const [loadingState, _setLoadingState] = useState<boolean>(false);

  const [_instructionsPrompt] = useState<boolean>(true);
  const [currentSlug, setCurrentSlug] = useState<string>("nav.terminal");
  const [_terminalLoaded, setTerminalLoaded] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<string>("");
  const [tutorialState, setTutorialState] = useState<tutorialStateShape>({
    tutorialActive: false,
    tutorialStep: 0,
  });

  const playerContextValue: playerContextShape = { playerData, setPlayerData };
  const adminContextValue: adminContextShape = { adminName, setAdminName };


  const errorStateValue: errorStateShape = { errorState, setErrorState };
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
                                <Route
                                  path="Stats"
                                  element={<Stats />}
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
