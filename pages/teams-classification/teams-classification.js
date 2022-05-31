const URL = "http://localhost:8080/api"

import { parseISO8601Duration } from "../../utils.js"

export function loadTeamsClassification() {
    fetch(URL + "/teams")
        .then(res => res.json())
        .then(teams => {

            teams.sort(function(a, b){return a.teamRideTimeLong - b.teamRideTimeLong})
           
            const rows = teams.map(team => 
                `
                <tr id="row-id-${team.id}">
                  <td id="id-${team.id}">0</td>
                  <td value="${team.teamName}">${team.teamName}</td>
                  <td id="time-id-${team.id}">${team.teamRideString}</td>
                </tr>
                `
                ).join("\n")

                document.getElementById("team-tbody-id").innerHTML = rows 
                
                //"calculate" placement for each team
                let curIteration = 1
                
                teams.forEach(team => {
                    
                    document.getElementById("id-" + team.id).innerText = curIteration
                    if(curIteration == 1) {
                        document.getElementById("row-id-" + team.id).style.backgroundColor = "#ffff00"
                    }
                    curIteration++
                    
                });
                
        })        
}