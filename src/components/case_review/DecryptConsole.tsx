import { useEffect, useState, type ChangeEvent, type Dispatch, type InputEvent, type SetStateAction } from "react"
import type { encryptedDriveShape, reviewShape } from "../../interfaces/interfaces"

interface decryptProps{
    decryptobj : encryptedDriveShape
    transcript: reviewShape
    setTranscriptList: Dispatch<SetStateAction<reviewShape[] | null>>;
    transcriptList: reviewShape[] | null
}

export default function DecryptConsole({decryptobj, transcriptList,transcript,setTranscriptList}:decryptProps){

    const [chances, setChances] = useState<number>(2)
    const [completionPerc, setCompletionPerc] = useState<number>(0)
    console.log(decryptobj.driveLocked)
    function checkInput(e:ChangeEvent<HTMLInputElement>){
        //check the typed input against the drive key to see if it matches. if a mistake, give one chance then lock drive?
        const driveKeyCharacters = [...decryptobj.driveKey]
        const currentCharacters = [...e.currentTarget.value]
        
        for (let index = 0; index < currentCharacters.length; index++) {
            const element = currentCharacters[index];
            if(driveKeyCharacters[index] != element){
                if(chances>1){
                    setChances(chances -1)
                    e.currentTarget.value = ""
                    setCompletionPerc(0)
                }else{
                    //update case in transcript list so when the case is closed and reopened, you cannot tryo to decrypt again. 
                    if(transcriptList && transcript){
                        let allTranscripts = [...transcriptList];
                        let foundTranscript = allTranscripts.find(
                        (t) => t.identifier === transcript.identifier,
                        );
                        if (foundTranscript) {
                            console.log("setting lock")
                            foundTranscript.encryptedDrive.driveLocked = true
                            setTranscriptList(allTranscripts);
                             
                        }
                    }
                }
            }
            else{
                //key is being correctly entered so far
                const totalCharacterCount = driveKeyCharacters.length
                const currentCharCount = currentCharacters.length

                const perc = Math.floor(100 / ( totalCharacterCount / currentCharCount))
                setCompletionPerc(perc)
            }

            
        }
    }

    return(
        <>
            {decryptobj.driveLocked ? 
            
                <p className="mt-20">DecryptError: You failed to correctly decrypt the drive. Data lost. </p>
                :
                <>
                <p className="mt-20">Enter the encryption key correctly to access the data.</p>

                <p id="decrypt-key">{decryptobj.driveKey}</p>
                
                {chances === 1 && <p className="mt-20">DecryptError: You have one attempt remaining.</p>}
                <input onChange={(e)=>{checkInput(e)}} className="decrypt-input" type="text"></input>
                
                <progress value={completionPerc} max={100}></progress>
                </>
            }
           
        </>
    )

}