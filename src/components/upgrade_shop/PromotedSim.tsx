import { LoaderCircle, X } from "lucide-react";
import { useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { promotionPrefixes } from "../../generator_modules/titles";
import { PlayerContext } from "../../context_providers/PlayerContext";
import "../../assets/css/promotion_overlay.css"

interface PromotedSimProps{
    promotedSetter: Dispatch<SetStateAction<boolean>>
    promoted: boolean
}


export default function PromotedSim({promoted, promotedSetter} : PromotedSimProps){
    const [promotionLoading, setPromotionLoading] = useState<boolean>(true)
    const [promotionTitle, setPromotionTitle] = useState<string>("")
    const {playerData, setPlayerData} = useContext(PlayerContext)
    //timer to simulate promotion loading state
    const promoTimer = setTimeout(selectTitle, 2000);

    //close overlay when overlay is clicked.
    function closeOverlay(e: React.MouseEvent<HTMLDivElement>) {
        const clickedTarget = e.target as HTMLDivElement;
        if (clickedTarget.id === "promotion-overlay") {
        promotedSetter(false)
        }
    }

    function selectTitle(){
        
        if(playerData){
            const playerTitles = playerData.player_titles
            const availableTitles :string[] = []
            let newTitle : string
            if(playerTitles.length > 0){
                promotionPrefixes.forEach(prefix => {
                    let flag = false
                    playerTitles.forEach(title => {
                        if(title === prefix) {flag = true}
                    });
                        if(!flag) availableTitles.push(prefix) 
                });
            }
            if(availableTitles.length > 0){
                newTitle = availableTitles[Math.floor(Math.random() * availableTitles.length) ]
            }
            else{
                newTitle = promotionPrefixes[Math.floor(Math.random() * promotionPrefixes.length) ]
            }
            setPromotionLoading(false)
            const dataToUpdate = { ...playerData };
    
            let updatedTitles: string[] = [];
            if (dataToUpdate.player_titles != null) {
                updatedTitles = [...dataToUpdate.player_titles];
            }
            updatedTitles.push(newTitle);
            dataToUpdate.player_titles = updatedTitles
            setPlayerData(dataToUpdate);
            setPromotionTitle(newTitle)
        }
    }

    //clear promotion timer when title has been chosen.
    useEffect(()=>{
        if(promotionTitle != ""){
            clearTimeout(promoTimer)
        }
    },[promotionTitle,promoTimer])

    //clear timer if component unmounts
    useEffect(()=>{
        return ()=>clearTimeout(promoTimer)
    },[promoTimer])


    return (
        <>
        {promoted ?
        <div id="promotion-overlay" onClick={(e)=>{closeOverlay(e)}}>
            <div id="promotion-box">
            {promotionLoading ?
            (
                //loading state
                <>
                <h3>Determining promotion route</h3>
                <LoaderCircle className="loader" />
                </>
            ):
            (
                //display promotion state
                <p>{promotionTitle} Administrator</p>
            )}
            <button autoFocus onClick={()=>{promotedSetter(false)}}><X /></button>
            </div>
        </div>
        :
            ""

        }
        </>
    );
    
}