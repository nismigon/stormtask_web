import { Nav, ButtonGroup, Button } from 'react-bootstrap';

function Sidebar(props) {
    
    const { groups, active, onCreate, onSelect } = props
    
    return(
       <div className="h-100 d-flex flex-column">
            <h2>StormTask</h2>
            <hr />
            <Nav variant="pills" 
                 className="flex-column mb-auto" 
                 defaultActiveKey={active}
                 onSelect={(selected) => onSelect(selected)}>
                {groups.map((element) => {
                    return (
                        <Nav.Item>
                            <Nav.Link eventKey={element.ID}>{element.Name}</Nav.Link>
                        </Nav.Item>
                    )
                })}
            </Nav>
            <div style={{justifySelf:"end"}}>
                <hr />
                <div className="text-center">
                    <h5>Group : </h5>
                    <ButtonGroup>
                        <Button variant="success" onClick={onCreate}>Create</Button>
                        <Button variant="warning">Modify</Button>
                        <Button variant="danger">Delete</Button>
                    </ButtonGroup>
                </div>
            </div>
       </div>
    )
}

export default Sidebar;