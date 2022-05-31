const URL = "http://localhost:8080/api"

import { makeOptions } from "../../fetchUtils.js";

//populate table with riders
export function fetchRiders() {
    fetch(URL + "/riders")
        .then(res => res.json())
        .then(riders => {
           
            const rows = riders.map(rider => 
                `
                <tr onclick="window.location='#/manage-rider/?id=${rider.id}';" style="cursor: pointer;">
                  <td>${rider.name}</td>
                  <td>${rider.birthDay}</td>
                  <td>${rider.country}</td>
                  <td value="${rider.teamName}">${rider.teamName}</td>       
                </tr>
                `
                ).join("\n")

                document.getElementById("rider-tbody-id").innerHTML = rows       
        })        
}

//populate the dropdown menu with teams
export function loadTeamSelect() {
    fetch(URL + "/teams")
        .then(res => res.json())
        .then(teams => {

            let select = document.getElementById("team-select")

            teams.forEach(team => {
                let newOption = document.createElement('option')
                newOption.text = team.teamName
                select.appendChild(newOption)
            })

        })
}

//whenever a new option (teams) is selected, call the filterList function
export function selectOnChange() {
    document.getElementById("team-select").onchange = function() {
        filterList()
    }
}

function filterList() {
    let input = document.getElementById("team-select").value.toUpperCase()
    console.log(input)

    if(input == "ALLE HOLD") {
        fetchRiders()
        return
    }

    fetch(URL + "/riders")
        .then(res => res.json())
        .then(riders => {

            const rows = riders.filter(rider => rider.teamName.toUpperCase() == input).map(rider =>
                `
                <tr onclick="window.location='#/manage-rider/?id=${rider.id}';" style="cursor: pointer;">
                  <td>${rider.name}</td>
                  <td>${rider.birthDay}</td>
                  <td>${rider.country}</td>
                  <td value="${rider.teamName}">${rider.teamName}</td>
                  
                </tr>
                `
            ).join("\n")
            document.getElementById("rider-tbody-id").innerHTML = rows
        })
}

//modal
export function modalButton() {
    document.getElementById("modal-add-id").onclick = loadTeamsInModal
}

function loadTeamsInModal() {
    loadTeamsSelectModal()
}

//load the teams for the drop down inside the modal
function loadTeamsSelectModal() {
    fetch(URL + "/teams")
        .then(res => res.json())
        .then(teams => {

            let select = document.getElementById("team-select-modal")

            teams.forEach(team => {
                let newOption = document.createElement('option')
                newOption.text = team.teamName
                select.appendChild(newOption)
            })

        })
}

export function addRiderButton() {
    document.getElementById("btn-add-id").onclick = addRider
}

function addRider() {
    let riderRequest = {
        "name" : document.getElementById("name-id").value,
        //"birthDay" : document.getElementById("birthday-id").value, 
        "country" : document.getElementById("country-id").value, 
        "teamName" : document.getElementById("team-select-modal").value }

    fetch(URL + "/riders/add-rider", makeOptions("POST", riderRequest))
        .then(res=>{
            if(!res.ok){
                return Promise.reject("Error: " + res.status)
            }
            return res.json()
        })
        .catch(e => console.error(e))

        alert("Rytter oprettet")
    
        let modal = document.getElementById("team-select-modal")
        
    fetchRiders()
}