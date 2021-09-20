import { useState } from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";

function ModalCreateTask(props) {
    
    const { show, onHide, onCreate } = props
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                Create a new task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                    <Form.Control type="text" placeholder="Name" onChange={(event) => setName(event.target.value)}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
                    <Form.Control as="textarea" style={{ height: '100px' }} placeholder="Description" onChange={(event) => setDescription(event.target.value)}/>
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="success" onClick={() => onCreate(name, description)}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCreateTask;