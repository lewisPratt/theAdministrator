import React, { useState, type InputHTMLAttributes } from 'react'

import './App.css'

function App() {
  const [typedName, setTypedName] = useState<string>("")
  const [adminName, setAdminName] = useState<string | null>(null)



  //sets app to logged in state and sets admin name
  function doLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setAdminName(typedName)
  }

  return (
    <div id='main-content'>
      <section id='login'>
        {adminName === null ?
        <>
        <h1>Welcome Administrator</h1>
        <form onSubmit={doLogin}>
          <div id='typing-container'><label htmlFor='admin-name' id='welcome-message'>Please enter your name</label></div>
          <input type='text' placeholder='Name' id='admin-name' name='admin-name' autoComplete='off' onChange={(e : React.ChangeEvent<HTMLInputElement>) => setTypedName(e.currentTarget.value)} ></input>

        </form>
        </> :
        <h1>Welcome Administrator {adminName}</h1>}
        <h2>What would you like to do today?Ì</h2>
      </section>
    </div>
  )

}

export default App
