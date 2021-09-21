import { useState, useEffect } from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";

function ModalModifyGroup(props) {
    
    const { show, onHide, onSubmit, groupID, groupValue } = props
    const [ group, setGroup ] = useState(groupValue);
    
    useEffect(() => {
        setGroup(groupValue)
    }, [groupValue])

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                Modify a group
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel controlId="floatingGroup" label="Group" className="mb-3">
                    <Form.Control 
                        type="text" 
                        placeholder="group" 
                        value={group} 
                        onChange={(event) => setGroup(event.target.value)}
                    />
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="warning" onClick={() => onSubmit(groupID, group)}>Modify</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalModifyGroup;