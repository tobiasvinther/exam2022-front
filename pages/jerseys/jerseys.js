const jerseys = ["Den gule føretrøje", "green", "Den prikkede bjergtrøje", "white"]

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
                Hej
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
