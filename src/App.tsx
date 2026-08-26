import React, { useState, type InputHTMLAttributes } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WorkDes from './WorkDes';
import ComSec from './ComSec';
import AdminLogin from './AdminLogin';
import TranscriptRev from './TranscriptRev';
import './App.css'
import ScoreTracker from './ScoreTracker';

function App() {
  const [typedName, setTypedName] = useState<string>("")
  const [adminName, setAdminName] = useState<string | null>(null)
  const [loadingState, setLoadingState] = useState<boolean>(false)
  const [workDes, setWorkDes] = useState<boolean>(false)
  const [transcriptRev, setTranscriptRev] = useState<boolean>(false)
  const [scoreState, setScoreState] = useState<number>(0)

  function setAdmin(name :string){
    setLoadingState(false)
    setAdminName(name)
  }

  //sets app to logged in state and sets admin name
  function doLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoadingState(true)
    setTimeout(setAdmin, 1000, typedName)
  }

  return (
    <>
    <nav> <ScoreTracker scoreState={scoreState} /></nav>
    <div id='main-content'>
     
      <BrowserRouter>
      {loadingState ? <h1>Loading</h1> : 
      <div id='content-container'>
      
        {adminName === null ?
        <AdminLogin doLogin={doLogin} typedNameSetter={setTypedName}/> 
        :
        <>
        {workDes &&
        <WorkDes /> }

        {transcriptRev && 
        <TranscriptRev adminNameSetter={setAdminName} transcriptRevSetter={setTranscriptRev} scoreSetter={setScoreState} scoreState={scoreState}/> }

        {!workDes && !transcriptRev &&
       <ComSec adminName={adminName} adminNameSetter={setAdminName} workDesSetter={setWorkDes} transcriptRevSetter={setTranscriptRev} loadingStateSetter={setLoadingState}/>}
       </>}
      </div>
      }


       <Routes>
        <Route path="/workDes" element={<WorkDes />} />
      </Routes>
      </BrowserRouter>
    </div>
    </>
  )

}

export default App
