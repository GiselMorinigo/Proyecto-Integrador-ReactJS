export const getInitialValues = (productEdit) => {
  if (!productEdit) return null;
  return {
    nombre: productEdit.nombre ?? "",
    subtitulo: productEdit.subtitulo ?? "",
    precio: String(productEdit.precio ?? ""),
    descripcion: productEdit.descripcion ?? "",
    imagenUrl: productEdit.imagen ?? "",
    categoria: productEdit.categoria ?? "",
  };
};

export const buildProductPayload = (producto) => ({
  nombre: producto.nombre.trim(),
  subtitulo: producto.subtitulo.trim(),
  precio: Number(producto.precio),
  descripcion: producto.descripcion.trim(),
  imagen: producto.imagenUrl.trim(),
  categoria: producto.categoria || "mujer",
});
