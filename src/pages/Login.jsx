import React, {useState} from 'react';
import Helmet from "../components/Helmet/Helmet";
import {Container, Row, Col, Form, FormGroup} from "reactstrap";
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {signUpUser} from "../redux/slices/LoginSlice";

function Login() {

    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await dispatch(signUpUser({email, password}))
            navigate('/home')
        } catch (e) {
            navigate('/login')
            toast.error("Cannot find email or wrong password")
            console.log(e)
        }
        setLoading(false)
    }

    return (
        <Helmet title="Login">
            <section>
                <Container>
                    <Row>
                        <Col lg={6} className="m-auto text-center">
                            <h3 className="fw-bold fs-4 mb-4">Login</h3>
                            {loading ?
                                <Col lg={12} className="text-center"><h5 className="fs-4 fw-600">Loading...</h5></Col>
                                :
                                <Form onSubmit={handleSubmit} className="auth__form">
                                    <FormGroup className="form__group">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </FormGroup>
                                    <button type="submit" className="buy__btn auth__btn btn btn-primary">Login</button>
                                    <p className="mt-4">Don't have an account? <Link to="/register">Create an account</Link></p>
                                </Form>
                            }
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
}

export default Login;
