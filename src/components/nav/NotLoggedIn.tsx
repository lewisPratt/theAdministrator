import { useNavigate } from "react-router-dom";
import SoundControl from "./SoundControl";
import type { NotLoggedInShape } from "../../interfaces/interfaces";

export default function NotLoggedIn({ soundControls, dataError}: NotLoggedInShape) {
  const navigate = useNavigate();

 
  
  return (
    
      
      
        <>
          {soundControls && <SoundControl />}
           <div id="page-not-found-container">
            {dataError != null && 
            <p>{dataError}</p>}
        <p>You are not logged in</p>
        <button onClick={()=>navigate("/")}>Login</button>
        </div>
        </>
  
    
  );
}
