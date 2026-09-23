import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkDes from "./WorkDes";
import TranscriptRev from "./TranscriptRev";
import "./assets/css/App.css";
import ScoreTracker from "./ScoreTracker";
import { LoaderCircle } from "lucide-react";
import VoucherShop from "./VoucherShop";
import CommandCentre from "./CommandCentre";
import Login from "./Login";
import { ScoreContext } from "./context_providers/ScoreContext";
import { AdminContext } from "./context_providers/AdminContext";
import type { Dispatch, SetStateAction } from "react";
import Inbox from "./Inbox";
import CommandInput from "./CommandInput";
import NewMessage from "./NewMessage";
import CurrentSlug from "./CurrentSlug";
import { CurrentSlugContext } from "./context_providers/CurrentSlugContext";
import { UnlocksContext } from "./context_providers/unlocksContext";
import NotLoggedIn from "./NotLoggedIn";
import { type unlockContextShape } from "./interfaces";
import { SoundProvider } from "react-sounds";
import SoundControl from "./SoundControl";
import WelcomeScreen from "./WelcomeScreen";
import GoodbyeScreen from "./GoodbyeScreen";
import HumanResources from "./HumanResources";

interface scoreContextShape {
  scoreState: number;
  setScoreState: Dispatch<SetStateAction<number>>;
}
interface adminContextShape {
  adminName: string;
  setAdminName: Dispatch<SetStateAction<string>>;
}
interface currentSlugShape {
  currentSlug: string;
  setCurrentSlug: Dispatch<SetStateAction<string>>;
}

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

  const adminContextValue: adminContextShape = { adminName, setAdminName };
  const unlocksContextValue: unlockContextShape = {
    playerUnlocks,
    setPlayerUnlocks,
  };

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
        <BrowserRouter>
          {loadingState ? (
            <p>
              <LoaderCircle className="loader" />
            </p>
          ) : (
            <SoundProvider>
              <CurrentSlugContext value={currentSlugContextValue}>
                <AdminContext value={adminContextValue}>
                  <ScoreContext value={scoreContextValue}>
                    <UnlocksContext value={unlocksContextValue}>
                      <nav>
                        {adminName != "" ? (
                          <>
                            <SoundControl />

                            <CommandInput adminNameSetter={setAdminName} />
                            <ScoreTracker scoreState={scoreState} />
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
                          <Route path="/Goodbye" element={<GoodbyeScreen />} />
                          <Route path="/HR" element={<HumanResources />} />

                          <Route path="/TheAdministrator" element={<Login />} />
                          <Route
                            path="/CommandCentre"
                            element={<CommandCentre />}
                          />
                          <Route
                            path="/TranscriptReview"
                            element={<TranscriptRev />}
                          />
                          <Route path="/workDes" element={<WorkDes />} />
                          <Route
                            path="/VoucherShop"
                            element={<VoucherShop />}
                          />
                          <Route path="/Inbox" element={<Inbox />} />
                        </Routes>
                        <CurrentSlug pageName={currentSlug} />
                      </div>
                    </UnlocksContext>
                  </ScoreContext>
                </AdminContext>
              </CurrentSlugContext>
            </SoundProvider>
          )}
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
