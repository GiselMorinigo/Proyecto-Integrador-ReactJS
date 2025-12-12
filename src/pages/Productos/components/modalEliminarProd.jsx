import { Modal, Button, Row } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";

const ModalEliminarProducto = ({ show, producto, onClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <BiTrash className="text-dark mb-3" size={30} />
        </Row>
        <h5 className="text-center">
          ¿Estás seguro de que querés eliminar{" "}
          <strong>{producto?.subtitulo}</strong>?
        </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button
          aria-label="Cancelar eliminacion"
          variant="outline-dark"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          aria-label="Eliminar producto"
          variant="dark"
          onClick={onConfirm}
        >
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminarProducto;
