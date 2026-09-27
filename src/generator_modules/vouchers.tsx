import { BookKey, BriefcaseBusiness, ClockArrowUp, ClockPlus, Cookie, Cpu, FolderTree, Headset, LoaderCircle, MemoryStick, PartyPopper, PhoneIncoming, PhoneOutgoing, Scale, Sun, SunDim, Syringe, UserMinus, UtensilsCrossed } from "lucide-react";
import type { VoucherListShape } from "../interfaces/interfaces";
export const allVouchers: VoucherListShape = {
    ["voucher1"]: {
      name: "Cranial Upgrade Bot",
      type: "perk",
      cost: 800,
      desc: "This user friendly cranial implant will helpfully crawl out of it's delivery crate and attach itself to the optimum location on your skull.",
      perkEffect:"Identifies 2 carried item as a positive or negative factor.",
      icon:< Cpu  size={12} x={6} y={6}/>
    },
    ["voucher2"]: {
      name: "Upgraded Cognition Blocker",
    type: "perk",
      cost: 200,
      desc: "This technological leap in Administration technology will replace your Standard Issue Cognition Blocker with a Standard-Pro Edition Cognition Blocker (X1.5 free thought cognition allowance!) ",
      perkEffect:"Identifies 3 carried item as a positive or negative factor.",
      icon:< MemoryStick  size={12} x={6} y={6}/>
    },
    ["voucher3"]: {
      name: "Extra Cases",
         type: "perk",
      cost: 400,
      desc: "More cases to earn more credits. The wish of every Administrator.",
      perkEffect:"Increases maximum cases per shift by 5.",
      icon: <FolderTree  size={12} x={6} y={6}/>
    },
    ["voucher4"]: {
      name: "High Achiever badge",
      type: "badge",
      cost: 500,
      desc: "A badge to wear on your assigned outerwear. You have performed to a level that some would call acceptable. The City requires more evidence to confirm this label.",
      perkEffect:"Adds C500 to the total received when correctly judging a case.",
      icon: <PartyPopper  size={12} x={6} y={6}/>
    },
    ["voucher5"]: {
      name: "Low Achiever badge",
      type: "badge",
      cost: 50,
      desc: "A badge to wear on your assigned outerwear. You have done so little that it is not yet worth commenting on.",
      perkEffect:"Adds C50 to the total received when correctly judging a case.",
      icon: <UserMinus  size={12} x={6} y={6}/>
    },
    ["voucher6"]: {
      name: "Upgraded Access Level: Evidence Stack",
         type: "perk",
      cost: 1000,
      desc: "Allows access to evidence after judgement is passed. Useful for the mandatory improvement of Administrator performance.",
      perkEffect:"Reveals evidence held against Citizens following judgement.",
      icon: <BookKey  size={12} x={6} y={6}/>
    },
    ["voucher7"]: {
      name: "Call to junior colleague",
         type: "perk",
      cost: 500,
      desc: "A NetCall to a colleague who will assist in the judgement of a case.",
      perkEffect:"Junior colleagues have a 60% chance of judging cases correctly. (once/shift)",
      icon: <PhoneOutgoing  size={12} x={6} y={6}/> 
    },
    ["voucher8"]: {
    name: "Call to senior colleague",
         type: "perk",
      cost: 1000,
      desc: "A NetCall to a colleague who will assist in the judgement of a case.",
      perkEffect:"Senior colleagues have a 80% chance of judging cases correctly. (once/shift)",
      icon: <Headset  size={12} x={6} y={6}/> 
    },
    ["voucher9"]: {
      name: "Upgrade meal package: Basic-Premium",
         type: "perk",
      cost: 400,
      desc: "Upgrade of your currently meal package level:  Basic, to package level: Basic Premium",
      perkEffect:"Ut mollit ipsum voluptate et proident qui laborum duis mollit ipsum Lorem ea sint.",
      icon: <UtensilsCrossed  size={12} x={6} y={6}/>
    },
    ["voucher10"]: {
      name: "Comitted Employee badge",
      type: "badge",
      cost: 2000,
      desc: "You have done well to show The City that you care deeply about your role and the rule of law. ",
      perkEffect:"Ullamco commodo excepteur tempor elit eiusmod deserunt Lorem.",
      icon: <BriefcaseBusiness  size={12} x={6} y={6}/>
    },
    ["voucher11"]: {
      name: "Compliant Citizen badge",
      type: "badge",
      cost: 40,
      desc: "Wear with pride to show your fellow Citizens that you are compliant and law abiding and not in need of Re-education.",
      perkEffect:"Dolor mollit et mollit incididunt incididunt eiusmod velit fugiat adipisicing.",
      icon: <Scale  size={12} x={6} y={6}/>
    },
    ["voucher12"]: {
      name: "Frontal Lobe implant",
      type: "perk",
      cost: 600,
      desc: "By simply inserting this 3\" syringe into the centre of your left eyeball and injecting the contents, a barely noticeable permanent implant will be permanently attached to your frontal lobe.",
      perkEffect:"Identifies 1 carried item as a positive or negative factor.",
      icon:< Syringe  size={12} x={6} y={6}/>
    },
    ["voucher13"]: {
      name: "Middling achiever Badge",
         type: "badge",
      cost: 250,
      desc: "A badge to wear on your assigned outerwear. You have exceeded expectations. Continue to do so.",
      perkEffect:"Adds C250 to the total received when correctly judging a case.",
      icon: <Sun  size={12} x={6} y={6}/>
    },
  };