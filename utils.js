/**
 * Appends the provided template to the node with the id contentId
 * @param {template} template 
 * @param {*} contentId 
 */
export function renderTemplate(template, contentId) {
  const clone = template.content.cloneNode(true)
  const content = document.getElementById(contentId)
  content.innerHTML = ""
  content.appendChild(clone)
}
/**
 * Inserts the provided text into innerHTML of the node with the id 'contentId'
 * @param {string} contextId - Text to insert 
 * @param {string} contentId - id of node where text must be insert 
 */
export function renderText(txt, contentId){
  if(!txt || !contentId){
    throw new Error("Missing input arguments in renderText")
  }
  const node =  document.getElementById(contentId)
  if(!node){
    throw new Error(`No element found for the contentId '${contentId}' `)
  }
  node.innerHTML = txt
}

/**
 * Loads an external file with an html-template, adds it to the body of your page, and returns the template
 * The file to be loaded can contain more than one template, but the one that will be returned must
 * be the first one in the file and this does not require an id
 * @param {string} page - Path to the file containing the template ('/templates/template.html')
 * @returns {template} The first HtmlTemplate found in the file
 */
export async function loadTemplate(page) {
  const resHtml = await fetch(page).then(r => {
    if (!r.ok) {
      throw new Error(`Failed to load the page: '${page}' `)
    }
    return r.text()
  });
  const body = document.getElementsByTagName("BODY")[0];
  const div = document.createElement("div");
  div.innerHTML = resHtml;
  body.appendChild(div)
  return div.querySelector("template")
};

/**
 * Sets active element on a div (or similar) containing a-tags (with data-navigo attributes ) used as a "menu"
 * Meant to be called in a before-hook with Navigo
 * @param {string} topnav - Id for the element that contains the "navigation structure"
 * @param {string} activeUrl - The URL which are the "active" one
 */
export function setActiveLink(topnav, activeUrl) {
  const links = document.getElementById(topnav).querySelectorAll("a");
  links.forEach(child => {
    child.classList.remove("active")
    //remove leading '/' if any
    if (child.getAttribute("href").replace(/\//, "") === activeUrl) {
      child.classList.add("active")
    }
  })
}

/**
 * The encoder method we have used when inserting untrusted data via the innerHTML property
 * Ref: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
 * @param {str} str 
 * @returns the encode string
 */
export function encode(str) {
  str = str.replace(/&/g, "&amp;");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/"/g, "&quot;");
  str = str.replace(/'/g, "&#039;");
  return str;
}

export function parseISO8601Duration (iso8601Duration) {
    const iso8601DurationRegex = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?/;
    let matches = iso8601Duration.match(iso8601DurationRegex);

    let timeObject = {
        sign: matches[1] === undefined ? '+' : '-',
        years: matches[2] === undefined ? 0 : matches[2],
        months: matches[3] === undefined ? 0 : matches[3],
        weeks: matches[4] === undefined ? 0 : matches[4],
        days: matches[5] === undefined ? 0 : matches[5],
        hours: matches[6] === undefined ? 0 : matches[6],
        minutes: matches[7] === undefined ? 0 : matches[7],
        seconds: matches[8] === undefined ? 0 : matches[8]
    }

    return timeObject.hours + ":" + timeObject.minutes + ":" + timeObject.seconds
}
