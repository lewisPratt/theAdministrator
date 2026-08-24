export interface reviewShape {
  interviewee: string;
  age: number;
  occupation: string;
  location: string
  recreationPass: boolean
  locationIdent: number[]
  items: carryableItemsShape[]
  overallWeighting: number
}


export interface carryableItemsShape{
    itemComponent: React.ReactElement
    legal: boolean
    description: string
}