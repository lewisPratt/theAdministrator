import { useNavigate } from "react-router-dom";

export default function NotLoggedIn() {
  const navigate = useNavigate();
  return (
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
  );
}
