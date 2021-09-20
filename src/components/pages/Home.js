import React, { Fragment } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Sidebar from '../view/Sidebar';
import TaskView from '../view/TaskView';
import Cookies from 'js-cookie';
import axios from 'axios';
import configuration from '../../configuration.json'
import ModalCreateGroup from '../modal/ModalCreateGroup';
import ModalCreateTask from '../modal/ModalCreateTask';

class Home extends React.Component {
    constructor(props) {
        super(props);
        const jwt_token = Cookies.get("JWT_token")
        if (jwt_token === undefined) {
            this.props.history.push("/")
        }
        this.state = {
            groups : [],
            active : "",
            showCreateGroupModal : false,
            showCreateTaskModal : false,
            showAlert : false,
            alertMessage : ""
        }
    }

    componentDidMount() {
        this.getBackendData();
    }

    getBackendData = () => {
        axios.get(configuration.BACKEND_URL + "/group", {withCredentials: true}).then((response) => {
            const groups = response.data
            this.setState({
                groups : groups
            })
        })
    }

    changeActive = (newActive) => {
        this.setState({
            active : newActive
        })
    }

    showCreateGroupModal = () => {
        this.setState({
            showCreateGroupModal : true
        })
    }

    hideCreateGroupModal = () => {
        this.setState({
            showCreateGroupModal : false
        })
    }

    showCreateTaskModal = () => {
        this.setState({
            showCreateTaskModal : true
        })
    }

    hideCreateTaskModal = () => {
        this.setState({
            showCreateTaskModal : false
        })
    }

    createGroup = (group) => {
        axios.post(configuration.BACKEND_URL + '/group', {
            name : group
        }, {withCredentials: true}).then(() => {
            this.setState({
                showCreateGroupModal : false
            })
            this.getBackendData()
        }).catch(() => {
            this.setState({
                showCreateGroupModal : false,
                showAlert : true,
                alertMessage : "Failed to add " + group
            })
        })
    }

    setShowAlert = (show) => {
        this.setState({
            showAlert : show
        })
    }

    getGroup = (groupID) => {
        for (const element of this.state.groups) {
            if (element.ID === parseInt(groupID, 10)) {
                return element
            } 
          }
        return {}
    }

    render() {
        return (
            <Fragment>
                {this.state.showCreateGroupModal ? 
                    <ModalCreateGroup 
                        show={this.state.showCreateGroupModal} 
                        onHide={this.hideCreateGroupModal}
                        onCreate={this.createGroup} /> 
                    : <Fragment/> 
                }
                {this.state.showCreateTaskModal ? 
                    <ModalCreateTask 
                        show={this.state.showCreateTaskModal} 
                        onHide={this.hideCreateTaskModal}
                         /> 
                    : <Fragment/> 
                }
                <Container fluid>
                    <Row>
                        <Col className="col-3 shadow min-vh-100 p-3">
                            <Sidebar groups={this.state.groups} active={this.state.active} onSelect={this.changeActive} onCreate={this.showCreateGroupModal}/>
                        </Col>
                        <Col className="col-9 p-3">
                            {this.state.showAlert ? <Alert 
                                variant="danger"
                                onClose={() => this.setShowAlert(false)} 
                                dismissible
                                >{this.state.alertMessage}
                                </Alert> : <Fragment/>}
                            {this.state.active ? <TaskView group={this.getGroup(this.state.active)} tasks={[]} onCreate={this.showCreateTaskModal}/> : <Fragment /> }
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default Home