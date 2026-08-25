export interface reviewShape {
  interviewee: string;
  age: number;
  occupation: occupationsShape;
  location: locationsShape;
  recreationPass: boolean;
  authorizedLocations: number[];
  items: carryableItemsShape[];
  overallWeighting: number;
  weightingArray: string[]
  weather: weatherShape
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
