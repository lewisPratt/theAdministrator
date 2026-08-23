import { useState } from "react"
import LeaveReq from "./LeaveReq"
interface comSecProps{
    adminName: string

}

function ComSec({adminName}: comSecProps){

    const [typedCommand, setTypedCommand] = useState<string>("")
    const [workDes, setWorkDes] = useState<boolean>(false)
     const [transcriptRev, setTranscriptRev] = useState<boolean>(false)
      const [leaveReq, setLeaveReq] = useState<boolean>(false)
       const [exit, setExit] = useState<boolean>(false)

    function handleCommand(e : React.SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        switch (typedCommand) {
            case '[DesStart]':
                setWorkDes(true)
                break;
            case '[TranscriptRev]':
                setTranscriptRev(true)
                break;
            case '[LeaveReq]':
                setLeaveReq(true)
                break;
            case '[Exit]':
                setExit(true)
                break;
            default:
                break;
        }
    }

    return (
        <section id='welcome-section'>        
                <h1>Welcome Administrator {adminName}.</h1>
                <form onSubmit={handleCommand}>
                  <div id='command-typing-container'><label htmlFor='admin-name' id='welcome-message'>What would you like to do today?</label></div>
                  <div id='command-input-container'><input type='text' placeholder='[Command]' id='command' name='command' autoComplete='off' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setTypedCommand(e.currentTarget.value)}}  ></input><button id='login-submit-button'>@</button></div>
                </form>
                {leaveReq && <LeaveReq />}
                <p>Available commands:</p>
                <div className='commands-container'>
                <div className='command-container'><p>Start work designation.</p> <p>[DesStart]</p></div>
                <div className='command-container'><p>Review interview transcripts.</p> <p>[TranscriptRev]</p></div>
                <div className='command-container'><p>Request leave.</p> <p>[LeaveReq]</p></div>
                <div className='command-container'><p>Logout.</p> <p>[Exit]</p></div>
                </div>
        
                </section>
    )
}

export default ComSec