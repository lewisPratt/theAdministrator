import { useContext, useEffect, useState } from "react";
import { BriefcaseBusiness, ClockArrowUp, ClockPlus, Cookie, FolderTree, LoaderCircle, PartyPopper, PhoneIncoming, PhoneOutgoing, Scale, Sun, SunDim, UserMinus, UtensilsCrossed } from "lucide-react";
import { ScoreContext } from "../context_providers/ScoreContext";
import { UnlocksContext } from "../context_providers/unlocksContext";
import type { VoucherShape, VoucherListShape } from "../interfaces/interfaces";
import { playSound } from "react-sounds";
import { allVouchers} from "../generator_modules/vouchers";
export default function VoucherShop() {
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [confirming, setConfirming] = useState<string | null>(null);
  const { scoreState, setScoreState } = useContext(ScoreContext);
  const { playerUnlocks, setPlayerUnlocks } = useContext(UnlocksContext);
  console.log(playerUnlocks);

  const [errorState, setErrorState] = useState<string | null>(null);
    const hoverClick = () => playSound('ui/button_soft')
    const cantAfford = () => playSound('notification/error')


  const debug = true;
  const vouchers: VoucherListShape = allVouchers

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
