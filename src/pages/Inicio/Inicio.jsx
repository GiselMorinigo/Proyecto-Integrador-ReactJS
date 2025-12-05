import { Helmet } from "react-helmet-async";

const Inicio = () => {
  return (
    <>
      <Helmet>
        <title>Gié | Tienda de ropa y accesorios de moda</title>
        <meta
          name="description"
          content="Página de inicio de Gié, tienda de ropa y accesorios de moda."
        />
      </Helmet>
      <main
        style={{
          padding: "10px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>Contenido Principal</h2>
        <p>Este es un ejemplo de contenido dentro del área principal</p>
      </main>
    </>
  );
};

export default Inicio;
