export interface reviewShape {
  interviewee: string;
  age: number;
  occupation: string;
  location: string
  recreationPass: boolean
  locationIdent: number[]
  items: carryableItemsShape[]
}
export interface newReviewShape {
  interviewee: string;
  age: number;
  occupation: string;
  location: string
  recreationPass: boolean
  locationIdent: number[]
  items: carryableItemsShape[]
}

export interface carryableItemsShape{
    itemComponent: React.ReactElement
    legalStatus: number
}