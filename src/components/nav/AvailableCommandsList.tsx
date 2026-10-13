import { useContext } from "react";
import { PlayerContext } from "../../context_providers/PlayerContext";


export default function AvailableCommandsList(){
const {playerData} = useContext(PlayerContext)
    console.log(playerData)
    return(
        <div id='commands-list-container'>
            <ol>
                <li>{">"} nav.terminal</li>
                <li>{">"}  nav.review</li>
                <li>{">"}  nav.upgrade</li>
                <li>{">"}  nav.personal</li>
                <li>{">"}  nav.logout</li>
            </ol>
        </div>
    )
}