import { useContext} from "react";
import "../../assets/css/error_page.css";
import { ErrorContext } from "../../context_providers/ErrorContext";


export default function ErrorPage() {
  const {errorState, setErrorState} = useContext(ErrorContext)

  return (
    <>
    {errorState ?
      <div id="error-overlay">
        <div id="error-box">
          <h2>Error</h2>
            <p>{errorState}</p>
          <button autoFocus onClick={()=>{setErrorState("")}}>Close</button>
        </div>
      </div>
      :
        ""

    }
    </>
  );
}
