import  { useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import WorkDes from "./WorkDes";
import TranscriptRev from "./TranscriptRev";
import "./App.css";
import ScoreTracker from "./ScoreTracker";
import { LoaderCircle } from "lucide-react";
import VoucherShop from "./VoucherShop";
import CommandCentre from "./CommandCentre"
import Login from "./Login"; 
import { ScoreContext } from "./context_providers/ScoreContext";
import { AdminContext } from "./context_providers/AdminContext";

import type { Dispatch, SetStateAction } from "react";

interface scoreContextShape {
  scoreState: number;
  setScoreState: Dispatch<SetStateAction<number>>;
}
interface adminContextShape{
    adminName: string
    setAdminName: Dispatch<SetStateAction<string>> 
}

function App() {
  // const [typedName, setTypedName] = useState<string>("");
  const [adminName, setAdminName] = useState<string>('');
  const [loadingState, setLoadingState] = useState<boolean>(false);
  // const [workDes, setWorkDes] = useState<boolean>(false);
  // const [transcriptRev, setTranscriptRev] = useState<boolean>(false);
  const [scoreState, setScoreState] = useState<number>(0);
  
  const adminContextValue : adminContextShape = {adminName, setAdminName}
  const scoreContextValue: scoreContextShape = { scoreState, setScoreState };

  return (
    <>
      <nav>
        {" "}
        <ScoreTracker scoreState={scoreState} />
      </nav>
      <div id="main-content">
        <BrowserRouter>
          {loadingState ? (
            <p>
              <LoaderCircle className="loader" />
            </p>
          ) : (
            <AdminContext value={adminContextValue}>
            <ScoreContext value={scoreContextValue}>
              <div id="content-container">
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/CommandCentre" element={<CommandCentre />} />
                  <Route path="/TranscriptReview" element={<TranscriptRev />} />
                  <Route path="/workDes" element={<WorkDes />} />
                  <Route path="/VoucherShop" element={<VoucherShop />} />
                </Routes>
              </div>
            </ScoreContext>
            </AdminContext>
          )}
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
