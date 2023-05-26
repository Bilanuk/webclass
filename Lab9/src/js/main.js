import home from "./views/home.js";
import about from "./views/about.js";
import categorylist from "./views/categoryList.js";
import category from "./views/category.js";
import item from "./views/item.js";

const routes = {
  "/": { title: "Home", render: home },
  "/about": { title: "About", render: about },
  "/categorylist": { title: "About", render: categorylist },
  "/categories/:category": { title: "Category", render: category },
  "/:category/items/:objectid": { title: "Item", render: item },
};

export function router() {
  let view = routes[location.pathname];

  if (!view && location.pathname.startsWith("/categories/")) {
    const category = location.pathname.split("/")[2];
    view = routes["/categories/:category"];
    view.category = category;
  }

  if (!view && location.pathname.startsWith("/")) {
    const category = location.pathname.split("/")[1];
    const objectid = location.pathname.split("/")[3];
    view = routes["/:category/items/:objectid"];
    view.category = category;
    view.objectid = objectid;
  }

  if (view) {
    document.title = view.title;
    app.innerHTML = view.render();
  } else {
    history.replaceState("", "", "/");
    router();
  }
}

// Handle navigation
window.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    history.pushState("", "", e.target.href);
    router();
  }
});

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);
