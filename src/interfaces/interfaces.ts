import type { Dispatch, SetStateAction , ReactElement, JSX} from "react";

export interface reviewShape {
  interviewee: nameShape;
  age: number;
  occupation: occupationsShape;
  location: locationsShape;
  recreationPass: boolean;
  authorizedLocations: number[];
  items: carryableItemsShape[];
  overallWeighting: number;
  weightingArray: string[]
  weather: weatherShape
  behaviour: string
  processed: boolean
  decision: string
  decisionOutcome: boolean |null
  personFlavour: string
  gender: string
  identifier:string
}

export interface carryableItemsShape {
  itemComponent: React.ReactElement;
  legal: boolean;
  description: string;
}

export interface locationsShape {
  name: string;
  district: number;
}
export interface occupationsShape {
  name: string;
  district: number;
}

export interface weatherShape{
    weather: string
    icon: React.ReactElement
}
export interface nameShape{
    firstName: string
    lastName: string
}
export interface VoucherShape {
  name: string;
  cost: number;
  desc: string;
}
export interface VoucherListShape {
  [key: string]: {
    name: string;
    cost: number;
    desc: string;
    icon: React.ReactElement
  };
}

export interface reviewsCompleteShape {
  numberComplete: number;
  effectivenessRating: number;
}

export interface scoreContextShape{
    scoreState: number
    setScoreState: Dispatch<SetStateAction<number>> 
}
export interface ScoreTrackerProps{
scoreState: number
}

export interface unlockContextShape {
  playerUnlocks: string[] | null;
  setPlayerUnlocks: Dispatch<SetStateAction<string[] | null>>;
}

export interface transcriptReviewBoxProps {
  transcript: reviewShape | null;
  reviewTranscriptSetter: Dispatch<SetStateAction<reviewShape | null>>;
  decisionSetter: Dispatch<SetStateAction<boolean>>;
  scoreSetter: Dispatch<SetStateAction<number>>;
  selectedSetter: Dispatch<SetStateAction<string>>;
  scoreState: number;
}
export interface nodeShape {
  intensity: number;
  identifier: string;
}
export interface currentSlugShape {
  currentSlug: string;
  setCurrentSlug: Dispatch<SetStateAction<string>>;
}
export interface CurrentSlugProps{
    pageName: string
}
export interface adminContextShape {
  adminName: string;
  setAdminName: Dispatch<SetStateAction<string>>;
}

export interface HotSpotShape {
  ident: string;
  name: string;
  hotspot: ReactElement;
}
export interface CodexSidePanelProps {
  codexState: boolean;
  codexStateSetter: Dispatch<SetStateAction<boolean>>;
}
export interface CommandInputProps {
  adminNameSetter: Dispatch<SetStateAction<string>>;
}
export interface emailShape {
  title: string;
  message: JSX.Element;
  sender: string;
}
export interface newMessageProps {
  messageStateSetter: Dispatch<SetStateAction<boolean>>;
}
export interface NotLoggedInShape{
    soundControls: boolean
}
export interface searchResultShape {
  resultName: string;
  resultDistrict: number;
  resultLegality: boolean;
  resultType: string;
  itemComponent: React.ReactElement | null
}
export interface normalizedResultsShape {
  name: string;
  district: number;
  category: string;
}
export interface transcriptListItemProps {
  currentTranscript: reviewShape | null;
  identifier: string
  reviewTranscriptSetter: Dispatch<SetStateAction<reviewShape | null>>;
  selectedSetter: Dispatch<SetStateAction<string>>
}
export interface summaryProps {
  efficiency: number;
  interviewCount: number;
  targetState:boolean
  startNewShift:(reason:string)=> void
}