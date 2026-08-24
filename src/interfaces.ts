export interface reviewShape {
  interviewee: string;
  age: number;
  occupation: string;
  location: string
  recreationPass: boolean
  locationIdent: number[]
  items: React.ReactElement[]
}

export interface carryableItemsShape{
    itemComponent: React.ReactElement
    legalStatus: number
}