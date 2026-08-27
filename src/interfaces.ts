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