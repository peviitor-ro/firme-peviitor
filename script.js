const CardContainer = document.querySelector(".card-container");

fetch("https://api.peviitor.ro/v1/companies/?count=false")
  .then((response) => response.json())
  .then((data) => {
    data.companies.forEach((collaborator) => {
      const div = document.createElement("div");
      const title = document.createElement("h2");
      const image = document.createElement("img");
      const link = document.createElement("a");

      console.log(collaborator.name, "API-DATA");

      const firstLettertToUppperCase =
        collaborator.name.charAt(0).toUpperCase() +
        collaborator.name.slice(1).replace(/\s+/g, "").toLowerCase();

      console.log(firstLettertToUppperCase, "MODIFIED-DATA");

      if (firstLettertToUppperCase === `./Assets/${firstLettertToUppperCase}`) {
        image.src = `./Assets/${firstLettertToUppperCase}.avif`;
      } else {
        image.src = `./Assets/nologo.avif`;
      }

      image.src = `./Assets/${firstLettertToUppperCase}.avif`;
      title.textContent = firstLettertToUppperCase;
      link.href = `https://peviitor.ro/rezultate?q=${firstLettertToUppperCase}&country=Rom%C3%A2nia&page=1             `;

      link.appendChild(image);
      link.appendChild(title);
      div.appendChild(link);
      CardContainer.appendChild(div);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
