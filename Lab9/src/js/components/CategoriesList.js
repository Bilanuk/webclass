let getCategoriesData = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `https://team-project-d1243-default-rtdb.europe-west1.firebasedatabase.app/categories.json`,
      options
    );
    const json = await response.json();
    return json;
  } catch (err) {
    console.log("Error getting documents", err);
  }
};

class Categories extends HTMLElement {
  constructor() {
    super();

    const getCategories = async () => {
      const categories = await getCategoriesData();

      let categoriesHTML = "";

      for (const categoryName in categories) {
        categoriesHTML += `<div class="category-item div-link">
          <p class="category-name">${categoryName}</p>
          <a href="/categories/${categoryName}" class="category-link category-item" data-category="${categoryName}" data-link></a>
        </div>`;
      }

      categoriesHTML += `<div class="category-item div-link">
          <p class="category-name">Random</p>
          <a class="random-button" data-link>Go to Random Page</a>
        </div>`;

      this.innerHTML = /*html*/ `
        ${categoriesHTML}
      `;

      const categoryLinks = this.querySelectorAll(".category-link");
      categoryLinks.forEach((link) => {
        link.addEventListener("click", handleCategoryClick);
      });

      const randomButton = this.querySelector(".random-button");
      randomButton.addEventListener("click", handleRandomClick);
    };

    const handleCategoryClick = (event) => {
      event.preventDefault();
      history.pushState("", "", event.target.href);
    };

    const handleRandomClick = () => {
      const categories = this.querySelectorAll(".category-link");
      const randomIndex = Math.floor(Math.random() * categories.length);
      const randomCategory = categories[randomIndex].getAttribute("data-category");
      const randomURL = `/categories/${randomCategory}`;

      history.pushState("", "", randomURL);
    };

    getCategories();
  }
}

customElements.define("categories-list", Categories);
