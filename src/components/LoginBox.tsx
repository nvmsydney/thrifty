import { Component } from "react";
import { Container } from "react-bootstrap";

class LoginBox extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <Container className="mt-3 mb-3">
                <form method="post" action="https://www.cmsc508.com/~24SP_jacksonja13/server.php">
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" required />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" required />
                            </div>
                            <button type="submit" className="btn btn-primary">Log in</button>
                        </div>
                    </div>
                </form>
            </Container>
        );
    }
}

export default LoginBox;
