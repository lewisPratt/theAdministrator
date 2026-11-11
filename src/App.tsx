import { useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import TranscriptRev from "./components/case_review/CaseReview";
import "./assets/css/App.css";
import "./assets/css/tutorial.css";
import "./assets/css/nav.css";

import UpgradeShop from "./components/upgrade_shop/UpgradeShop";
import CommandCentre from "./components/terminal/Terminal";
import Login from "./components/login/Login";
import Inbox from "./components/inbox/Inbox";
import CurrentSlug from "./components/footer/CurrentSlug";
import { CurrentSlugContext } from "./context_providers/CurrentSlugContext";
import {
  type currentSlugShape,
  type errorStateShape,
  type tutorialContextShape,
  type tutorialStateShape,
  type playerDataShape,
  type playerContextShape,
} from "./interfaces/interfaces";
import { SoundProvider } from "react-sounds";
import WelcomeScreen from "./components/login/WelcomeScreen";
import GoodbyeScreen from "./components/login/GoodbyeScreen";
import AboutGame from "./components/about/AboutGame";
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
import PageNotFound from "./components/PageNotFound";

function App() {
  const [playerData, setPlayerData] = useState<playerDataShape | null>(null);

  const [currentSlug, setCurrentSlug] = useState<string>("nav.terminal");
  const [errorState, setErrorState] = useState<string>("");
  const [tutorialState, setTutorialState] = useState<tutorialStateShape>({
    tutorialActive: false,
    tutorialStep: 0,
  });

  const playerContextValue: playerContextShape = { playerData, setPlayerData };

  const errorStateValue: errorStateShape = { errorState, setErrorState };
  const tutorialContextValue: tutorialContextShape = {
    tutorialState,
    setTutorialState,
  };
  const currentSlugContextValue: currentSlugShape = {
    currentSlug,
    setCurrentSlug,
  };

  return (
    <>
      <div id="main-content">
        <HashRouter>
          <SoundProvider>
            <ErrorContext value={errorStateValue}>
              <CurrentSlugContext value={currentSlugContextValue}>
                <PlayerContext value={playerContextValue}>
                  <TutorialContext value={tutorialContextValue}>
                    {tutorialState.tutorialActive &&
                      createPortal(<TutorialOverlay />, document.body)}
                    <ErrorPage />
                    <header>
                      <NavBar />
                    </header>

                    <main>
                      <div id="content-container">
                        <Routes>
                          <Route path="/Welcome" element={<WelcomeScreen />} />
                          <Route path="/HowToPlay" element={<HowToPlay />} />
                          <Route path="/Goodbye" element={<GoodbyeScreen />} />
                          <Route path="/About" element={<AboutGame />} />
                          <Route
                            path="PersonalRecord"
                            element={<PersonalRecord />}
                          />
                          <Route path="Stats" element={<Stats />} />
                          <Route path="/" element={<Login />} />
                          <Route path="/Terminal" element={<CommandCentre />} />
                          <Route
                            path="/CaseReview"
                            element={<TranscriptRev />}
                          />
                          <Route
                            path="/UpgradeShop"
                            element={<UpgradeShop />}
                          />
                          <Route path="/Inbox" element={<Inbox />} />
                          <Route path="*" element={<PageNotFound />} />
                        </Routes>
                      </div>
                    </main>
                    <Footer>
                      <CurrentSlug pageName={currentSlug} />
                    </Footer>
                  </TutorialContext>
                </PlayerContext>
              </CurrentSlugContext>
            </ErrorContext>
          </SoundProvider>
        </HashRouter>
      </div>
    </>
  );
}

export default App;
