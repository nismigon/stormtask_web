import axios from 'axios';
import React, { Fragment } from 'react';
import { FloatingLabel, Form, Button, Container, Alert } from 'react-bootstrap'
import configuration from './../../configuration.json'

class Authentication extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            email : "",
            password : "",
            showError : false,
            errorMessage : ""
        }
    }
    
    handlerSubmit = (event) => {
        event.preventDefault()
        axios.post(configuration.BACKEND_URL + '/authenticate', {
            email : this.state.email,
            password : this.state.password
        }, {withCredentials: true}).then((response) => {
            this.props.history.push("/home")
        }).catch(()=> {
            this.setState({
                showError : true,
                errorMessage : "Failed to authenticate " + this.state.email
            })
        })
    }

    updateEmail = (event) => {
        this.setState({
            email : event.target.value
        })
    }

    updatePassword = (event) => {
        this.setState({
            password : event.target.value
        })
    }

    // Update the state of the alert message box
    showError = (show) => {
        this.setState({
            showError : show
        })
    }

    render() {
        return (
        <Container className="min-vh-100 min-vw-100 d-flex align-items-center justify-content-center">
            <div className="shadow rounded p-5">
                <h2>StormTask Login Page</h2>
                <hr />
                {this.state.showError ? <Fragment>
                    <Alert variant="danger" onClose={() => this.showError(false)} dismissible>{this.state.errorMessage}</Alert>
                </Fragment> : <Fragment/>}
                <Form className="d-flex flex-column justify-content-center" onSubmit={this.handlerSubmit}>
                    <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
                        <Form.Control type="email" placeholder="email" onChange={this.updateEmail}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                        <Form.Control type="password" placeholder="password" onChange={this.updatePassword}/>
                    </FloatingLabel>
                    <Button type="submit" variant="outline-primary">Submit</Button>
                </Form>
            </div>
        </Container>
        )
    }
}

export default Authentication;