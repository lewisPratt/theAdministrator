import { useNavigate } from "react-router-dom";
import SoundControl from "./SoundControl";
import type { NotLoggedInShape } from "../../interfaces/interfaces";
import { useLocation } from "react-router-dom";

export default function NotLoggedIn({ soundControls }: NotLoggedInShape) {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

 
  
  return (
    
      
      
        <>
          {soundControls && <SoundControl mobile={false}/>}
          <p>
            You are not logged in{" "}
            <button
              onClick={() => {
                navigate("/");
              }}
              id="nav-login-button"
            >
              Login
            </button>
          </p>
        </>
  
    
  );
}
