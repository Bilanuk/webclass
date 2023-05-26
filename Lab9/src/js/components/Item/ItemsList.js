import { extractCategoryFromPath } from "../../helpers/PathHelpers.js";
import { handleAddItem } from "../../helpers/FormHelper.js";
import '../Item/AddItemForm.js';

class Items extends HTMLElement {
  constructor() {
    super();

    const getItemsData = async (category) => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await fetch(
          `https://team-project-d1243-default-rtdb.europe-west1.firebasedatabase.app/categories/${category}/items.json`,
          options
        );
        const json = await response.json();
        return json;
      } catch (err) {
        console.log("Error getting documents", err);
      }
    };

    const getItems = async () => {
      const category = extractCategoryFromPath();
      const items = await getItemsData(category);

      let itemsHTML = "";

      // Loop through the items and generate HTML markup
      for (const itemId in items) {
        const item = items[itemId];
        // Add a link around each item
        itemsHTML += `
          <div class="col-12 item-card div-link">
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <a href="/${category}/items/${itemId}" class="item-link" data-link>Go To...</a>
            <img src="${item.imageUrl}" alt="${item.name}" />
          </div>`;
      }

      this.innerHTML = /*html*/ `
        ${itemsHTML}
      `;

      const addItemForm = this.querySelector("#addItemForm");
      addItemForm.addEventListener("submit", handleAddItem);

      // Add event listeners to the item links
      const itemLinks = this.querySelectorAll(".item-link");
      itemLinks.forEach((link) => {
        link.addEventListener("click", handleItemClick);
      });
    };

    const handleItemClick = (event) => {
      event.preventDefault();
      const itemId = event.currentTarget.getAttribute("href").split("/")[2];
      history.pushState("", "", event.target.href);
    };

    this.getItems = getItems;
    getItems();
  }
}

customElements.define("items-list", Items);
