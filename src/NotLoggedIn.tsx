import { useNavigate } from "react-router-dom";
import SoundControl from "./SoundControl";

interface NotLoggedInShape{
    soundControls: boolean
}
export default function NotLoggedIn({soundControls}:NotLoggedInShape) {
  const navigate = useNavigate();
  return (
    <>
    { soundControls && <SoundControl />}
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
  );
}
