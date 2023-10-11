import { Form, Button } from "react-bootstrap"
import './login.css'
export default function Index() {
    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form action="../../index3.html" method="post">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Login" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>                        
                    </div>
                </div>
            </div>
        </div>

    )
}