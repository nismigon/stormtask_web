import './Authentication.css'

function Authentication() {
    return (
        <div className="container">
            <div className="auth-div">
                <h2>StormTask Login</h2>
                <hr />  
                <form>
                    <div class="form-group">
                        <label for="emailInput">Email address</label>
                        <input type="email" class="form-control" id="emailInput" placeholder="Enter email" />
                    </div>
                    <div class="form-group">
                        <label for="passwordInput">Password</label>
                        <input type="password" class="form-control" id="passwordInput" placeholder="Password" />
                    </div>
                    <div class="centered">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>    
                </form>
            </div>
        </div>
    )
}

export default Authentication;