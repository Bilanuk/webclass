let getUsers = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `https://team-project-d1243-default-rtdb.europe-west1.firebasedatabase.app/users.json`,
      options
    );
    const json = await response.json();
    return json;
  } catch (err) {
    console.log("Error getting documents", err);
  }
};

class Users extends HTMLElement {
  constructor() {
    super();

    const getUsersData = async () => {
      const users = await getUsers();

      let usersHTML = "";

      // Loop through the users and generate HTML markup
      for (const userId in users) {
        const user = users[userId];
        usersHTML += `<div class="col-3 col-m-4 col-s-12 user-wrapper">
          <h2>${user.name}</h2>
          <p>${user.description}</p>
          <img src="${user.image}" alt="${user.name}" />
          <div class="div-link user-links">
            <span>View github profile</span>
            <span class="material-icons">terminal</span>
            <a href="${user.github}">View github profile</a>
          </div>
        </div>`;
      }

      this.innerHTML = /*html*/ `
        ${usersHTML}
      `;
    }

    getUsersData();
  }
}

customElements.define("users-list", Users);
