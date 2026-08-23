import React, { useState, type InputHTMLAttributes } from 'react'

import './App.css'

function App() {
  const [typedName, setTypedName] = useState<string>("")
  const [adminName, setAdminName] = useState<string | null>(null)
  const [loadingState, setLoadingState] = useState<boolean>(false)

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
  function capitalizeFirstLetter(val : string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function handleCommand(){
  
}
  return (
    <div id='main-content'>
      {loadingState ? <h1>Loading</h1> : 
      <div id='content-container'>
      
        
        {adminName === null ?
        <section id='login'>
        <h1>Welcome Administrator</h1>
        <form onSubmit={doLogin}>
          <div id='login-typing-container'><label htmlFor='admin-name' id='welcome-message'>Please enter your name</label></div>
          <div id='login-input-container'><input type='text' placeholder='Name' id='admin-name' name='admin-name' autoComplete='off' onChange={(e : React.ChangeEvent<HTMLInputElement>) => setTypedName(capitalizeFirstLetter(e.currentTarget.value))} ></input><button id='login-submit-button'>@</button></div>
        </form>
        </section>:
        <section id='welcome-section'>        
        <h1>Welcome Administrator {adminName}.</h1>
        <form onSubmit={handleCommand}>
          <div id='command-typing-container'><label htmlFor='admin-name' id='welcome-message'>What would you like to do today?</label></div>
          <div id='command-input-container'><input type='text' placeholder='[Command]' id='command' name='command' autoComplete='off' onChange={(e : React.ChangeEvent<HTMLInputElement>) => setTypedName(capitalizeFirstLetter(e.currentTarget.value))} ></input><button id='login-submit-button'>@</button></div>
        </form>
        <p>Available commands:</p>
        <div className='commands-container'>
        <div className='command-container'><p>Start work designation.</p> <p>[DesStart]</p></div>
        <div className='command-container'><p>Review interview transcripts.</p> <p>[TranscriptRev]</p></div>
        <div className='command-container'><p>Request leave.</p> <p>[LeaveReq]</p></div>
        <div className='command-container'><p>Logout.</p> <p>[Exit]</p></div>
        </div>

        </section>}
      </div>}
    </div>
  )

}

export default App
