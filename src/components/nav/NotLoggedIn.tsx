import { useNavigate } from "react-router-dom";
import SoundControl from "./SoundControl";
import type { NotLoggedInShape } from "../../interfaces/interfaces";
import { useLocation } from "react-router-dom";

export default function NotLoggedIn({ soundControls }: NotLoggedInShape) {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  {/* check to see if the current route is the login, welcome or goodbye page, if so, disable component */}
  let componentEnabled : boolean = true
  if(pathname === "/" || pathname === "/Goodbye" ||  pathname === "/Welcome" || pathname === "/HowToPlay"){
    componentEnabled= false
  }
  
  return (
    <>
      
      {componentEnabled && (
        <>
          {soundControls && <SoundControl mobile={false}/>}
          <p>
            you don't seem to be logged in{" "}
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
      )}
    </>
  );
}
