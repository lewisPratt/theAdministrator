import { type JSX } from "react";

interface emailShape {
  title: string;
  message: JSX.Element;
  sender: string;
}

export const spamEmails: emailShape[] = [
  {
    title: "Your Compliance Score Could Be Higher!",
    message: (
      <p>
        Did you know citizens who smile during processing see a 12% uplift in
        Compliance Score? Try it today. Terms and conditions apply. Smiling
        is not a substitute for valid documentation.
      </p>
    ),
    sender: "Ministry of Wellbeing",
  },
  {
    title: "URGENT: Recreation Pass Expiring",
    message: (
      <p>
        Your Recreation Pass expires in 3 cycles. Renew now to avoid a lapse
        in state-sanctioned leisure. Late renewal may result in mandatory
        rest.
      </p>
    ),
    sender: "District 4 Leisure Authority",
  },
  {
    title: "You Have Been Selected!",
    message: (
      <p>
        Congratulations, citizen. You have been randomly selected for a free
        Loyalty Consultation. A representative will arrive shortly. Please
        remain indoors.
      </p>
    ),
    sender: "Bureau of Civic Trust",
  },
  {
    title: "Black Market Watches — 70% Off",
    message: (
      <p>
        Genuine pre-collapse timepieces, smuggled fresh through District 7.
        No questions asked, no receipts given. Ask for &quot;Uncle Renn&quot;
        at the usual stall.
      </p>
    ),
    sender: "unknown-sender@undisclosed"
  },
  {
    title: "Reminder: Report Your Neighbour",
    message: (
      <p>
        It has been 14 days since your last community report. Silence is
        also a data point. The Bureau thanks you for your continued
        vigilance.
      </p>
    ),
    sender: "Neighbourhood Harmony Initiative",
  },
  {
    title: "New Flavor: Nutrient Paste Classic Returns!",
    message: (
      <p>
        By popular demand (n=4), Nutrient Paste Classic is back on ration
        shelves. Tastes exactly the same as every other flavor. Limit six
        tubes per household.
      </p>
    ),
    sender: "State Provisions Co.",
  },
  {
    title: "Curfew Extended... For Some",
    message: (
      <p>
        Citizens with a Compliance Score above 800 may now remain outdoors
        until 22:00. All others should refer to their existing schedule.
        Envy is not a recognized emotion.
      </p>
    ),
    sender: "Office of the Curfew",
  },
  {
    title: "Your Reeducation Session Has Been Rescheduled",
    message: (
      <p>
        Due to high demand, your mandatory reeducation session has been
        moved forward by two days. We appreciate your flexibility and your
        compliance.
      </p>
    ),
    sender: "District 2 Reeducation Services",
  },
  {
    title: "Singles Night at the Registry Office",
    message: (
      <p>
        Looking for a state-approved partner? Join fellow compliant citizens
        for an evening of chaperoned mingling. Recreation Pass required at
        the door.
      </p>
    ),
    sender: "Ministry of Population Growth",
  },
  {
    title: "Weather Advisory: Mandatory Optimism",
    message: (
      <p>
        Skies over the district will be grey today, as scheduled. Citizens
        are reminded that reporting the weather as &quot;depressing&quot; is
        a Category 3 infraction.
      </p>
    ),
    sender: "Central Meteorological Bureau",
  },
  {
    title: "Exclusive Offer: Skip the Queue",
    message: (
      <p>
        For a small administrative fee, your next processing appointment can
        be moved up by one full cycle. Offer not available to citizens under
        active investigation.
      </p>
    ),
    sender: "Expediting Services Ltd.",
  },
  {
    title: "Your Feedback Has Been Received (and Discarded)",
    message: (
      <p>
        Thank you for submitting feedback regarding processing wait times.
        Your concerns have been logged, reviewed, and filed appropriately.
        No further action is required from you.
      </p>
    ),
    sender: "Office of Public Sentiment",
  },
  {
    title: "District 8 Nightlife: New Curfew Loophole?!",
    message: (
      <p>
        Rumor has it the club on Threnody Row never actually checks passes
        after midnight. We would never confirm this. We are definitely not
        confirming this.
      </p>
    ),
    sender: "anon-tipline@district8",
  },
  {
    title: "Update Your Household Registry",
    message: (
      <p>
        Our records indicate your household composition may be outdated.
        Please confirm the number of occupants, pets, and thoughts you are
        currently having.
      </p>
    ),
    sender: "Central Registry Office",
  },
  {
    title: "You've Won a Complimentary Audit!",
    message: (
      <p>
        Every household is a winner this cycle. Your complimentary financial
        and moral audit has been scheduled. No action needed — we already
        have your address.
      </p>
    ),
    sender: "Ministry of Fairness",
  },
  {
    title: "Discreet Documents, Fast Turnaround",
    message: (
      <p>
        Need a permit that doesn't quite match your file? Our associates in
        District 7 specialize in creative paperwork. Cash, favors, or
        ration coupons accepted.
      </p>
    ),
    sender: "no-reply@definitely-not-forged.net",
  },
  {
    title: "Reminder: Loyalty Pledge Renewal",
    message: (
      <p>
        Your annual Loyalty Pledge is due for renewal. Simply recite the
        pledge aloud, alone, in a room with no recording devices, which of
        course do not exist.
      </p>
    ),
    sender: "Bureau of Civic Trust",
  },
  {
    title: "New Quota Achieved: Congratulations, District!",
    message: (
      <p>
        Together we exceeded this cycle's Compliance Quota by 2%. As a
        reward, next cycle's quota has been raised accordingly. Well done,
        everyone.
      </p>
    ),
    sender: "District Productivity Office",
  },
  {
    title: "Is Your Neighbour Hoarding? Find Out How.",
    message: (
      <p>
        A new pamphlet explains the seven telltale signs of hoarding
        behaviour, including &quot;owning more than one blanket.&quot;
        Read, learn, report responsibly.
      </p>
    ),
    sender: "Neighbourhood Harmony Initiative",
  },
  {
    title: "Limited Time: Half-Price Silence Fees",
    message: (
      <p>
        For a limited cycle, fees for requesting &quot;quiet processing&quot;
        (no questions asked about your file) are reduced by 50%. Popular
        among returning customers.
      </p>
    ),
    sender: "Expediting Services Ltd.",
  },
  {
    title: "Attention: Recreation Pass Misuse Detected",
    message: (
      <p>
        Our systems flagged unusual leisure patterns on your account. This
        is not an accusation. This is a formality. Please remain calm and
        available.
      </p>
    ),
    sender: "District 4 Leisure Authority",
  },
  {
    title: "New Arrivals: Pre-Collapse Novels (Redacted Editions)",
    message: (
      <p>
        Fresh stock of approved literature, lightly redacted for your
        safety. Ask about our &quot;guess the missing word&quot; bundle
        deal.
      </p>
    ),
    sender: "State Reading Room",
  },
  {
    title: "Your Opinion Matters (Within Reason)",
    message: (
      <p>
        Participate in this cycle's public opinion survey. All eleven
        questions have been carefully pre-approved to have only one correct
        answer.
      </p>
    ),
    sender: "Office of Public Sentiment",
  },
  {
    title: "Black Market Alert: Real Coffee In Stock",
    message: (
      <p>
        Actual, non-synthetic coffee beans just arrived in District 7.
        Extremely limited. Extremely illegal. Extremely worth it, allegedly.
      </p>
    ),
    sender: "unknown-sender@undisclosed",
  },
  {
    title: "Mandatory Fun: Cycle Festival Approaching",
    message: (
      <p>
        The Cycle Festival returns! Attendance is strongly encouraged and
        also mandatory. Enjoyment levels will be monitored for quality
        assurance.
      </p>
    ),
    sender: "Ministry of Wellbeing",
  },
  {
    title: "Your Detention Feedback Survey",
    message: (
      <p>
        How was your recent detention experience? Please rate our staff on
        friendliness, efficiency, and how quickly you complied.
      </p>
    ),
    sender: "District 2 Reeducation Services",
  },
  {
    title: "Discounted Reeducation Bundles",
    message: (
      <p>
        Book three reeducation sessions, get a fourth at no charge. Perfect
        for households with recurring &quot;misunderstandings.&quot;
      </p>
    ),
    sender: "District 2 Reeducation Services",
  },
  {
    title: "Warning: Excess Optimism Detected",
    message: (
      <p>
        Sensors indicate elevated morale in your sector. A wellness officer
        will visit to ensure this is not indicative of undisclosed good
        fortune.
      </p>
    ),
    sender: "Ministry of Wellbeing",
  },
  {
    title: "Job Opportunity: Informant Program",
    message: (
      <p>
        Earn bonus ration coupons by joining the Informant Program. No
        experience necessary. Discretion mandatory. Friends optional
        afterward.
      </p>
    ),
    sender: "Bureau of Civic Trust",
  },
  {
    title: "Your Household Has Been Flagged for Excess Laundry",
    message: (
      <p>
        Water usage records suggest more laundry than expected for your
        household size. Please explain, or simply own fewer clothes.
      </p>
    ),
    sender: "Central Utilities Office",
  },
  {
    title: "Exclusive: Nightlife Pass Upgrade",
    message: (
      <p>
        Upgrade to a Platinum Nightlife Pass for extended District 8 access
        and a complimentary hangover waiver. Offer void where enjoyment is
        excessive.
      </p>
    ),
    sender: "District 8 Nightlife Board",
  },
  {
    title: "Reminder: Thoughts Are Property of the State",
    message: (
      <p>
        A gentle reminder that all thoughts generated within state
        boundaries remain state property. Please continue thinking
        responsibly.
      </p>
    ),
    sender: "Ministry of Fairness",
  },
  {
    title: "Second-Hand Uniforms, Barely Interrogated",
    message: (
      <p>
        Gently used administrator uniforms available. Some stains may
        indicate prior use in high-pressure processing environments.
      </p>
    ),
    sender: "District 7 Bargain Bazaar",
  },
  {
    title: "You May Already Be Under Investigation!",
    message: (
      <p>
        Don't wait to find out. For a small fee, our associates can tell you
        whether you're currently under investigation, probably.
      </p>
    ),
    sender: "no-reply@definitely-not-forged.net",
  },
  {
    title: "Cycle-End Sale: Documentation Stamps",
    message: (
      <p>
        Buy one official stamp, get one &quot;official-looking&quot; stamp
        free. Not valid for use on anything that actually matters.
      </p>
    ),
    sender: "District 7 Bargain Bazaar",
  },
  {
    title: "Your Compliance Score Dropped. Here's Why.",
    message: (
      <p>
        Recent activity flagged as &quot;questioning tone during
        processing.&quot; Consider our new course: Smiling Under Scrutiny,
        Module One.
      </p>
    ),
    sender: "Ministry of Wellbeing",
  },
  {
    title: "New Ration Coupon Exchange Rate",
    message: (
      <p>
        Effective this cycle, ration coupons will be worth slightly less
        than they were yesterday, for reasons the Ministry finds
        self-evident.
      </p>
    ),
    sender: "State Provisions Co.",
  },
  {
    title: "Attention Administrators: Quota Reminder",
    message: (
      <p>
        This is a friendly reminder that processing quotas exist, are being
        watched, and were not met last cycle by several of your colleagues.
      </p>
    ),
    sender: "ComSec Internal Notices",
  },
  {
    title: "Get Ahead: Buy Your Neighbour's Recreation Pass",
    message: (
      <p>
        Struggling to renew your own pass? Some citizens are willing to sell
        theirs, quietly, in District 7, for the right price.
      </p>
    ),
    sender: "unknown-sender@undisclosed",
  },
  {
    title: "Mandatory Viewing: State Broadcast Tonight",
    message: (
      <p>
        Tonight's broadcast is mandatory viewing for all households. Topics
        include quota achievements, weather compliance, and a brief segment
        on smiling.
      </p>
    ),
    sender: "Central Broadcast Authority",
  },
  {
    title: "Your Detention Loyalty Points Are Expiring",
    message: (
      <p>
        You've accumulated 40 Detention Loyalty Points. Redeem them now for
        a slightly shorter wait next time. Points expire at midnight.
      </p>
    ),
    sender: "District 2 Reeducation Services",
  },
  {
    title: "New Course Available: Advanced Compliance",
    message: (
      <p>
        Take your compliance to the next level with our new course,
        featuring role-play scenarios and a certificate you will never be
        asked to show anyone.
      </p>
    ),
    sender: "Ministry of Wellbeing",
  },
  {
    title: "District 7 Swap Meet This Weekend",
    message: (
      <p>
        Trade your unwanted ration items for someone else's unwanted ration
        items. All transactions are unofficial and therefore did not
        happen.
      </p>
    ),
    sender: "District 7 Bargain Bazaar",
  },
  {
    title: "Reminder: Silence During Processing Is Golden",
    message: (
      <p>
        Studies show citizens who speak fewer than six words during
        processing receive marginally friendlier administrators. Results
        not guaranteed.
      </p>
    ),
    sender: "Bureau of Civic Trust",
  },
  {
    title: "Your Application for Happiness Is Under Review",
    message: (
      <p>
        We have received your request to feel happy about recent events.
        Please allow 6 to 8 cycles for processing.
      </p>
    ),
    sender: "Ministry of Fairness",
  },
  {
    title: "Flash Sale: Forged Recommendation Letters",
    message: (
      <p>
        Need a glowing character reference from someone who has never met
        you? We specialize in exactly that.
      </p>
    ),
    sender: "no-reply@definitely-not-forged.net",
  },
  {
    title: "Nightlife Curfew Extended for Administrators Only",
    message: (
      <p>
        As a valued administrator, you may now enjoy District 8 nightlife
        until 23:30. Please do not mention this to anyone you process
        tomorrow.
      </p>
    ),
    sender: "District 8 Nightlife Board",
  },
  {
    title: "Your Neighbour Reported You. Now What?",
    message: (
      <p>
        Someone in your building has filed a report about you. We can't say
        who. We can, however, sell you a guide titled &quot;Guessing Who
        Reported You.&quot;
      </p>
    ),
    sender: "anon-tipline@district8",
  },
  {
    title: "Reminder: Ration Paste Is Not a Personality",
    message: (
      <p>
        Recent surveys show citizens increasingly describe themselves by
        their preferred paste flavor. Please diversify your interests, for
        morale purposes.
      </p>
    ),
    sender: "Office of Public Sentiment",
  },
  {
    title: "Final Notice: Update Your File Before It's Updated For You",
    message: (
      <p>
        You have 24 hours to voluntarily correct any discrepancies in your
        file. After that, discrepancies will be corrected on your behalf,
        without consultation.
      </p>
    ),
    sender: "Central Registry Office",
  },
];

export default spamEmails;