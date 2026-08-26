import { useState, type Dispatch, type SetStateAction } from "react"
import LeaveReq from "./LeaveReq"
interface comSecProps{
    adminName: string
    adminNameSetter: Dispatch<SetStateAction<string | null>>
    workDesSetter: Dispatch<SetStateAction<boolean>>
    transcriptRevSetter: Dispatch<SetStateAction<boolean>>
    loadingStateSetter: Dispatch<SetStateAction<boolean>>

}

function ComSec({adminName,adminNameSetter, workDesSetter,transcriptRevSetter, loadingStateSetter}: comSecProps){

    const [typedCommand, setTypedCommand] = useState<string>("")
    // const [workDes, setWorkDes] = useState<boolean>(false)
      const [leaveReq, setLeaveReq] = useState<boolean>(false)
       const [exit, setExit] = useState<boolean>(false)
       const [errorState, setErrorState] = useState<boolean>(false)

function loadCommand(setter : Dispatch<SetStateAction<boolean>>){

    setter(true)
    loadingStateSetter(false)
}

    function handleCommand(e : React.SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        e.currentTarget.reset()
        switch (typedCommand) {
            case '[DesStart]':
                workDesSetter(true)
                loadingStateSetter(true)
                setTimeout(loadCommand, 3000,workDesSetter)
                break;
            case '[Review]':
                    loadingStateSetter(true)
                    setTimeout(loadCommand, 3000,transcriptRevSetter)
                break;
            case '[LeaveReq]':
                setLeaveReq(true)
                setErrorState(false)
                break;
            case '[Exit]':
                adminNameSetter(null)
                break;
            default:
                setErrorState(true)
                setLeaveReq(false)
                break;
        }
    }

    return (
        <section id='welcome-section'>        
                <h1>Welcome Administrator {adminName}.</h1>
                <form onSubmit={handleCommand}>
                  <div id='command-typing-container'><label htmlFor='admin-name' id='welcome-message'>What would you like to do today?</label></div>
                  <div id='command-input-container'><input autoFocus type='text' placeholder='[Command]' id='command' name='command' autoComplete='off' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setTypedCommand(e.currentTarget.value)}}  ></input><button id='login-submit-button'>@</button></div>
                </form>
                {leaveReq && <LeaveReq />}
                {errorState && <p>Command Not recognized.</p>}
                <p>Available commands:</p>
                <div className='commands-container'>
                <div className='command-container'><p>Start work designation.</p> <p>[DesStart]</p></div>
                <div className='command-container'><p>Review interview transcripts.</p> <p>[Review]</p></div>
                <div className='command-container'><p>Request leave.</p> <p>[LeaveReq]</p></div>
                <div className='command-container'><p>Exit.</p> <p>[Exit]</p></div>
                <div className='command-container'><p>Available Commands.</p> <p>[Help]</p></div>

                </div>
        
                </section>
    )
}

export default ComSec