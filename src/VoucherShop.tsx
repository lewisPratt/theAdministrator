import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

interface VoucherListShape {
  [key: string]: {
    name: string;
    cost: number;
    desc: string;
  };
}

interface VoucherShape {
  name: string;
  cost: number;
  desc: string;
}

export default function VoucherShop() {
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [confirming, setConfirming] = useState<VoucherShape | null>(null);

  const vouchers :VoucherListShape = {
    ["voucher1"]: {
      name: "10 minutes break",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    ["voucher2"]: {
      name: "30 minutes break",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    ["voucher3"]: {
      name: "Extra Cases",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    ["voucher4"]: {
      name: "High acheiver badge",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    ["voucher5"]: {
      name: "Low Achiever badge",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    ["voucher6"]: {
      name: "Call to a family member",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    ["voucher7"]: {
      name: "Cal lto a stranger",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    ["voucher8"]: {
      name: "Upgrade meal package: basic",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    ["voucher9"]: {
      name: "Upgrade meal package: basic-premium",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    ["voucher10"]: {
      name: "Comitted Employee badge",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    ["voucher11"]: {
      name: "Compliant Citizen badge",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    ["voucher12"]: {
      name: "Increase in sunlight allowance (10 minutes)",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
    ["voucher13"]: {
      name: "Increase in sleep allowance (10 minutes)",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
    },
  };

  useEffect(() => {
    setTimeout(setLoadingState, 2000, false);
  });

  function confirmChoice(e: React.MouseEvent<HTMLButtonElement>) {
    if (
      e.currentTarget.dataset.voucherName &&
      e.currentTarget.dataset.voucherIdent
    ) {
      const chosenVoucherIdent: string = e.currentTarget.dataset.voucherIdent;
      const chosenVoucherName: string = e.currentTarget.dataset.voucherName;

      const chosenVoucher: VoucherShape = vouchers[`${chosenVoucherIdent}`]
      console.log(chosenVoucher)
        
      if (chosenVoucher != undefined) {
        setConfirming(chosenVoucher);
        alert(
          "are you sure you want to buy the " + chosenVoucherName + " voucher?",
        );
        //impliment modal to confirm voucher selection and trigger logic to buy voucher
      }
    }
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
            {Object.entries(vouchers).map((voucher) => {
              return (
                <button
                  key={voucher[0]}
                  className="voucher-box"
                  data-voucher-name={voucher[1].name}
                  data-voucher-ident={voucher[0]}
                  onClick={(e) => {
                    confirmChoice(e);
                  }}
                >
                  {voucher[1].name}
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
