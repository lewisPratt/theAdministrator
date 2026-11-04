import { type districtNameShape } from "../interfaces/interfaces"

export default function getDistrictName(districtNumber : number) {

const DistrictNames : districtNameShape[]=[
        {districtNumber: 1, districtName: "Central Administration"},
        {districtNumber: 2, districtName: "Detention & Security"},
        {districtNumber: 3, districtName: "Industrial"},
        {districtNumber: 4, districtName: "Water & Sewage"},
        {districtNumber: 5, districtName: "Housing & Residential"},
        {districtNumber: 6, districtName: "Markets & Trade"},
        {districtNumber: 7, districtName: "Black Market"},
        {districtNumber: 8, districtName: "Nightlife"},
        {districtNumber: 9, districtName: "Food & Dining"},
        {districtNumber: 10, districtName: "Medical"},
        {districtNumber: 11, districtName: "Transport & freight"},
        {districtNumber: 12, districtName: "Communications"},
        {districtNumber: 13, districtName: "Slums"}
    ]

    let districtName : districtNameShape  | undefined= DistrictNames.find((dis)=>{
          return dis.districtNumber === districtNumber
      })
      if(districtName){
        return districtName.districtName
    }
    else{
        return null
    }

}

