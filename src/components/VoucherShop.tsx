import { useContext, useEffect, useState } from "react";
import { BriefcaseBusiness, ClockArrowUp, ClockPlus, Cookie, FolderTree, LoaderCircle, PartyPopper, PhoneIncoming, PhoneOutgoing, Scale, Sun, SunDim, UserMinus, UtensilsCrossed } from "lucide-react";
import { ScoreContext } from "../context_providers/ScoreContext";
import { UnlocksContext } from "../context_providers/unlocksContext";
import type { VoucherShape, VoucherListShape } from "../interfaces/interfaces";
import { playSound } from "react-sounds";

export default function VoucherShop() {
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [confirming, setConfirming] = useState<string | null>(null);
  const { scoreState, setScoreState } = useContext(ScoreContext);
  const { playerUnlocks, setPlayerUnlocks } = useContext(UnlocksContext);
  console.log(playerUnlocks);

  const [errorState, setErrorState] = useState<string | null>(null);
    const hoverClick = () => playSound('ui/button_soft')
    const cantAfford = () => playSound('notification/error')


  const debug = false;
  const vouchers: VoucherListShape = {
    ["voucher1"]: {
      name: "10 minutes break",
      cost: 100,
      desc: "A well deserved 10 minute break that you can enjoy with your assigned synth desk plant. (any additional time over 10 minutes will incur a negative credit balance on your record)",
      icon: <ClockPlus />
    },
    ["voucher2"]: {
      name: "30 minutes break",
      cost: 200,
      desc: "A well deserved 30 minute break that you can enjoy with your assigned synth desk plant. (any additional time over 30 minutes will incur a negative credit balance on your record)",
      icon: <ClockArrowUp />
    },
    ["voucher3"]: {
      name: "Extra Cases",
      cost: 400,
      desc: "More cases to earn more credits. The wish of every Administrator.",
      icon: <FolderTree />
    },
    ["voucher4"]: {
      name: "High Achiever badge",
      cost: 500,
      desc: "A badge to wear on your assigned outerwear. You have performed to a level that some would call acceptable. The City requires more evidence to confirm this label.",
      icon: <PartyPopper />
    },
    ["voucher5"]: {
      name: "Low Achiever badge",
      cost: 50,
      desc: "A badge to wear on your assigned outerwear. You have done so little that it is not yet worth commenting on your inadequate attempt to undertake your assigned role.",
      icon: <UserMinus />
    },
    ["voucher6"]: {
      name: "Call to a family member",
      cost: 1000,
      desc: "A NetCall to a single family member that lasts no longer than 5 minutes. This call will be monitored for your safety.",
      icon: <PhoneOutgoing />
    },
    ["voucher7"]: {
      name: "Call from a stranger",
      cost: 300,
      desc: "A NetCall from a stranger who has entered the Re-Education programme. An opportunity to see the good you are doing with your work. This call will be monitored for your safety.",
      icon: <PhoneIncoming /> 
    },
    ["voucher8"]: {
      name: "Upgrade meal package: Basic",
      cost: 100,
      desc: "Upgrade of your currently meal package level: Sustinance Enhanced, to package level: Basic",
      icon:<Cookie />
    },
    ["voucher9"]: {
      name: "Upgrade meal package: Basic-Premium",
      cost: 400,
      desc: "Upgrade of your currently meal package level:  Basic, to package level: Basic Premium",
      icon: <UtensilsCrossed />
    },
    ["voucher10"]: {
      name: "Comitted Employee badge",
      cost: 2000,
      desc: "You have done well to show The City that you care deeply about your role and the rule of law. ",
      icon: <BriefcaseBusiness />
    },
    ["voucher11"]: {
      name: "Compliant Citizen badge",
      cost: 40,
      desc: "Wear with pride to show your fellow Citizens that you are compliant and law abiding and not in need of Re-education.",
      icon: <Scale />
    },
    ["voucher12"]: {
      name: "Increase in sunlight allowance (10 minutes)",
      cost: 600,
      desc: "Add 10 extra minutes to your sunlight allowance for one day only. (maximum of 90 minutes/day)",
      icon:< SunDim />
    },
    ["voucher13"]: {
      name: "Increase in sleep allowance (10 minutes)",
      cost: 100,
      desc: "Add 10 extra minutes to your sleep time allowance for on eday only. (maximum of 4 hours day)",
      icon: <Sun />
    },
  };

  useEffect(() => {
    setTimeout(setLoadingState, 2000, false);
  });

  function giveCredits() {
    setScoreState(scoreState + 1000);
  }
  function confirmChoice(e: React.MouseEvent<HTMLButtonElement>) {
      setErrorState(null)
    if (
      e.currentTarget.dataset.voucherName &&
      e.currentTarget.dataset.voucherIdent
    ) {
      const chosenVoucherIdent: string = e.currentTarget.dataset.voucherIdent;
      if(confirming === chosenVoucherIdent){
        setConfirming(null)
      }
      else{
    //   const chosenVoucherName: string = e.currentTarget.dataset.voucherName;

      const chosenVoucher: VoucherShape = vouchers[`${chosenVoucherIdent}`];
  

      if (chosenVoucher != undefined) {
        
        setConfirming(chosenVoucherIdent);
      }
    }
    }
  }

  function purchaseVoucher() {
  
    if (confirming != null) {
      const selectedVoucher = vouchers[`${confirming}`];
      if (scoreState < selectedVoucher.cost) {
        setErrorState("You do not have enough credits");
        cantAfford()
      } else {
        setScoreState(scoreState - selectedVoucher.cost);
        let updatedUnlocks: string[] = [];
        if (playerUnlocks != null) {
          updatedUnlocks = [...playerUnlocks];
        }
        updatedUnlocks.push(confirming);
        setPlayerUnlocks(updatedUnlocks);
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
            {debug && <button onClick={giveCredits}>Give credits</button>}
          </div>
          <section id="voucher-items-container">
            <ol>
              {Object.entries(vouchers).map((voucher) => {
                return (
                  <li>
                    <button
                      key={voucher[0]}
                      className={
                        "voucher-box " +
                        (playerUnlocks?.includes(voucher[0])
                          ? "purchased-unlock-class"
                          : "unpurchased-unlock-class")
                      }
                      data-voucher-name={voucher[1].name}
                      data-voucher-ident={voucher[0]}
                      
                      onClick={(e) => {
                        confirmChoice(e)
                        hoverClick();
                      }}
                    >
                      {voucher[1].icon}<span> {voucher[1].name}</span> <span>{playerUnlocks?.includes(voucher[0]) && "[Purchased]"  }  C{voucher[1].cost}</span>
                    </button>
                    {confirming != null && confirming === voucher[0] && (
                      <div >
                        <p className="voucher-desc">{voucher[1].desc}</p>
                                  {errorState != null && <p id='voucher-error'>{errorState}</p>}

                        {!playerUnlocks?.includes(voucher[0]) && (
                            
                          <p className='purchase-button'>
                            <button onClick={purchaseVoucher} >Purchase</button>
                          </p>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
          <section>
            <p>Vouchers refresh every : 295 days</p>
          </section>
        </section>
      )}
    </>
  );
}
