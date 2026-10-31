import { useContext, useEffect, useRef, useState, type ChangeEvent, type Dispatch, type InputEvent, type SetStateAction } from "react"
import type { encryptedDriveShape, reviewShape } from "../../interfaces/interfaces"
import { User } from "lucide-react";
import { PlayerContext } from "../../context_providers/PlayerContext";


interface decryptProps{
    decryptobj : encryptedDriveShape
    transcript: reviewShape
    setTranscriptList: Dispatch<SetStateAction<reviewShape[] | null>>;
    transcriptList: reviewShape[] | null
}

export default function DecryptConsole({decryptobj, transcriptList,transcript,setTranscriptList}:decryptProps){

    const [chances, setChances] = useState<number>(2)
    const [completionPerc, setCompletionPerc] = useState<number>(0)
    const [decryptState, setDecryptState] = useState<boolean>(false)
    const [timerProgress, setTimerProgress] = useState<number>(100)
    const {playerData, setPlayerData} = useContext(PlayerContext)
    const lastTimestamp = useRef(0)
    const decryptTimerLength = 20000
    let timer = useRef(0)
    let intervalTimer = useRef(0)
    let creditReward = useRef(0)
    
useEffect(()=>{
    //set up timer for decrypt attempt
    if(decryptState){
         timer.current = setTimeout(() => {
            lockDevice()
        }, decryptTimerLength);
        //interval timer to update timer progress bar
         intervalTimer.current = setInterval(() => {
            const currentTimestamp = Date.now()
            if(lastTimestamp.current === 0){
                lastTimestamp.current = currentTimestamp
            }
             const timerPerc = Math.floor(100 / ( decryptTimerLength / Math.floor(currentTimestamp - lastTimestamp.current)))
             const newPerc = timerProgress - timerPerc
            setTimerProgress(newPerc)

        }, 50);

        return () => {clearTimeout(timer.current) ,clearInterval(intervalTimer.current)};
    }

},[decryptState])


    function lockDevice(){
          if(transcriptList && transcript){
            let allTranscripts = [...transcriptList];
            let foundTranscript = allTranscripts.find(
            (t) => t.identifier === transcript.identifier,
            );
            if (foundTranscript) {
                foundTranscript.encryptedDrive.driveLocked = true
                setTranscriptList(allTranscripts);
                if(decryptState)setDecryptState(false)
            }
        }
    }

    function deviceDecrypted(){
         if(transcriptList && transcript){
            let allTranscripts = [...transcriptList];
            let foundTranscript = allTranscripts.find(
            (t) => t.identifier === transcript.identifier,
            );
            if (foundTranscript) {
                foundTranscript.encryptedDrive.driveDecrypted = true
                setTranscriptList(allTranscripts);
                if(decryptState)setDecryptState(false)
            }
        }
    }

    function checkInput(e:ChangeEvent<HTMLInputElement>){
        //check the typed input against the drive key to see if it matches. if a mistake, give one chance then lock drive?
        const driveKeyCharacters = [...decryptobj.driveKey]
        const currentCharacters = [...e.currentTarget.value]
        if(currentCharacters.length === 0){
            setCompletionPerc(0)
        }
        for (let index = 0; index < currentCharacters.length; index++) {
            const element = currentCharacters[index];
            if(driveKeyCharacters[index] != element){
                if(chances>1){
                    setChances(chances -1)
                }else{
                    //update case in transcript list so when the case is closed and reopened, you cannot tryo to decrypt again. 
                   lockDevice()
                }
            }
            else{
                //key is being correctly entered so far
                const totalCharacterCount = driveKeyCharacters.length
                const currentCharCount = currentCharacters.length

                const perc = Math.floor(100 / ( totalCharacterCount / currentCharCount))
                setCompletionPerc(perc)
                if(totalCharacterCount === currentCharCount){
                    //succesfully entered
                 
                    if(playerData){
                        let dataToUpdate = { ...playerData };
                        dataToUpdate.player_credits += decryptobj.contents.creditReward
                        setPlayerData(dataToUpdate)
                    }
                    deviceDecrypted()
                    clearTimeout(timer.current)
                    clearInterval(intervalTimer.current)

                }
            }

            
        }
    }

    return(
        <>
            {/* if the device has successfully been decrypted */}
            {decryptobj.driveDecrypted ? 
            <>
                <h2>Device decrypted</h2> 
                <p className="mt-20">Revealed content: <br /><br />{"\""}{decryptobj.contents.text}{"\""}</p> 
                <p className="mt-20">Also discovered {decryptobj.contents.creditReward} credits worth of Crypto</p>
            </>
            :
                
                <>
                {/* if the device has successfully been decrypted */}
                {decryptobj.driveLocked ? 
                
                    <p className="mt-20"><h2>DecryptError</h2> You failed to correctly decrypt the drive. <br/>Data lost. </p>
                    :
                    <>
                    <p className="mt-20">Enter the encryption key correctly to access the data.</p>
                    {!decryptState && <button onClick={()=>setDecryptState(true)}>Start</button>}
                    {/* if decrypt attempt hasn't yet started */}
                    {decryptState &&
                    <>
                    {/* if currently decrypting*/}
                        <p id="decrypt-key">{decryptobj.driveKey}</p>
                        
                        {chances === 1 && <p className="mt-20">DecryptError: You have one attempt remaining.</p>}
                        <input onChange={(e)=>{checkInput(e)}} className="decrypt-input" type="text"></input>
                        
                        <progress className="mt-20" value={completionPerc} max={100} >Progress</progress>
                        <progress className="mt-20" value={timerProgress} max={100} >Progress</progress>
                        </>
                    }
                    </>
                }
                </>
            }
        </>
    )

}