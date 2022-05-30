import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import { renderText, setActiveLink, renderTemplate, loadTemplate} from "./utils.js"
import { fetchRiders, loadTeamSelect, selectOnChange, modalButton, addRiderButton } from "./pages/riders/riders.js";
import { fetchRider, loadTeamsSelectManage, deleteButton, editButton } from "./pages/manage-rider/manage-rider.js";
import { fetchRidersClassification } from "./pages/classification/classification.js";

window.addEventListener("load", async () => {

  const templateHome = await loadTemplate("./pages/home/home.html")
  const templateAbout = await loadTemplate("./pages/about/about.html")
  const templateRiders = await loadTemplate("./pages/riders/riders.html")
  const templateManageRider = await loadTemplate("./pages/manage-rider/manage-rider.html")
  const templateClassification = await loadTemplate("./pages/classification/classification.html")

  const router = new Navigo("/", { hash: true });
  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on("/", () => renderTemplate(templateHome, "content"))
    .on("/about", () => renderTemplate(templateAbout, "content"))
    .on("/riders", () => {
      renderTemplate(templateRiders, "content")
      fetchRiders()
      loadTeamSelect()
      selectOnChange()
      modalButton()
      addRiderButton()
    })
    .on("/manage-rider", (match) => {
      renderTemplate(templateManageRider, "content")
      fetchRider(match)
      loadTeamsSelectManage()
      deleteButton(match)
      editButton()
    })
    .on("/classification", () => {
      renderTemplate(templateClassification, "content")
      fetchRidersClassification()
    })
    .on("/show-match", (match) => renderText(`<pre>${JSON.stringify(match, null, 2)}</pre>`, "content"))
    .notFound(() => renderText("No page for this route found", "content"))
    .resolve()
});

window.onerror = (e) => alert(e)