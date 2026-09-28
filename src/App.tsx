import { useEffect, useState } from "react";
import {Routes, Route, HashRouter } from "react-router-dom";
import TranscriptRev from "./components/TranscriptRev";
import "./assets/css/App.css";
import "./assets/css/nav.css"

import ScoreTracker from "./components/ScoreTracker";
import { LoaderCircle } from "lucide-react";
import VoucherShop from "./components/VoucherShop";
import CommandCentre from "./components/Terminal";
import Login from "./components/login/Login";
import { ScoreContext } from "./context_providers/ScoreContext";
import { AdminContext } from "./context_providers/AdminContext";
import Inbox from "./components/Inbox";
import CommandInput from "./components/CommandInput";
import NewMessage from "./components/NewMessage";
import CurrentSlug from "./components/CurrentSlug";
import { CurrentSlugContext } from "./context_providers/CurrentSlugContext";
import { UnlocksContext } from "./context_providers/unlocksContext";
import NotLoggedIn from "./components/NotLoggedIn";
import {
  type unlockContextShape,
  type currentSlugShape,
  type adminContextShape,
  type scoreContextShape,
  type errorStateShape,
} from "./interfaces/interfaces";
import { SoundProvider } from "react-sounds";
import SoundControl from "./components/SoundControl";
import WelcomeScreen from "./components/login/WelcomeScreen";
import GoodbyeScreen from "./components/login/GoodbyeScreen";
import HumanResources from "./components/HumanResources";
import PersonalRecord from "./components/personal_record/PersonalRecord";
import LoginAbout from "./components/login/LoginAbout";
import MobileMenu from "./components/MobileMenu";
import Footer from "./components/footer/Footer";
import ErrorPage from "./components/error_page/ErrorPage";
import { ErrorContext } from "./context_providers/ErrorContext";

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

  const adminContextValue: adminContextShape = { adminName, setAdminName };
  const unlocksContextValue: unlockContextShape = {
    playerUnlocks,
    setPlayerUnlocks,
  };

  const errorStateValue : errorStateShape = {errorState, setErrorState};
  const scoreContextValue: scoreContextShape = { scoreState, setScoreState };
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
                      <ErrorPage />
                      <nav>
                        {adminName != "" ? (
                          <>
                            <div id="desktop-nav">
                              <SoundControl mobile={false}/>

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
                          <Route path="/WhatIsThis" element={<LoginAbout />} />
                          <Route path="/Goodbye" element={<GoodbyeScreen />} />
                          <Route path="/HR" element={<HumanResources />} />
                          <Route
                            path="PersonalRecord"
                            element={<PersonalRecord />}
                          />
                          <Route path="/TheAdministrator" element={<Login />} />
                          <Route
                            path="/Terminal"
                            element={<CommandCentre />}
                          />
                          <Route
                            path="/TranscriptReview"
                            element={<TranscriptRev />}
                          />
                          <Route
                            path="/VoucherShop"
                            element={<VoucherShop />}
                          />
                          <Route path="/Inbox" element={<Inbox />} />
                        </Routes>
                        
                      </div>
                      <Footer >
                          <CurrentSlug pageName={currentSlug} />
                        </Footer>
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
