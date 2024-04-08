"use strict";

const cardContainer = document.querySelector(".card-container");
const selectColaboratori = document.querySelector(".count-colaboratori");
const searchInput = document.querySelector("#searchBar");
let colaboratori = [];
let onpage_colaboratori = [];
let step = 48;

let last_known_scroll_position = 0;
window.addEventListener("scroll", () => {
  let st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > last_known_scroll_position) {
    document.querySelector(".sticky").classList.add("translate");
  } else {
    document.querySelector(".sticky").classList.remove("translate");
  }
  last_known_scroll_position = st <= 0 ? 0 : st;
});

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
    selectColaboratori.textContent = `Listinguri de la ${data.companies.length} companii !`;
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
    const allToLowerCase = collaborator.name.replace(/\s+/g, "");

    const firmaDiv = document.createElement("div");
    firmaDiv.classList.add("firma");

    const button = document.createElement("button");
    const image = document.createElement("img");
    const link = document.createElement("a");
    link.href = `https://peviitor.ro/#/rezultate`;

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

    button.textContent = allToLowerCase;
    button.id = allToLowerCase;
    button.onclick = function () {
      window.location.href = `https://scrapers.peviitor.ro/src/${allToLowerCase}/index.html`;
    };

    link.appendChild(image);
    firmaDiv.appendChild(link);
    firmaDiv.appendChild(button);
    onpage_colaboratori.push(firmaDiv);
  });
}
