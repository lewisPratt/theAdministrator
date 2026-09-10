import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface VoucherShape {
  name: string;
  cost: number;
  desc: string;
  ident: string;
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
      ident: uuidv4(),
    },
    {
      name: "30 minutes break",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
      ident: uuidv4(),
    },
    {
      name: "Extra Cases",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
      ident: uuidv4(),
    },
    {
      name: "High acheiver badge",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
      ident: uuidv4(),
    },
    {
      name: "Low Achiever badge",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
      ident: uuidv4(),
    },
    {
      name: "Call to a family member",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
      ident: uuidv4(),
    },
    {
      name: "Cal lto a stranger",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
      ident: uuidv4(),
    },
    {
      name: "Upgrade meal package: basic",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
      ident: uuidv4(),
    },
    {
      name: "Upgrade meal package: basic-premium",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
      ident: uuidv4(),
    },
    {
      name: "Comitted Employee badge",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
      ident: uuidv4(),
    },
    {
      name: "Compliant Citizen badge",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
      ident: uuidv4(),
    },
    {
      name: "Increase in sunlight allowance (10 minutes)",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
      ident: uuidv4(),
    },
    {
      name: "Increase in sleep allowance (10 minutes)",
      cost: 100,
      desc: "Deserunt nostrud est ex dolore ad ex officia elit.",
      ident: uuidv4(),
    },
  ];

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

      const chosenVoucher: VoucherShape | undefined = vouchers.find(
        (voucher) => {
          return voucher.ident === chosenVoucherIdent;
        },
      );
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
            {vouchers.map((voucher) => {
              return (
                <button
                  key={voucher.ident}
                  className="voucher-box"
                  data-voucher-name={voucher.name}
                  data-voucher-ident={voucher.ident}
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
