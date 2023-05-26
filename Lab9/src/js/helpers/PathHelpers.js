export const extractCategoryFromPath = () => {
  const path = location.pathname;
  const parts = path.split("/");
  const category = parts[parts.length - 1];
  return category;
};