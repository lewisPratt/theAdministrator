import { BriefcaseBusiness, ClockArrowUp, ClockPlus, Cookie, FolderTree, LoaderCircle, PartyPopper, PhoneIncoming, PhoneOutgoing, Scale, Sun, SunDim, UserMinus, UtensilsCrossed } from "lucide-react";
import type { VoucherListShape } from "../interfaces/interfaces";
export const allVouchers: VoucherListShape = {
    ["voucher1"]: {
      name: "10 minutes break",
      type: "perk",
      cost: 100,
      desc: "A well deserved 10 minute break that you can enjoy with your assigned synth desk plant. (any additional time over 10 minutes will incur a negative credit balance on your record)",
      icon: <ClockPlus />
    },
    ["voucher2"]: {
      name: "30 minutes break",
    type: "perk",
      cost: 200,
      desc: "A well deserved 30 minute break that you can enjoy with your assigned synth desk plant. (any additional time over 30 minutes will incur a negative credit balance on your record)",
      icon: <ClockArrowUp />
    },
    ["voucher3"]: {
      name: "Extra Cases",
         type: "perk",
      cost: 400,
      desc: "More cases to earn more credits. The wish of every Administrator.",
      icon: <FolderTree />
    },
    ["voucher4"]: {
      name: "High Achiever badge",
      type: "badge",
      cost: 500,
      desc: "A badge to wear on your assigned outerwear. You have performed to a level that some would call acceptable. The City requires more evidence to confirm this label.",
      icon: <PartyPopper />
    },
    ["voucher5"]: {
      name: "Low Achiever badge",
      type: "badge",
      cost: 50,
      desc: "A badge to wear on your assigned outerwear. You have done so little that it is not yet worth commenting on your inadequate attempt to undertake your assigned role.",
      icon: <UserMinus />
    },
    ["voucher6"]: {
      name: "Call to a family member",
         type: "perk",
      cost: 1000,
      desc: "A NetCall to a single family member that lasts no longer than 5 minutes. This call will be monitored for your safety.",
      icon: <PhoneOutgoing />
    },
    ["voucher7"]: {
      name: "Call from a stranger",
         type: "perk",
      cost: 300,
      desc: "A NetCall from a stranger who has entered the Re-Education programme. An opportunity to see the good you are doing with your work. This call will be monitored for your safety.",
      icon: <PhoneIncoming /> 
    },
    ["voucher8"]: {
      name: "Upgrade meal package: Basic",
         type: "perk",
      cost: 100,
      desc: "Upgrade of your currently meal package level: Sustinance Enhanced, to package level: Basic",
      icon:<Cookie />
    },
    ["voucher9"]: {
      name: "Upgrade meal package: Basic-Premium",
         type: "perk",
      cost: 400,
      desc: "Upgrade of your currently meal package level:  Basic, to package level: Basic Premium",
      icon: <UtensilsCrossed />
    },
    ["voucher10"]: {
      name: "Comitted Employee badge",
      type: "badge",
      cost: 2000,
      desc: "You have done well to show The City that you care deeply about your role and the rule of law. ",
      icon: <BriefcaseBusiness />
    },
    ["voucher11"]: {
      name: "Compliant Citizen badge",
         type: "badge",
      cost: 40,
      desc: "Wear with pride to show your fellow Citizens that you are compliant and law abiding and not in need of Re-education.",
      icon: <Scale />
    },
    ["voucher12"]: {
      name: "Increase in sunlight allowance (10 minutes)",
         type: "perk",
      cost: 600,
      desc: "Add 10 extra minutes to your sunlight allowance for one day only. (maximum of 90 minutes/day)",
      icon:< SunDim />
    },
    ["voucher13"]: {
      name: "Increase in sleep allowance (10 minutes)",
         type: "perk",
      cost: 100,
      desc: "Add 10 extra minutes to your sleep time allowance for on eday only. (maximum of 4 hours day)",
      icon: <Sun />
    },
  };