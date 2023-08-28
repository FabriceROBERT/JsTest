const ajouterTache = document.getElementById("buttonAjouter");
const poubelle = document.getElementById("poubelle");
// console.log(poubelle);
const listeTaches = document.getElementById("listeTaches");

ajouterTache.addEventListener("click", () => {
  //  creation de la variable li
  const li = document.createElement("li");
  li.className = "tache";
  // autoriser que li peut déplacer
  li.setAttribute("draggable", true);
  li.innerHTML =
    `
    <input type="text" class="nom" placeholder="Nom de la tâche" disabled /> ` +
    `<input type="text" class="description" placeholder="Description" disabled />` +
    `<select class="statut" id="" disabled>` +
    `<option value="">Non commencée</option>` +
    `<option value="">En cours</option>` +
    `<option value="">Terminée</option>` +
    `</select>`;
  listeTaches.appendChild(li);
});

listeTaches.addEventListener("dblclick", editer);
listeTaches.addEventListener("dragstart", maintenir);
listeTaches.addEventListener("dragover", maintenirParDefault);
poubelle.addEventListener("dragover", maintenirParDefault);
poubelle.addEventListener("drop", supprimerTache);
listeTaches.addEventListener("drop", reorganiser);

// fonction ajouter() permet de créer les "li" et de les appelés avec le bouton ajouter

function editer(event) {
  if (
    event.target.classList.contains("nom") ||
    event.target.classList.contains("description") ||
    event.target.classList.contains("statut")
  ) {
    event.target.removeAttribute("disabled");
  }
}

let glisserTache = null;

function maintenir(event) {
  // element actuel
  glisserTache = event.target;
  // autorise l'élement à être déplacé
  event.dataTransfer.effectAllowed = "move";
  // que du texte mais aucune donnée
  event.dataTransfer.setData = ("text/plain", null);
}

function maintenirParDefault(event) {
  event.preventDefault();
}
function reorganiser(event) {
  // verifier si l'element est bien dans la classe tache
  if (event.target.classList.contains("tache")) {
    // si l'element est une tache alors la variable glisserTache est alors l'element et va se placer l'endroit choisi
    event.target.parentElement.insertBefore(
      glisserTache,
      event.target.nextSibling
    );
    // glisserTache redevient nulle
    glisserTache = null;
  }
}

function supprimerTache() {
  if (glisserTache) {
    glisserTache.remove();
    glisserTache = null;
  }
}
