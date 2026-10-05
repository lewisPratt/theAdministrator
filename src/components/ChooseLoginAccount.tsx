    import { useNavigate } from "react-router-dom";
import SoundControl from "./SoundControl";
import type { NotLoggedInShape } from "../../interfaces/interfaces";

export default function ChooseLoginAccount(){



  const navigate = useNavigate();
    const =
 
  return (
    
      
      
        <>
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

