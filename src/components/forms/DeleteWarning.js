import  Modal  from "react-bootstrap/Modal";
import  Button  from "react-bootstrap/Button";
import {useState} from "react";

const DeleteWarning = ({onDelete}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
    return(
      <>
      <Button size="sm" variant="warning" onClick={handleShow}>Delete</Button>
       <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to delete a meeting. Are you sure you want to delete it?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onDelete}>Yes I'm Sure</Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}

export default DeleteWarning