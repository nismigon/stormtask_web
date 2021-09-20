import { useState } from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";

function ModalCreateGroup(props) {
    
    const { show, onHide, onCreate } = props
    const [ group, setGroup ] = useState("");
    
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                Create a new group
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel controlId="floatingGroup" label="Group" className="mb-3">
                    <Form.Control type="text" placeholder="group" onChange={(event) => setGroup(event.target.value)}/>
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="success" onClick={() => onCreate(group)}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCreateGroup;