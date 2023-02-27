"use strict";

const cardContainer = document.querySelector(".card-container");
const selectColaboratori = document.querySelector(".count-colaboratori");
const searchInput = document.querySelector("#searchBar");
let colaboratori = [];

searchInput.addEventListener("input", (e) => {
  const dateInput = e.target.value.toLowerCase().replace(/\s+/g, "");
  const colaboratoriFiltrati = colaboratori.filter((colaborator) =>
    colaborator.name.toLowerCase().replace(/\s+/g, "").includes(dateInput)
  );
  displayColaboratori(colaboratoriFiltrati);
});

fetch("https://api.peviitor.ro/v1/companies/?count=false")
  .then((response) => response.json())
  .then((data) => {
    selectColaboratori.textContent = `avem scrapere pentru ${data.companies.length} de companii`;
    colaboratori = data.companies;
    displayColaboratori(colaboratori);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

function displayColaboratori(colaboratori) {
  cardContainer.innerHTML = "";
  colaboratori.forEach((collaborator) => {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const image = document.createElement("img");
    const link = document.createElement("a");

    const allToLowerCase = collaborator.name.toLowerCase().replace(/\s+/g, "");

    image.src = `./assets/${allToLowerCase}.png`;
    image.alt = collaborator.name;
    c;

    image.onerror = () => {
      image.src = "./assets/logonotfound.png";
    };
    title.textContent = allToLowerCase;
    link.href = `https://peviitor.ro/rezultate?q=${allToLowerCase}&country=Rom%C3%A2nia&page=1             `;

    link.appendChild(image);
    link.appendChild(title);
    div.appendChild(link);
    cardContainer.appendChild(div);
  });
}
