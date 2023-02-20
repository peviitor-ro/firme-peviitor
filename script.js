const CardContainer = document.querySelector(".card-container");

fetch("https://api.peviitor.ro/v1/companies/?count=false")
  .then((response) => response.json())
  .then((data) => {
    data.companies.forEach((collaborator) => {
      const div = document.createElement("div");
      const title = document.createElement("h2");
      const image = document.createElement("img");
      const link = document.createElement("a");

      image.src = `./Assets/${collaborator.name}.avif`;
      title.textContent = collaborator.name;
      link.href = `https://peviitor.ro/rezultate?q=${collaborator.name}&country=Rom%C3%A2nia&page=1             `;

      link.appendChild(image);
      link.appendChild(title);
      div.appendChild(link);
      CardContainer.appendChild(div);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
