import  Modal  from "react-bootstrap/Modal";
import  Button  from "react-bootstrap/Button";
import {useState} from "react";
import {deleteMeeting} from "../layout/Body"

const DeleteWarning = ({onClose, onDelete}) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
    return(
      <>
      <Modal
        show={show}
        onHide={onClose}
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
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}

export default DeleteWarning