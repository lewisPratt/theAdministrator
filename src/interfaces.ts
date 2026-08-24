export interface reviewShape {
  interviewee: string;
  age: number;
  occupation: occupationsShape;
  location: locationsShape;
  recreationPass: boolean;
  locationIdent: number[];
  items: carryableItemsShape[];
  overallWeighting: number;
  weightingArray: string[]
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
