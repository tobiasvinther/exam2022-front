/*
const jerseys = [{"name" : "Den gule føretrøje"}, {"name" : "Den grønne pointtrøje"}, {"name" : "Den prikkede bjergtrøje"}, {"name" : "Den hvide trøje"}]

export function loadJerseys() {
    jerseys.forEach(jersey => {
        let masterList = document.getElementById("list-id")
        let newListItem = document.createElement("div")
        masterList.appendChild(newListItem)

        const newListItemBody =
            `
            <div class="row my-3">
                <div class="col-4">
                    <h4>
                        ${jersey.name}
                    </h4>
                </div>
                <div class="col-1">
                    <h4>
                    
                    </h4>
                </div>
                <div class="col-7">
            </div>
                </div>
            </div>
            `
        newListItem.innerHTML = newListItemBody
    })
}
*/

const URL = "http://localhost:8080/api"

export function fetchRidersJerseys() {
    fetch(URL + "/riders")
        .then(res => res.json())
        .then(riders => {

            riders.sort(function(a, b){return a.rideTimeLong - b.rideTimeLong})

            let winner = riders[0]

            document.getElementById("yellow-id").innerText = winner.name + " (" + winner.rideTimeString + ")"

            riders.sort(function(a, b){return b.sprintPoints - a.sprintPoints})

            winner = riders[0]

            document.getElementById("green-id").innerText = winner.name + " (" + winner.sprintPoints + " point)"

            riders.sort(function(a, b){return b.mountainPoints - a.mountainPoints})

            winner = riders[0]

            document.getElementById("dotted-id").innerText = winner.name + " (" + winner.mountainPoints + " point)"
                
        })  
            
}
