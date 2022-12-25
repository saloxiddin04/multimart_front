import React from 'react';
import {motion} from "framer-motion";
import {Col} from "reactstrap";
import {Link} from "react-router-dom";
import '../../styles/productCard.css'
import {useDispatch} from "react-redux";
import {cartActions} from "../../redux/slices/cartSlice";
import {toast} from "react-toastify";

function ProductCard({item}) {

    const dispatch = useDispatch()

    const addToCart = () => {
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

    return (
        <Col lg={3} md={4} className="mb-2">
            <div className="product__item">
                <div className="product__img">
                    <motion.img whileHover={{scale: 0.9}} src={item.imgURL} alt=""/>
                </div>
                <div className="p-2 product__info text-center">
                    <h3 className="product__name fs-6">
                        <Link to={`/shop/${item.id}`}>{item.title}</Link>
                    </h3>
                    <span className="fs-6">{item.category}</span>
                </div>
                <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
                    <span className="price fs-5">${item.price}</span>
                    <motion.span whileTap={{scale: 1.2}} onClick={addToCart}>
                        <i className="ri-add-line fs-6 p-1 rounded-circle text-white " style={{background: "#0a1d37", cursor: "pointer"}}></i>
                    </motion.span>
                </div>
            </div>
        </Col>
    );
}

export default ProductCard;
