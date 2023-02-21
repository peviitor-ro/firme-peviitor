const cardContainer = document.querySelector(".card-container");
const selectColaboratori = document.querySelector(".count-colaboratori");
const searchInput = document.querySelector(".search");

searchInput.addEventListener("input", (e) => {
  const value = e.target.value;
});

fetch("https://api.peviitor.ro/v1/companies/?count=false")
  .then((response) => response.json())
  .then((data) => {
    data.companies.forEach((collaborator) => {
      const div = document.createElement("div");
      const title = document.createElement("h2");
      const image = document.createElement("img");
      const link = document.createElement("a");

      selectColaboratori.textContent = `COLABORATORI PE VIITOR =>  ${data.companies.length}`;

      const firstLettertToUppperCase =
        collaborator.name.charAt(0).toUpperCase() +
        collaborator.name.slice(1).replace(/\s+/g, "").toLowerCase();

      image.src = `./Assets/${firstLettertToUppperCase}.avif`;
      image.onerror = () => {
        image.src = "./Assets/Logonotfound.png";
      };
      title.textContent = firstLettertToUppperCase;
      link.href = `https://peviitor.ro/rezultate?q=${firstLettertToUppperCase}&country=Rom%C3%A2nia&page=1             `;

      link.appendChild(image);
      link.appendChild(title);
      div.appendChild(link);
      cardContainer.appendChild(div);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });

/*

Sure, I can explain the logic behind the search feature.

First, we need to get a reference to the search input element using document.querySelector().

Next, we need to add an event listener to the input element that listens for the input event, which fires whenever the value of the input changes.

Inside the event listener, we get the value of the input using event.target.value. We trim the value to remove any leading or trailing white space and convert it to lowercase to make the search case-insensitive.

Then, we filter the original data array to get only the items that match the search query. In this case, we use Array.filter() to check if the name of each collaborator includes the search query.

After filtering the data array, we clear the existing cards in the card container using CardContainer.innerHTML = "". Then, we loop through the filtered data array and create a new card for each collaborator using document.createElement(). Finally, we append the card to the card container using CardContainer.appendChild().

I hope this explanation helps you understand the logic behind the search feature. Let me know if you have any further questions!


*/
