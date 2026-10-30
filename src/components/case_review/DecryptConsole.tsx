import { useState } from "react"
import type { encryptedDriveShape } from "../../interfaces/interfaces"

interface decryptProps{
    decryptobj : encryptedDriveShape
}

export default function DecryptConsole({decryptobj}:decryptProps){

    const [decryptState, setDecryptState] = useState<boolean>(false)


    return(
        <>
            <button className="mt-20" onClick={()=>{setDecryptState(true)}}>Start</button>

            {decryptState && <p id="decrypt-key">{decryptobj.driveKey}</p>}

            <input className="decrypt-input" type="text"></input>
        </>
    )

}