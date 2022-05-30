const URL = "http://localhost:8080/api"

export function fetchRidersClassification() {
    fetch(URL + "/riders")
        .then(res => res.json())
        .then(riders => {

            riders.sort(function(a, b){return a.rideTime - b.rideTime})
           
            const rows = riders.map(rider => 
                `
                <tr>
                  <td id="id-${rider.id}">0</td>
                  <td>${rider.name}</td>
                  <td>${rider.country}</td>
                  <td value="${rider.teamName}">${rider.teamName}</td>
                  <td>${rider.rideTime}</td>
                  
                </tr>
                `
                ).join("\n")

                document.getElementById("rider-tbody-id").innerHTML = rows 
                
                //"calculate" placement for each rider
                let curIteration = 1
                riders.forEach(element => {
                    document.getElementById("id-" + element.id).innerText = curIteration
                    curIteration++
                });
                
        })        
}