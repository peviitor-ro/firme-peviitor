"use strict";

const cardContainer = document.querySelector(".card-container");
const selectColaboratori = document.querySelector(".count-colaboratori");
const searchInput = document.querySelector("#searchBar");
let colaboratori = [];
let logos = [];

searchInput.addEventListener("input", (e) => {
  const dateInput = e.target.value.toLowerCase().replace(/\s+/g, "");
  const colaboratoriFiltrati = colaboratori.filter((colaborator) =>
    colaborator.name.toLowerCase().replace(/\s+/g, "").includes(dateInput)
  );
  displayColaboratori(colaboratoriFiltrati, logos);
});

fetch("https://api.peviitor.ro/v1/companies/?count=false")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    selectColaboratori.textContent = `avem scrapere pentru ${data.companies.length} de companii !`;
    colaboratori = data.companies;
  })
  .then(() => {
    fetch("https://api.peviitor.ro/v1/logo/")
      .then((response) => response.json())
      .then((d) => {
        logos = d.companies;
        displayColaboratori(colaboratori, logos);
      });
  })
  .catch((error) => {
    console.log("Error:", error);
  });

function displayColaboratori(colaboratori, logos) {
  cardContainer.innerHTML = "";
  colaboratori.forEach((collaborator) => {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const image = document.createElement("img");
    const link = document.createElement("a");

    const allToLowerCase = collaborator.name.toLowerCase().replace(/\s+/g, "");

    for (let i = 0; i < logos.length; i++) {
      if (
        allToLowerCase === logos[i].name.toLowerCase().replace(/\s+/g, "") &&
        logos[i].logo !== null
      ) {
        image.src = logos[i].logo;
        image.alt = collaborator.name;
        break;
      } else {
        image.src = `./assets/${allToLowerCase}.png`;
        image.alt = collaborator.name;
        image.onerror = () => {
          image.src = "./assets/logonotfound.png";
        };
      }
    }
    title.textContent = allToLowerCase;
    link.href = `https://peviitor.ro/rezultate?q=${allToLowerCase}&country=Rom%C3%A2nia&page=1             `;

    link.appendChild(image);
    link.appendChild(title);
    div.appendChild(link);
    cardContainer.appendChild(div);
  });
}
