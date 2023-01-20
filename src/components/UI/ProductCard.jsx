import React, {useState} from 'react';
import {motion} from "framer-motion";
import {Col} from "reactstrap";
import {Link} from "react-router-dom";
import '../../styles/productCard.css'
import {useDispatch} from "react-redux";
import {cartActions} from "../../redux/slices/cartSlice";
import {toast} from "react-toastify";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function ProductCard({item, loading}) {

    const [selectedSize, setSelected] = useState(null)

    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                id: item.id,
                title: item.title,
                price: item.price,
                urls: item.urls,
                sizes: item.sizes[selectedSize]
            })
        )
        toast.success("Product added to cart successfully!")
    }

    const hanClick = (idx) => {
        setSelected(idx)
    }

    return (
        <Col lg={3} md={4} className="mb-2">
            {
                loading
                    ?
                    <>
                        <Skeleton height={250}/>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                    :
                    <Link to={`/shop/${item.id}`} style={{color: "inherit"}}>
                        <motion.div whileHover={{scale: 0.9}} className="product__item border p-2 rounded">
                            <div className="product__img">
                                <img className="w-100 h-100 rounded" src={item.urls[0]}
                                     alt=""/>
                            </div>
                            <div className="p-2 product__info text-center">
                                <h3 className="product__name fs-6">
                                    {item.title}
                                </h3>
                                {/*<div className="d-flex gap-3 justify-content-center sizes">*/}
                                {/*    {item.sizes.map((size, i) => (*/}
                                {/*        <label*/}
                                {/*            key={size.value}*/}
                                {/*        >*/}
                                {/*        <span*/}
                                {/*            className={selectedSize === i ? "p-1 border border-primary rounded active" : "p-1"}*/}
                                {/*            onClick={() => hanClick(i)}*/}
                                {/*        >*/}
                                {/*            {size.label}*/}
                                {/*        </span>*/}
                                {/*        </label>*/}
                                {/*    ))}*/}
                                {/*</div>*/}
                                <span className="fs-6 p-2">{item.category}</span>
                            </div>
                            <div className="product__card-bottom d-flex align-items-center justify-content-center">
                                <span className="price fs-5">${item.price}</span>
                                {/*<motion.button className="btn p-0" disabled={selectedSize === null ? true : false} whileTap={{scale: 1.2}} onClick={addToCart}>*/}
                                {/*    <i className="ri-add-line fs-6 p-1 rounded-circle text-white "*/}
                                {/*       style={{background: "#0a1d37", cursor: "pointer"}}></i>*/}
                                {/*</motion.button>*/}
                            </div>
                        </motion.div>
                    </Link>
            }
        </Col>
    );
}

export default ProductCard;
