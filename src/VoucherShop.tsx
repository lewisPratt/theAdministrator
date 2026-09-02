import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function VoucherShop() {
  const [typedCommand, setTypedCommand] = useState<string>("");
  const [errorState, setErrorState] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(true);

  const navigate = useNavigate();
  const vouchers = [
    "10 minutes break",
    "30 minute break",
    "Day off",
    "Extra cases",
    "high achiever badge",
    "low achiever badge",
    "call to a family member",
    "call to a stranger",
    "Upgrade meal package: basic",
    "Upgrade meal package: basic-pro",
    "Committed Employee badge",
    "Compliant Citizen Badge",
    "Increase in sunlight allowance (10 minutes)",
    "Increase in sleep allowance (10 minutes)",
  ];
  function handleCommand(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
   
    switch (typedCommand) {
      case "[Exit]":
        navigate("/CommandCentre");
        setErrorState(false);
        break;
      default:
         e.currentTarget.reset();
        setErrorState(true);
        break;
    }
  }
  useEffect(()=>{
    setTimeout(setLoadingState, 2000, false);
  })


  return (
    <>
      {loadingState ? (
        <p>
          <LoaderCircle className="loader" />
        </p>
      ) : (
        <section id="voucher-shop">
          <div id="voucher-shop-header">
            <h2>Voucher Shop</h2>
          </div>
          <section id="voucher-items-container">
            {vouchers.map((voucher) => {
              return <div className="voucher-box">{voucher}</div>;
            })}
          </section>
          <form onSubmit={handleCommand}>
            {errorState && <p>Command Not recognized.</p>}

            <div id="command-input-container">
              <input
                type="text"
                placeholder="[Command]"
                id="transcript-rev-command"
                name="command"
                autoComplete="off"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTypedCommand(e.currentTarget.value);
                }}
              ></input>
              <button id="login-submit-button">@</button>
            </div>
            <div className="commands-container">
              <div className="command-container">
                <p>Exit.</p> <p>[Exit]</p>
              </div>
              <div className="command-container">
                <p>Available Commands.</p> <p>[Help]</p>
              </div>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
