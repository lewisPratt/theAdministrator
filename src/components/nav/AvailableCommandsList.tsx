import { Terminal } from "lucide-react";
import { useContext } from "react";
import { PlayerContext } from "../../context_providers/PlayerContext";


export default function AvailableCommandsList(){
const {playerData} = useContext(PlayerContext)
    console.log(playerData)
    return(
        <div id='commands-list-container'>
            <ol>
                <li><Terminal size={16}/> nav.terminal</li>
                <li><Terminal size={16}/> nav.upgrade</li>
                <li><Terminal size={16}/> nav.inbox</li>
                <li><Terminal size={16}/> nav.logout</li>
            </ol>
        </div>
    )
}