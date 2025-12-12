import { API_URL } from "../../../api.url";
import { buildProductPayload } from "../helpers/product.utils";

const createProduct = async (nuevoProducto) => {
  const payload = buildProductPayload(nuevoProducto);

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Error al crear producto.");
  }

  return res.json();
};

const updateProduct = async (productId, productoEditado) => {
  const payload = buildProductPayload(productoEditado);

  const res = await fetch(`${API_URL}/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Error la modificar producto.");
  }

  return res.json();
};

export const AdminServices = {
  createProduct,
  updateProduct,
};
