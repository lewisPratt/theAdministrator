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
  return (
    <div id='main-content'>
      {loadingState ? <h1>Loading</h1> : 
      <div id='content-container'>
      
        
        {adminName === null ?
        <section id='login'>
        <h1>Welcome Administrator</h1>
        <form onSubmit={doLogin}>
          <div id='typing-container'><label htmlFor='admin-name' id='welcome-message'>Please enter your name</label></div>
          <div id='login-input-container'><input type='text' placeholder='Name' id='admin-name' name='admin-name' autoComplete='off' onChange={(e : React.ChangeEvent<HTMLInputElement>) => setTypedName(capitalizeFirstLetter(e.currentTarget.value))} ></input><button id='login-submit-button'>@</button></div>
        </form>
        </section>:
        <section id='welcome-section'>        
        <h1>Welcome Administrator {adminName}.</h1>
        <h2>What would you like to do today?</h2>
        </section>}
      </div>}
    </div>
  )

}

export default App
