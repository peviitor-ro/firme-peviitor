"use strict";

const cardContainer = document.querySelector(".card-container");
const selectColaboratori = document.querySelector(".count-colaboratori");
const searchInput = document.querySelector("#searchBar");
let colaboratori = [];
let onpage_colaboratori = [];
let step = 48;

searchInput.addEventListener("input", (e) => {
  const dateInput = e.target.value.toLowerCase().replace(/\s+/g, "");
  const colaboratoriFiltrati = onpage_colaboratori.filter((colaborator) =>
    colaborator.textContent
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(dateInput)
  );
  cardContainer.innerHTML = "";
  colaboratoriFiltrati.forEach((colaborator) => {
    cardContainer.appendChild(colaborator);
  });
  if (colaboratoriFiltrati.length === 0) {
    cardContainer.innerHTML = `<h1 class="not-found">Nu am gasit nimic pentru ${dateInput} !</h1>`;
  }
});

fetch("https://api.peviitor.ro/v1/logo/")
  .then((response) => response.json())
  .then((data) => {
    selectColaboratori.textContent = `avem scrapere pentru ${data.companies.length} de companii !`;
    colaboratori = data.companies;
    displayColaboratori(colaboratori);
  })
  .then(() => {
    for (let i = 0; i < step; i++) {
      cardContainer.appendChild(onpage_colaboratori[i]);
    }

    window.addEventListener("scroll", () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 10
      ) {
        for (let i = step; i < step + 48; i++) {
          if (i < onpage_colaboratori.length) {
            cardContainer.appendChild(onpage_colaboratori[i]);
          }
        }
        step += 48;
      }
    });
  });

function displayColaboratori(colaboratori) {
  colaboratori.forEach((collaborator) => {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const image = document.createElement("img");
    const link = document.createElement("a");
    const titleLink = document.createElement("a");

    const allToLowerCase = collaborator.name.replace(/\s+/g, "");

    const assetPath = `./assets/${allToLowerCase}.png`;

    if (collaborator.logo === null) {
      image.src = assetPath;
    } else {
      image.src = collaborator.logo;
    }

    image.alt = collaborator.name;
    image.onerror = () => {
      image.src = "./assets/logonotfound.png";
    };

    title.textContent = allToLowerCase;
    link.href = `https://peviitor.ro/rezultate?q=${allToLowerCase}&country=Rom%C3%A2nia&page=1`;

    link.appendChild(image);
    div.appendChild(link);
    titleLink.href = `https://scraper-ui.netlify.app/src/${allToLowerCase}/index.html`;
    titleLink.appendChild(title);
    div.appendChild(titleLink);
    onpage_colaboratori.push(div);
  });
}
