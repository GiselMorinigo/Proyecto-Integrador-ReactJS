export const CATEGORIES = [
  { value: "mujer", label: "Mujer" },
  { value: "hombre", label: "Hombre" },
  { value: "ninos", label: "Niño/a" },
];

export const INITIAL_VALUES = {
  nombre: "",
  subtitulo: "",
  precio: "",
  descripcion: "",
  imagenUrl: "",
  categoria: "",
};

export const normalizeString = (str = "") =>
  str
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ñ/g, "n")
    .trim();

export const SIZES = ["XS", "S", "M", "L", "XL"];

export const formatCategoria = (cat) => {
  if (!cat) return "";
  const categoria = cat.toLowerCase();
  if (categoria === "ninos") return "Niño/a";
  if (categoria === "mujer") return "Mujer";
  if (categoria === "hombre") return "Hombre";

  return categoria.charAt(0).toUpperCase() + categoria.slice(1);
};
