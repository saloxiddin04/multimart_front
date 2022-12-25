import React, {useState} from 'react';
import Helmet from "../components/Helmet/Helmet";
import {Container, Row, Col, Form, FormGroup, Input} from "reactstrap";
import {Link, useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {setDoc, doc} from 'firebase/firestore'
import {auth, storage, db} from "../firebase.config";
import {toast} from "react-toastify";
import InputMask from "react-input-mask";

function Register() {

    const [form, setForm] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: ""
    })

    const {username, email, phoneNumber, password} = form

    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const credentialUser = await createUserWithEmailAndPassword(auth, email, password)
            const {user} = credentialUser

            const storageRef = ref(storage, `images/${Date.now() + username}`)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on("state_changed", (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setProgress(progress)
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused")
                            break;
                        case "running":
                            console.log("Upload is running")
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    toast.error(error.message)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
                        await updateProfile(user, {
                            displayName: username,
                            photoURL: downloadUrl
                        });
                        await setDoc(doc(db, 'users', user.uid), {
                            uid: user.uid,
                            displayName: username,
                            email,
                            phoneNumber,
                            photoURL: downloadUrl
                        })
                    })
                })
            setLoading(false)
            toast.success("Account Created")
            navigate("/login")
        } catch (e) {
            toast.error("something error")
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setForm((value) => ({...value, [e.target.name]: e.target.value}))
    }

    return (
        <Helmet title="Signup">
            <section>
                <Container>
                    <Row>
                        {loading
                            ?
                            <Col lg={12} className="text-center"><h6 className="fs-4 fw-bold">Loading...</h6></Col>
                            :
                            <Col lg={6} className="m-auto text-center">
                                <h3 className="fw-bold fs-4 mb-4">Create account</h3>
                                <Form onSubmit={handleSubmit} className="auth__form">
                                    <FormGroup className="form__group">
                                        <input
                                            type="text"
                                            placeholder="Enter your username"
                                            value={username}
                                            onChange={handleChange}
                                            name="username"
                                        />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={handleChange}
                                            name="email"
                                        />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <InputMask
                                            type="tel"
                                            mask="(99)-999-99-99"
                                            placeholder="Enter your phone number"
                                            value={phoneNumber}
                                            onChange={handleChange}
                                            name="phoneNumber"
                                        />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={handleChange}
                                            name="password"
                                        />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <input
                                            type="file"
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                    </FormGroup>
                                    <button type="submit" className="btn btn-primary">
                                        Create Account
                                    </button>
                                    <p className="mt-4">Already have an account? <Link to="/login">Login</Link></p>
                                </Form>
                            </Col>
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
}

export default Register;
