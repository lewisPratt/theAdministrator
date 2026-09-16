import { useNavigate } from "react-router-dom";
import SoundControl from "./SoundControl";
export default function NotLoggedIn() {
  const navigate = useNavigate();
  return (
    <>
    <SoundControl />
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
