import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Form, FormGroup, Input} from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import '../styles/checkout.css'
import {useSelector, useDispatch} from "react-redux";
import {Link, useNavigate} from 'react-router-dom'
import {toast} from "react-toastify";
import InputMask from 'react-input-mask';
import {cartActions} from "../redux/slices/cartSlice";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase.config";

function Checkout() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {totalQuantity, totalAmount, cartItems} = useSelector((state) => state.cart)
    const {user} = useSelector((state) => state.user)

    const docRef = doc(db, 'users', user.uid)

    const [form, setForm] = useState({
        displayName: "",
        phoneNumber: ""
    })

    const chat_id = 1393665338
    const bot_token = '5815559591:AAELJVHL7LV9pc-12NzIjyG8vUc4jDNuO2o'

    useEffect(() => {
        const getUser = async () => {
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setForm(docSnap.data())
            } else {
                toast.error('No User')
            }
        }
        getUser()
    }, [user])

    const {displayName, phoneNumber} = form

    const handleSubmit = async () => {
        let price = 0
        let msg = ``

        msg += `Name: ${displayName} %0A`
        msg += `Phone Number: ${phoneNumber} %0A %0A`

        cartItems.map(item => {
            msg += `Product: ${item.title} %0A`
            msg += `Qty: ${item.quantity} %0A`
            msg += `Price: ${Number(item.price)}$ %0A %0A`
            price += Number(item.price)
        })
        msg += `Total Price: ${Number(price)}$`

        const url = `https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${chat_id}&text=${msg}`

        if (form.displayName === "" || form.phoneNumber === undefined) {
            toast.error('All input field required')
            return
        } else {
            await fetch(url)
            navigate('/home')
            dispatch(cartActions.clearCart())
            toast.success('Ordered!')
        }
    }

    const handleChange = e => {
        setForm((value) => ({...value, [e.target.name]: e.target.value}))
    }

    return (
        <Helmet title="Checkout">
            <CommonSection title="Checkout"/>
            <section>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <h6 className="mb-4 fw-bold">Billing Information</h6>
                            <Form className="billing__form">
                                <FormGroup className="form__group">
                                    <Input
                                        name="displayName"
                                        value={displayName}
                                        onChange={handleChange}
                                        type="text"
                                        required
                                        placeholder="Enter your name"
                                    />
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <InputMask
                                        mask="(99)-999-99-99"
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        onChange={handleChange}
                                        type="tel"
                                        required
                                        placeholder="Phone number"
                                    />
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col lg={4}>
                            <div className="checkout__cart">
                                <h6>Total Qty: <span>{totalQuantity} items</span></h6>
                                <h6>Subtotal: <span>{totalAmount}$</span></h6>
                                <h4>Total Cost: <span>{totalAmount}$</span></h4>
                                {user === null ?
                                    <Link
                                        className="buy__btn auth__btn btn btn-light mt-3 w-100"
                                        to="/login"
                                    >
                                        Place an order
                                    </Link>
                                    :
                                    <button
                                        onClick={handleSubmit}
                                        className="buy__btn auth__btn btn btn-light mt-3 w-100"
                                    >
                                        Place an order
                                    </button>
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
}

export default Checkout;
