import { Terminal } from "lucide-react";


export default function AvailableCommandsList(){

    return(
        <div id='commands-list-container'>
            <ol>
                <li><Terminal size={16}/> nav.terminal</li>
                <li><Terminal size={16}/> nav.voucher</li>
                <li><Terminal size={16}/> nav.inbox</li>
                <li><Terminal size={16}/> nav.logout</li>
            </ol>
        </div>
    )
}