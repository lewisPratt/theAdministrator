import { useContext } from "react"
import { PlayerContext } from "../context_providers/PlayerContext"
import { useNavigate } from "react-router-dom"

export default function PageNotFound(){
    const {playerData} = useContext(PlayerContext)
    const navigate = useNavigate()
    return(
        <div id="page-not-found-container">
        <p>The Page was not found.</p>
        {playerData ? <button onClick={()=>navigate("/Terminal")}>Return to Terminal</button> : <button onClick={()=>navigate("/")}>Login</button>}
        </div>
    )
}