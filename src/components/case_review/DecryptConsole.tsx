import { useContext, useEffect, useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react"
import type { encryptedDriveShape, reviewShape } from "../../interfaces/interfaces"
import { LoaderCircle } from "lucide-react";
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
    const [loadData, setLoadData] = useState<boolean>(false)
    const {playerData, setPlayerData} = useContext(PlayerContext)
    const lastTimestamp = useRef(0)
    const decryptTimerLength = 20000
    let timer = useRef(0)
    let intervalTimer = useRef(0)
    let [success,setSuccess] = useState<boolean>(false)
    let failedReason = useRef("")

    
useEffect(()=>{
    //set up timer for decrypt attempt
    if(decryptState){
         timer.current = setTimeout(() => {
            failedReason.current = "Self delete function executed."
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

//setup timer for successful decrypt to simulate data loading.
useEffect(()=>{
    if(success === true){
        
        const successTimer = setTimeout(() => {
            setLoadData(false)
        }, 2000);

        return () => clearTimeout(successTimer)
    }
},[success])


    function lockDevice(){
          if(transcriptList && transcript){
            let allTranscripts = [...transcriptList];
            let foundTranscript = allTranscripts.find(
            (t) => t.identifier === transcript.identifier,
            );
            if (foundTranscript) {
                foundTranscript.encryptedDrive.driveLocked = true
                foundTranscript.encryptedDrive.failedReason = failedReason.current
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
                setLoadData(true)
                setSuccess(true)
                if(decryptState){setDecryptState(false)}

            }
        }
    }

    function checkInput(e:ChangeEvent<HTMLInputElement>){
        //check the typed input against the drive key to see if it matches. if a mistake, give one chance then lock drive?
        const currentValue = e.currentTarget.value
        const driveKeyCharacters = [...decryptobj.driveKey]
        const currentCharacters = [...e.currentTarget.value]
        if(currentCharacters.length === 0){
            setCompletionPerc(0)
        }
        for (let index = 0; index < currentCharacters.length; index++) {
            const element = currentCharacters[index];
            if(driveKeyCharacters[index] != element){
                //first mistake, give warning
                if(chances>1){
                    setChances(chances -1)
                }else{
                    //second mistake, decrypt error, lock device
                    failedReason.current = "You failed to decrypt the device due to a Spelling Error."
                   lockDevice()
                }
            }
        }
           
        //key is being correctly entered so far
        const totalCharacterCount = driveKeyCharacters.length
        const currentCharCount = currentCharacters.length

        const perc = Math.floor(100 / ( totalCharacterCount / currentCharCount))
        setCompletionPerc(perc)

        if(totalCharacterCount === currentCharCount && currentValue === decryptobj.driveKey){
            //successfully entered key
            
            if(playerData){
                let dataToUpdate = { ...playerData };
                dataToUpdate.player_credits += decryptobj.contents.creditReward
                dataToUpdate.player_stats.total_credits_earned += decryptobj.contents.creditReward
                dataToUpdate.player_stats.devices_unlocked +=  1
                console.log(dataToUpdate.player_stats.devices_unlocked)
                setPlayerData(dataToUpdate)
            }
            deviceDecrypted()
            clearTimeout(timer.current)
            clearInterval(intervalTimer.current)

        }else{
            //not yet at required character count
        }
            

            
        }
    

    return(
        <>
            {/* if the device has successfully been decrypted */}
            {decryptobj.driveDecrypted ? 
            <>
                {!loadData ? 
                    <>
                    <h2>Device decrypted</h2> 
                    <p className="mt-20">Revealed content: <br /><br /><span className="decrypted-data-find">{decryptobj.contents.text}</span></p> 
                    <p className="mt-20">Also discovered <span className="decrypted-data-find">{decryptobj.contents.creditReward} credits</span> worth of Crypto</p>
                    </>
                    :
                    <LoaderCircle className="loader mt-20"/>
                }
            </>
            :
                
                <>
                {/* if the device has successfully been decrypted */}
                {decryptobj.driveLocked ? 
                
                    <>
                        <h2>DecryptError</h2> 
                        <p className="mt-20">{decryptobj.failedReason} <br/>Data lost. </p>
                    </>
                    :
                    <>
                        <p className="mt-20">correctly enter encryption key to access data.</p>
                        {!decryptState && <button className="mt-20" onClick={()=>setDecryptState(true)}>Start</button>}
                        {/* if decrypt attempt hasn't yet started */}
                        {decryptState &&
                        <>
                        {/* if currently decrypting*/}
                            <p id="decrypt-key">{decryptobj.driveKey}</p>
                            
                            {chances === 1 && <p className="mt-20">DecryptError: You have one attempt remaining.</p>}
                            <progress className="mt-20 decrypt-count-down" value={timerProgress} max={100} >Progress</progress>
                            <input onChange={(e)=>{checkInput(e)}} className="decrypt-input" type="text"></input>
                            
                            <progress className="mt-20" value={completionPerc} max={100} >Progress</progress>
                            
                            </>
                        }
                    </>
                }
                </>
            }
        </>
    )

}