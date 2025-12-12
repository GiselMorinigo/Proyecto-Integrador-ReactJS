export const CATEGORIES = [
  {
    key: "mujer",
    title: "Mujer",
    subtitle: "Últimas novedades",
    img: "https://cdn-static.farfetch-contents.com/cms-ccloud/caas/v1/media/10237870/data/8d586afc805ba8fa94ebc71547f5dd47/3x4_four-columns/480/no-search-results-women-clothing.jpeg",
    alt: "Ropa para mujer",
  },
  {
    key: "hombre",
    title: "Hombre",
    subtitle: "Colección masculina",
    img: "https://cdn-static.farfetch-contents.com/cms-ccloud/caas/v1/media/10238168/data/4ce91ba9be3e9c84335c511eec72aadb/3x4_four-columns/480/no-search-results-men-clothing.jpeg",
    alt: "Ropa para hombre",
  },
  {
    key: "ninos",
    title: "Kids",
    subtitle: "Para los más chicos",
    img: "https://cdn-static.farfetch-contents.com/cms-ccloud/caas/v1/media/10238750/data/c4f3a69822adba9d55b3f49bcefd2008/3x4_four-columns/480/no-search-results-kids-boys.jpeg",
    alt: "Ropa para niños/as",
  },
];

export const PLACEHOLDER_IMG_SVG =
  "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%221200%22%20height%3D%22750%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23eee%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23999%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2240%22%3EImagen%20no%20disponible%3C%2Ftext%3E%3C%2Fsvg%3E";

export const handleImageError = (e) => {
  e.currentTarget.style.backgroundColor = "#f2f2f2";
  e.currentTarget.src = PLACEHOLDER_IMG_SVG;
};
