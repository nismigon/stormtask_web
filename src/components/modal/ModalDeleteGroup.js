import { Modal, Button } from "react-bootstrap";

function ModalDeleteGroup(props) {
    
    const { show, onHide, onSubmit, groupID, groupValue } = props

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                Delete a group
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure to delete <strong>{groupValue}</strong> ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="danger" onClick={() => onSubmit(groupID)}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDeleteGroup;