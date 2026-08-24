import { useState, type Dispatch, type SetStateAction } from "react";
interface transcriptRevProps {
  adminNameSetter: Dispatch<SetStateAction<string | null>>;
  transcriptRevSetter: Dispatch<SetStateAction<boolean>>;
}

export default function TranscriptRev({
  adminNameSetter,
  transcriptRevSetter,
}: transcriptRevProps) {
  const [typedCommand, setTypedCommand] = useState<string>("");
  const [errorState, setErrorState] = useState<boolean>(false);

  function handleCommand(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    switch (typedCommand) {
      case "[Exit]":
        adminNameSetter(null);
        transcriptRevSetter(false);
        setErrorState(false)
        break;
      default:
        setErrorState(true)
        break;
    }
  }

  return (
    <>
      <section id="transcript-review">
        <h2>Transcript Review</h2>
        <h3>Work Designation</h3>
        <p>
          You must complete your designated tasks to qualify for 'Free Time'.
        </p>
        <p>Select a transcript from the list below</p>
      </section>

      <form onSubmit={handleCommand}>
        {errorState && <p>Command Not recognized.</p>}

        <div id="command-input-container">
          <input
            type="text"
            placeholder="[Command]"
            id="command"
            name="command"
            autoComplete="off"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTypedCommand(e.currentTarget.value);
            }}
          ></input>
          <button id="login-submit-button">@</button>
      
        </div>
            <div className='commands-container'>
                <div className='command-container'><p>Exit.</p> <p>[Exit]</p></div>
                <div className='command-container'><p>Available Commands.</p> <p>[Help]</p></div>

                </div>
      </form>
    </>
  );
}
