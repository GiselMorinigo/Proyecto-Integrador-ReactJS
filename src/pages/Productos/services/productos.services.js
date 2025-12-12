import { API_URL } from "../../../api.url";
import { normalizeString } from "../helpers/productForm.utils";

const fetchProductos = async (category) => {
  const url = new URL(API_URL);

  if (category) {
    const cat = normalizeString(category);
    url.searchParams.set("categoria", cat);
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Error ${res.status} al obtener los productos.`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status} al eliminar el producto.`);
  }
};

const getProductId = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);

  if (res.status === 404) {
    throw new Error("Producto no encontrado");
  }

  if (!res.ok) {
    throw new Error(`Error ${res.status} al obtener el producto.`);
  }

  const data = await res.json();
  return data;
};

export const ProductServices = {
  fetchProductos,
  deleteProduct,
  getProductId,
};
