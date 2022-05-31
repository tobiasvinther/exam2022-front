const URL = "http://localhost:8080/api"

export function fetchRidersJerseys() {
    fetch(URL + "/riders")
        .then(res => res.json())
        .then(riders => {

            riders.sort(function(a, b){return a.rideTimeLong - b.rideTimeLong})

            let winner = riders[0]

            document.getElementById("yellow-id").innerText = winner.name + " (" + winner.rideTimeString + ")"

            //sort again, this time by sprint points
            riders.sort(function(a, b){return b.sprintPoints - a.sprintPoints})

            winner = riders[0]

            document.getElementById("green-id").innerText = winner.name + " (" + winner.sprintPoints + " point)"

            //sort again, this time by mountain points
            riders.sort(function(a, b){return b.mountainPoints - a.mountainPoints})

            winner = riders[0]

            document.getElementById("dotted-id").innerText = winner.name + " (" + winner.mountainPoints + " point)"
                
        })  
            
}
