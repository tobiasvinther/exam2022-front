const URL = "http://localhost:8080/api"

import { parseISO8601Duration } from "../../utils.js";

export function fetchRidersClassification() {
    fetch(URL + "/riders")
        .then(res => res.json())
        .then(riders => {

            riders.sort(function(a, b){return a.rideTimeLong - b.rideTimeLong})

            riders.forEach(rider => {
                console.log(rider.rideTimeString)
            })
           
            const rows = riders.map(rider => 
                `
                <tr id="row-id-${rider.id}">
                  <td id="id-${rider.id}">0</td>
                  <td>${rider.name}</td>
                  <td>${rider.country}</td>
                  <td value="${rider.teamName}">${rider.teamName}</td>
                  <td>${rider.rideTimeString}</td>
                  
                </tr>
                `
                ).join("\n")

                document.getElementById("rider-tbody-id").innerHTML = rows 
                
                //"calculate" placement for each rider
                let curIteration = 1
                riders.forEach(element => {
                    document.getElementById("id-" + element.id).innerText = curIteration
                    if(curIteration == 1) {
                        document.getElementById("row-id-" + element.id).style.backgroundColor = "#ffff00"
                    }
                    curIteration++
                });
                
        })        
}