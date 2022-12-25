import React, {useEffect, useState, useRef} from 'react';
import {useParams} from "react-router-dom";
import {Container, Row, Col} from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import {motion} from "framer-motion";
import {useDispatch} from "react-redux";
import {cartActions} from "../redux/slices/cartSlice";
import '../styles/productDetails.css'
import {toast} from "react-toastify";
import ProductsList from "../components/UI/ProductsList";
import {db} from '../firebase.config'
import {doc, getDoc} from "firebase/firestore";
import useGetData from "../custom_hooks/useGetData";

function ProductDetails() {
    const [product, setProduct] = useState({})
    const dispatch = useDispatch()
    const {id} = useParams()

    const {data: products} = useGetData('products')

    const docRef = doc(db, 'products', id)

    useEffect(() => {
        const getProduct = async () => {
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setProduct(docSnap.data())
            } else {
                toast.error('No product')
            }
        }
        getProduct()
    }, [])

    const {
        title,
        imgURL,
        price,
        shortDesc,
        desc,
        category
    } = product

    const relatedProducts = products.filter(item => item.category === category)

    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                id,
                title,
                price,
                imgURL
            })
        )
        toast.success("Added to successfully!")
    }

    useEffect(() => {
        window.scroll(0, 0)
    }, [product])

    return (
        <Helmet title={`Product-${id}`}>
            <CommonSection title={title}/>
            <section>
                <Container>
                    <Row>
                        <Col lg={6}>
                            <img src={imgURL} alt=""/>
                        </Col>
                        <Col lg={6}>
                            <div className="product__details">
                                <h2>{title}</h2>
                                <div className="product__rating d-flex align-items-center gap-5 mb-4">
                                    <div>
                                        <span>
                                            <i className="ri-star-s-fill"></i>
                                        </span>
                                        <span>
                                            <i className="ri-star-s-fill"></i>
                                        </span>
                                        <span>
                                            <i className="ri-star-s-fill"></i>
                                        </span>
                                        <span>
                                            <i className="ri-star-s-fill"></i>
                                        </span>
                                        <span>
                                            <i className="ri-star-half-s-fill"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-5">
                                    <span className="product__price fs-4">{price}$</span>
                                    <span>Category: {category}</span>
                                </div>
                                <p className="mt-3">{shortDesc}</p>
                                <motion.button onClick={addToCart} whileTap={{scale: 1.1}}
                                               className="buy__btn btn btn-primary mt-2">
                                    Add To Cart
                                </motion.button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="tab__wrapper d-flex align-items-center gap-5">
                                <h6
                                    className='active__tab'
                                >
                                    Description
                                </h6>
                            </div>
                            <div className="tab__content mt-4">
                                <p>{desc}</p>
                            </div>
                        </Col>

                        <Col lg={12}>
                            <h2 className="mt-5 fs-6">You might also like</h2>
                        </Col>
                        <ProductsList data={relatedProducts} />
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
}

export default ProductDetails;
