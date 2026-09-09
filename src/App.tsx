import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkDes from "./WorkDes";
import TranscriptRev from "./TranscriptRev";
import "./App.css";
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
  const [loadingState, setLoadingState] = useState<boolean>(false);
  // const [workDes, setWorkDes] = useState<boolean>(false);
  // const [transcriptRev, setTranscriptRev] = useState<boolean>(false);
  const [scoreState, setScoreState] = useState<number>(0);
  const [instructionsPrompt, setInstructionsPrompt] = useState<boolean>(true);
  const [currentSlug, setCurrentSlug] = useState<string>("nav.terminal")

  const adminContextValue: adminContextShape = { adminName, setAdminName };
  const scoreContextValue: scoreContextShape = { scoreState, setScoreState };
  const currentSlugContextValue: currentSlugShape = { currentSlug, setCurrentSlug };

  //if user dismissed the message notification then logged out and logged back in, show the message notification again
  //ensures a consistent approach if user logs out and back in with the same or different username.
  //may adjust when moving to localstorage for game progress (record if its been dismissed locally and conditionally render)
  useEffect(() => {
    if (adminName === "") {
      
  
      setInstructionsPrompt(true);
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
            <CurrentSlugContext value={currentSlugContextValue}>
            <AdminContext value={adminContextValue}>
              <ScoreContext value={scoreContextValue}>
                <nav>
                  {adminName != "" && (
                    <>
                      <CurrentSlug pageName={currentSlug} />
                      <CommandInput adminNameSetter={setAdminName} />
                      <ScoreTracker scoreState={scoreState} />
                    </>
                  )}
                  {instructionsPrompt && adminName != "" && (
                    <NewMessage messageStateSetter={setInstructionsPrompt} />
                  )}
                </nav>
                <div id="content-container">
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/CommandCentre" element={<CommandCentre />} />
                    <Route
                      path="/TranscriptReview"
                      element={<TranscriptRev />}
                    />
                    <Route path="/workDes" element={<WorkDes />} />
                    <Route path="/VoucherShop" element={<VoucherShop />} />
                    <Route path="/Inbox" element={<Inbox />} />
                  </Routes>
                </div>
              </ScoreContext>
            </AdminContext>
            </CurrentSlugContext>
          )}
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
