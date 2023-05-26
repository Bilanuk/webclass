import { extractCategoryFromPath } from "./PathHelpers.js";

export const handleAddItem = async (event) => {
  event.preventDefault();

  // Get the form inputs
  const nameInput = document.querySelector("#name");
  const descriptionInput = document.querySelector("#description");
  const imageUrlInput = document.querySelector("#imageUrl");

  // Create an object with the item data
  const newItem = {
    name: nameInput.value,
    description: descriptionInput.value,
    imageUrl: imageUrlInput.value,
  };

  // Extract the category from the path
  const category = extractCategoryFromPath();

  // Call the function to add the item to Firebase
  await addItemToFirebase(newItem, category);

  // Clear the form inputs
  nameInput.value = "";
  descriptionInput.value = "";
  imageUrlInput.value = "";

  // Reload the items to reflect the added item
  const itemsList = document.querySelector("items-list");
  itemsList.getItems();
};

const addItemToFirebase = async (item, category) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  };

  try {
    const response = await fetch(
      `https://team-project-d1243-default-rtdb.europe-west1.firebasedatabase.app/categories/${category}/items.json`,
      options
    );
    const json = await response.json();
  } catch (err) {
    console.log("Error adding item", err);
  }
};
