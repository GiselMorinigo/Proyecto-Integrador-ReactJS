import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { INITIAL_VALUES, normalizeString } from "../helpers/productForm.utils";

const useProductoForm = ({ modo, initialValues, onAgregar }) => {
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (modo === "edit" && initialValues) {
      setFormValues({
        ...INITIAL_VALUES,
        ...initialValues,
        categoria: normalizeString(initialValues.categoria),
      });
    } else if (modo === "create") {
      setFormValues(INITIAL_VALUES);
    }
  }, [modo, initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setValidated(false);
  };

  const validation = useMemo(() => {
    const priceNumber = parseFloat(formValues.precio);

    const isPriceValid = !Number.isNaN(priceNumber) && priceNumber > 0;

    const isImageUrlValid = () => {
      const url = formValues.imagenUrl.trim();
      if (!url) return false;
      return /^https?:\/\/.+/i.test(url);
    };

    const validImageUrl = isImageUrlValid();
    const showPreview = validImageUrl;

    return {
      priceNumber,
      isPriceValid,
      validImageUrl,
      showPreview,
    };
  }, [formValues.precio, formValues.imagenUrl]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const isFormValid = form.checkValidity();
    const isCustomValid = validation.isPriceValid && validation.validImageUrl;

    if (!isFormValid || !isCustomValid) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    const nuevoProducto = {
      nombre: formValues.nombre.trim(),
      subtitulo: formValues.subtitulo.trim(),
      precio: validation.priceNumber,
      descripcion: formValues.descripcion.trim(),
      imagenUrl: formValues.imagenUrl.trim(),
      categoria: normalizeString(formValues.categoria) || "mujer",
    };

    await onAgregar?.(nuevoProducto);

    navigate(`/productos/${nuevoProducto.categoria}`);

    if (modo === "create") {
      setFormValues(INITIAL_VALUES);
      setValidated(false);
    }
  };

  const handleCancel = () => navigate(-1);

  return {
    formValues,
    validated,
    ...validation,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};

export default useProductoForm;
