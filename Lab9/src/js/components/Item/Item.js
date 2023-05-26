class Item extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const getItemData = async () => {
      const path = location.pathname;
      const parts = path.split("/");
      const category = parts[1];
      const itemId = parts[3];

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetch(
          `https://team-project-d1243-default-rtdb.europe-west1.firebasedatabase.app/categories/${category}/items/${itemId}.json`,
          options
        );
        const item = await response.json();
        
        return item;
      } catch (err) {
        console.log("Error getting item", err);
      }
    };

    const renderItem = async () => {
      const item = await getItemData();

      this.innerHTML = /*html*/ `
        <div class="item-wrapper">
          <h2>${item.name}</h2>
          <p>${item.description}</p>
          <img src="${item.imageUrl}" alt="${item.name}" />
        </div>
      `;
    };

    renderItem();
  }
}

customElements.define("item-component", Item);
