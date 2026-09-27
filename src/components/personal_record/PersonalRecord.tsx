import UnlockedBadges from "./UnlockedBadges"
import UnlockedPerks from "./UnlockedPerks"
import "../../assets/css/personalRecord.css"
import { Tooltip } from "react-tooltip"
export default function PersonalRecord(){

    return(
    
        <section id="personal-record">
        <p>View your mediocre personal achievements.</p>
        <h2>Unlocks</h2>
        <button id="visit-vouchers">Voucher Terminal</button>
        {/* //badges unlocked component */}
        <UnlockedBadges />
        {/* //perks unlocked component */}
        <UnlockedPerks />
        {/* <UnlockedPerks /> */}
        {/* //total cases reviewed component */}

        {/* //pass/fail ratio */}

        {/* //reset data component */}
                <Tooltip id="unlocks-tooltip" className="custom-tooltip" />

        </section> 

    )
}