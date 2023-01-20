import React, {useState, useEffect} from 'react';
import Helmet from "../components/Helmet/Helmet";
import {Container, Row, Col} from "reactstrap";
import {Link} from "react-router-dom";
import heroImg from '../assets/images/hero-img.png'
import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";
import Clock from "../components/UI/Clock";
import counterImg from '../assets/images/counter-timer-img.png'
import '../styles/home.css'
import useGetData from "../custom_hooks/useGetData";

function Home() {

    const {data: products, loading} = useGetData('products')

    const [trendingProducts, setTrendingProducts] = useState([])
    const [bestSalesProducts, setBestSalesProducts] = useState([])
    const [mobileProducts, setMobileProducts] = useState([])
    const [wirelessProducts, setWirelessProducts] = useState([])
    const [popularProducts, setPopularProductsProducts] = useState([])

    const year = new Date().getFullYear()

    useEffect(() => {
        const filteredTrendingProducts = products.filter(
            (item) => item.category === "chair"
        )
        const filteredBestProducts = products.filter(
            (item) => item.category === "sofa"
        )
        const filteredMobileProducts = products.filter(
            (item) => item.category === "mobile"
        )
        const filteredWirelessProducts = products.filter(
            (item) => item.category === "wireless"
        )
        const filteredPopularProducts = products.filter(
            (item) => item.category === "watch"
        )

        setTrendingProducts(filteredTrendingProducts)
        setBestSalesProducts(filteredBestProducts)
        setMobileProducts(filteredMobileProducts)
        setWirelessProducts(filteredWirelessProducts)
        setPopularProductsProducts(filteredPopularProducts)

        window.scroll(0,0)
    }, [products])

    return (
        <Helmet title={"Home"}>
            <section className="hero__section" style={{background: "#d6e5fb"}}>
                <Container>
                    <Row className="align-items-center">
                        <Col lg="6" md="6">
                            <div className="hero__content">
                                <p className="hero__subtitle">Trending product in {year}</p>
                                <h2>Make your Interior</h2>
                                <p className="text-dark">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores enim et ipsam
                                    mollitia, nam quos ratione sequi similique voluptas voluptatem. Deleniti dolor illum
                                    iure mollitia nihil nulla officia quos sint?
                                </p>
                                <button className="buy__btn btn btn-dark mt-2">
                                    <Link to="/shop">SHOP NOW</Link>
                                </button>
                            </div>
                        </Col>
                        <Col lg={6} md={6}>
                            <div className="hero__img">
                                <img src={heroImg} alt="hero Image"/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Services />
            <section className="trending__products">
                <Container>
                    <Row>
                        <Col lg={12} className="text-center">
                            <h2>Trending Products</h2>
                        </Col>
                        <ProductsList data={trendingProducts} loading={loading}/>
                    </Row>
                </Container>
            </section>
            <section className="best__sales">
                <Container>
                    <Row>
                        <Col lg={12} className="text-center">
                            <h2>Best Sales</h2>
                        </Col>
                        <ProductsList data={bestSalesProducts} loading={loading}/>
                    </Row>
                </Container>
            </section>
            <section className="timer__count" style={{height: "300px", background: "#0a1d37"}}>
                <Container>
                    <Row>
                        <Col lg={6} md={12} className="count__down-col">
                            <div className="clock__top-content">
                                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
                            </div>
                            <Clock />
                            <button className="btn btn-light mt-3 store__btn">
                                <Link to="/shop">Visit Store</Link>
                            </button>
                        </Col>

                        <Col lg={6} md={12} className="text-end counter__img">
                            <img
                                style={{
                                    width: "70%",
                                    height: "70%",
                                    objectFit: "contain"
                                }}
                                src={counterImg}
                                alt="counter"
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="new__arrivals">
                <Container>
                    <Row>
                        <Col lg={12} className="text-center mb-5">
                            <h2 className="section__title">New Arrivals</h2>
                        </Col>
                        <ProductsList data={mobileProducts} loading={loading}/>
                        <ProductsList data={wirelessProducts} loading={loading}/>
                    </Row>
                </Container>
            </section>
            <section className="popular__category">
                <Container>
                    <Row>
                        <Col lg={12} className="text-center mb-5">
                            <h2 className="section__title">Popular in Category</h2>
                        </Col>
                        <ProductsList data={popularProducts} loading={loading}/>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
}

export default Home;
