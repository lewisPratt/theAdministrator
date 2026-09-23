import { useNavigate } from "react-router-dom";
import SoundControl from "./SoundControl";
import type { NotLoggedInShape } from "./interfaces/interfaces";

export default function NotLoggedIn({soundControls}:NotLoggedInShape) {
  const navigate = useNavigate();
  return (
    <>
    { soundControls && <SoundControl />}
    <p>
      you don't seem to be logged in{" "}
      <button
        onClick={() => {
          navigate("/TheAdministrator");
        }}
        id="nav-login-button"
      >
        Login
      </button>
    </p>
    </>
  );
}
