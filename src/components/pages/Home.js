import React, { Fragment } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Sidebar from '../view/Sidebar';
import TaskView from '../view/TaskView';
import Cookies from 'js-cookie';
import axios from 'axios';
import configuration from '../../configuration.json'
import ModalCreateGroup from '../modal/ModalCreateGroup';
import ModalCreateTask from '../modal/ModalCreateTask';
import {useState, useEffect} from 'react'
import ModalModifyGroup from '../modal/ModalModifyGroup';
import ModalDeleteGroup from '../modal/ModalDeleteGroup';

function Home() {
    
    const jwt_token = Cookies.get("JWT_token")
    if (jwt_token === undefined) {
        this.props.history.push("/")
    }

    const [groups, setGroups] = useState([]);
    const [active, setActive] = useState("");
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
    const [showModifyGroupModal, setShowModifyGroupModal] = useState(false);
    const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const getBackendData = () => {
        axios.get(configuration.BACKEND_URL + "/group", {withCredentials: true}).then((response) => {
            setGroups(response.data);
        }).catch(() => {
            setShowAlert(true);
            setAlertMessage("Failed to get data from the server")
        })
    }

    const createGroup = (group) => {
        axios.post(configuration.BACKEND_URL + '/group', {
            name : group
        }, {withCredentials: true}).then(() => {
            setShowCreateGroupModal(false)
            getBackendData()
        }).catch(() => {
            setShowCreateGroupModal(false)
            setShowAlert(true)
            setAlertMessage("Failed to add " + group)
        })
    }

    const modifyGroup = (groupID, groupValue) => {
        axios.put(configuration.BACKEND_URL + '/group', {
            id : parseInt(groupID, 10),
            name : groupValue
        }, {withCredentials: true}).then(() => {
            setShowModifyGroupModal(false)
            getBackendData()
        }).catch(() => {
            setShowModifyGroupModal(false)
            setShowAlert(true)
            setAlertMessage("Failed to modify " + getGroup(groupID)['Name'])
        })
    }

    const deleteGroup = (groupID) => {
        axios.delete(configuration.BACKEND_URL + '/group', 
            {
                withCredentials: true,
                data : { id : parseInt(groupID, 10) }
            }
        ).then(() => {
            setShowDeleteGroupModal(false)
            getBackendData()
        }).catch(() => {
            setShowDeleteGroupModal(false)
            setShowAlert(true)
            setAlertMessage("Failed to delete " + getGroup(groupID)['Name'])
        })
    }

    const getGroup = (groupID) => {
        for (const element of groups) {
            if (element.ID === parseInt(groupID, 10)) {
                return element
            } 
          }
        return {}
    }

    useEffect(() => {
        getBackendData();
    }, [])

    return (
        <Fragment>
            <ModalCreateGroup 
                show={showCreateGroupModal} 
                onHide={() => setShowCreateGroupModal(false)}
                onCreate={createGroup} 
            /> 
            <ModalModifyGroup
                show={showModifyGroupModal}
                onHide={() => setShowModifyGroupModal(false)}
                onSubmit={modifyGroup}
                groupID={active}
                groupValue={getGroup(active)["Name"]}
            />
            <ModalDeleteGroup 
                show={showDeleteGroupModal}
                onHide={() => setShowDeleteGroupModal(false)}
                onSubmit={deleteGroup}
                groupID={active}
                groupValue={getGroup(active)["Name"]}
            />
            <ModalCreateTask 
                show={showCreateTaskModal} 
                onHide={() => setShowCreateTaskModal(false)}
            />
            <Container fluid>
                <Row>
                    <Col className="col-3 shadow min-vh-100 p-3">
                        <Sidebar 
                            groups={groups} 
                            active={active} 
                            onSelect={(newActive) => setActive(newActive)} 
                            onCreate={() => setShowCreateGroupModal(true)}
                            onModify={() => setShowModifyGroupModal(true)}
                            onDelete={() => setShowDeleteGroupModal(true)}
                        />

                    </Col>
                    <Col className="col-9 p-3">
                        {showAlert ? <Alert 
                            variant="danger"
                            onClose={() => setShowAlert(false)} 
                            dismissible
                            >{alertMessage}
                            </Alert> 
                            : <Fragment/>
                        }
                        {active ? 
                            <TaskView 
                                group={getGroup(active)} 
                                tasks={[]} 
                                onCreate={() => showCreateTaskModal(true)}/> 
                            : <Fragment /> 
                        }
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Home