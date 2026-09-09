import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

interface VoucherShape {
  voucherName: string;
}

export default function VoucherShop() {
  const [typedCommand, setTypedCommand] = useState<string>("");
  const [errorState, setErrorState] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [confirming, setConfirming] = useState<VoucherShape | null>(null);

  const navigate = useNavigate();
  const vouchers = [
    {
      name: "10 minutes break",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    {
      name: "30 minutes break",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    {
      name: "Extra Cases",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    {
      name: "High acheiver badge",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    {
      name: "Low Achiever badge",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    {
      name: "Call to a family member",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    {
      name: "Cal lto a stranger",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    {
      name: "Upgrade meal package: basic",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    {
      name: "Upgrade meal package: basic-premium",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    {
      name: "Comitted Employee badge",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    {
      name: "Compliant Citizen badge",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    {
      name: "Increase in sunlight allowance (10 minutes)",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    {
      name: "Increase in sleep allowance (10 minutes)",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
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
  useEffect(() => {
    setTimeout(setLoadingState, 2000, false);
  });
  function confirmChoice(e: React.MouseEvent<HTMLButtonElement>) {
    alert(
      "are you sure you want to buy the " +
        e.currentTarget.dataset.voucherName +
        " voucher?",
    );
  }

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
              return (
                <button
                  className="voucher-box"
                  data-voucher-name={voucher}
                  onClick={(e) => {
                    confirmChoice(e);
                  }}
                >
                  {voucher.name}
                </button>
              );
            })}
          </section>
          <section>
            <p>Vouchers refresh every : 295 days</p>
          </section>
        </section>
      )}
    </>
  );
}
