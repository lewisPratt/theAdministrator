import { useState, type SetStateAction } from "react"
import type { Dispatch } from "react";
interface adminLoginProps{
    doLogin: (e: React.SubmitEvent<HTMLFormElement>)=> void
    typedNameSetter: Dispatch<SetStateAction<string>>
}

function AdminLogin({doLogin, typedNameSetter} : adminLoginProps){


  function capitalizeFirstLetter(val : string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

return(
     <section id='login'>
            <h1>Welcome Administrator</h1>
            <form onSubmit={doLogin}>
              <div id='login-typing-container'><label htmlFor='admin-name' id='welcome-message'>Please enter your name</label></div>
              <div id='login-input-container'><input type='text' placeholder='Name' id='admin-name' name='admin-name' autoComplete='off' onChange={(e : React.ChangeEvent<HTMLInputElement>) => typedNameSetter(capitalizeFirstLetter(e.currentTarget.value))} ></input><button id='login-submit-button'>@</button></div>
            </form>
            </section>
)
}

export default AdminLogin