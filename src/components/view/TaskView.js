import { Col, Row, Button, Accordion } from "react-bootstrap";

function TaskView(props) {
    const {group, tasks, onCreate} = props
    return (
        <div className="p-3">
            <Row>
                <Col className="col-10">
                    <h2>{group.Name}</h2>
                </Col>
                <Col className="col-2">
                    <Button variant="success" onClick={onCreate}>Add task</Button>
                </Col>
            </Row>
            <hr />
            <Accordion>
                {
                tasks.map((element) => {
                    return (
                        <Accordion.Item>
                            <Accordion.Header>{element.libelle}</Accordion.Header>
                            <Accordion.Body>{element.description}</Accordion.Body>
                        </Accordion.Item>
                    )
                })
                }
            </Accordion>
        </div>
    )
}

export default TaskView;