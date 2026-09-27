import { useState, type Dispatch, type SetStateAction } from "react";
import "../../assets/css/error_page.css";

interface errorProps{
    errorText: string
    // errorSetter: Dispatch<SetStateAction<string | null>>
}

export default function ErrorPage({errorText}: errorProps) {
  const [error, setError] = useState<string | null>(null);

  return (
    <>
    {errorText ?
      <div id="error-overlay">
        <div id="error-box">
          <h2>Error</h2>
            <p>{errorText}</p>
          <button >Close</button>
        </div>
      </div>
      :
        ""

    }
    </>
  );
}
