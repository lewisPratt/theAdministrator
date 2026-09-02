import React, { useState, type InputHTMLAttributes } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import WorkDes from "./WorkDes";
import TranscriptRev from "./TranscriptRev";
import "./App.css";
import ScoreTracker from "./ScoreTracker";
import { LoaderCircle } from "lucide-react";
import VoucherShop from "./VoucherShop";
import { Outlet } from "react-router-dom";
import CommandCentre from "./CommandCentre"
import Login from "./Login"; 
import { createContext } from "react";
import { ScoreContext } from "./ScoreContext";
import { AdminContext } from "./AdminContext";

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
  // function setAdmin(name: string) {
  //   setLoadingState(false);
  //   setAdminName(name);
  // }

  //   function setAdmin(name: string) {
  //   setLoadingState(false);

  //   window.location.href = '/comSec/'+name
  // }
  // //sets app to logged in state and sets admin name
  // function doLogin(e: React.SubmitEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   if (typedName) {
  //     setAdminName(typedName);
  //     setLoadingState(true);
  //     setTimeout(setAdmin, 1000, typedName);
  //   } else {
  //     //no name entered so do nothing or show error
  //   }
  // }
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
                  <Route path="/voucher-shop" element={<VoucherShop />} />
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
