import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import { fetchRiders, loadTeamSelect, selectOnChange, modalButton, addRiderButton } from "./pages/riders/riders.js";
import { renderText, setActiveLink, renderTemplate, loadTemplate} from "./utils.js"

window.addEventListener("load", async () => {

  const templateHome = await loadTemplate("./pages/home/home.html")
  const templateAbout = await loadTemplate("./pages/about/about.html")
  const templateProducts = await loadTemplate("./pages/products/products.html")
  const templateRiders = await loadTemplate("./pages/riders/riders.html")

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
    .on("/products", (match) => {
      renderTemplate(templateProducts, "content")
      if (match.params) {
        document.getElementById("selected-product-id").innerText = match.params.id
      }
    })
    .on("/riders", () => {
      renderTemplate(templateRiders, "content")
      fetchRiders()
      loadTeamSelect()
      selectOnChange()
      modalButton()
      addRiderButton()
    })
    .on("/show-match", (match) => renderText(`<pre>${JSON.stringify(match, null, 2)}</pre>`, "content"))
    .notFound(() => renderText("No page for this route found", "content"))
    .resolve()
});

window.onerror = (e) => alert(e)