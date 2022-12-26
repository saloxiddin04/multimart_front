import React, {useEffect} from 'react';
import '../styles/cart.css'
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import {Container, Row, Col} from "reactstrap";
import {cartActions} from "../redux/slices/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

function Cart() {

    const {cartItems, totalAmount, totalQuantity} = useSelector((state) => state.cart)

    useEffect(() => {
        window.scroll(0,0)
    }, [cartItems])

    return (
        <Helmet title="Cart">
            <CommonSection title="Shopping Cart"/>
            <section>
                <Container>
                    <Row>
                        <Col lg={9}>
                            {cartItems === null || cartItems.length === 0 ? (
                                <h2 className="fs-4 text-center">No item added to the cart</h2>
                            ) : (
                                <table className="table table-bordered w-100">
                                    <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cartItems?.map((item) => (
                                        <Tr item={item} key={item.id}/>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </Col>
                        <Col lg={3}>
                            <div>
                                <h6 className="d-flex justify-content-between align-items-center">
                                    Subtotal
                                    <span className="fs-4 fw-bold">{totalAmount}$</span>
                                </h6>
                                <h6 className="d-flex justify-content-between align-items-center mt-2">
                                    Total items
                                    <span className="fs-4 fw-bold">{totalQuantity}</span>
                                </h6>
                            </div>
                            <div className="d-flex flex-column gap-4 mt-4">
                                <Link
                                    className="buy__btn btn btn-primary"
                                    to="/shop"
                                >
                                    Continue Shopping
                                </Link>
                                <Link
                                    disabled={cartItems === null || cartItems.length === 0 ? true : false}
                                    className={`buy__btn btn btn-primary ${cartItems === null || cartItems.length === 0 ? 'disabled' : ""}`}
                                    to="/checkout"
                                >
                                    Checkout
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
}

const Tr = ({item}) => {
    const dispatch = useDispatch()
    const deleteProduct = () => {
        dispatch(cartActions.deleteItem({
            id: item.id
        }))
        toast.success("Deleted successfully")
    }
    const incItem = () => {
        dispatch(
            cartActions.addItem({
                id: item.id,
                title: item.title,
                price: item.price,
                imgURL: item.imgURL
            })
        )
        toast.success("Product added to cart successfully!")
    }

    const decItem = () => {
        dispatch(
            cartActions.removeItem({
                id: item.id
            })
        )
        toast.success("Deleted successfully")
    }

    return (
        <tr key={item.id}>
            <td><img src={item.imgURl} alt=""/></td>
            <td>{item.title}</td>
            <td>{item.price}$</td>
            <td className="d-flex gap-2 justify-content-center align-items-center">
                <span className="p-1 border" style={{cursor: "pointer"}} onClick={incItem}>+</span>
                {item.quantity}
                <span className="p-1 border" style={{cursor: "pointer"}} onClick={decItem}>-</span>
            </td>
            <td><i onClick={deleteProduct} className="ri-delete-bin-line"></i></td>
        </tr>
    )
}

export default Cart;
