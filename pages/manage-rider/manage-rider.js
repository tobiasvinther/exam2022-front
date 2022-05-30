import { makeOptions } from "../../fetchUtils.js";
import { loadTeamSelect } from "../riders/riders.js";

const URL = "http://localhost:8080/api"
let riderId

export function loadTeamsSelectManage() {
    loadTeamSelect()
}

//get a single rider using id parameter from url
export function fetchRider(match) {

    riderId = match?.params?.id

    fetch(URL + "/riders/" + riderId)
        .then(res => res.json())
        .then(rider => {
           document.getElementById("name-id").value = rider.name
           document.getElementById("country-id").value = rider.country
           document.getElementById('team-select').value = rider.teamName
                
        })

}

export function deleteButton() {
    document.getElementById("btn-delete-id").onclick = deleteRider

}

function deleteRider() {
    fetch(URL + "/riders/delete/" +  riderId, makeOptions("DELETE"))
        .then(res=>{
            if(!res.ok){
                return Promise.reject("Error: " + res.status)
            }
            return res.json()
        })
        .catch(e => console.error(e))

        alert("rytter slettet")
        window.location.href = "/#/riders";
}

export function editButton() {
    document.getElementById("btn-edit-id").onclick = editRider

}

function editRider() {

    let riderRequest = {
        "name" : document.getElementById("name-id").value,
        "country" : document.getElementById("country-id").value, 
        "teamName" : document.getElementById("team-select").value }

    fetch(URL + "/riders/edit/" +  riderId, makeOptions("PATCH", riderRequest))
        .then(res=>{
            if(!res.ok){
                return Promise.reject("Error: " + res.status)
            }
            return res.json()
        })
        .catch(e => console.error(e))

        alert("Rytter gemt")
        window.location.href = "/#/riders";
}