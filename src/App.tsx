import React, { useState, type InputHTMLAttributes } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WorkDes from './WorkDes';
import ComSec from './ComSec';
import AdminLogin from './AdminLogin';
import TranscriptRev from './TranscriptRev';
import './App.css'

function App() {
  const [typedName, setTypedName] = useState<string>("")
  const [adminName, setAdminName] = useState<string | null>(null)
  const [loadingState, setLoadingState] = useState<boolean>(false)
  const [workDes, setWorkDes] = useState<boolean>(false)
     const [transcriptRev, setTranscriptRev] = useState<boolean>(false)

  function setAdmin(name :string){
    setLoadingState(false)
    setAdminName(name)
  }

  //sets app to logged in state and sets admin name
  function doLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoadingState(true)
    setTimeout(setAdmin, 3000, typedName)
  }

  return (
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
        <TranscriptRev adminNameSetter={setAdminName} transcriptRevSetter={setTranscriptRev}/> }

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
  )

}

export default App
