import React, {useEffect, useState} from 'react';
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import {Container, Row, Col} from "reactstrap";
import ProductsList from "../components/UI/ProductsList";
import "../styles/Shop.css"
import useGetData from "../custom_hooks/useGetData";
import Skeleton from "react-loading-skeleton";

function Shop() {

    const {data: products, loading} = useGetData('products')
    const [productsData, setProductsData] = useState(products)

    const handleFilter = (e) => {
        const filterValue = e?.target?.value
        if (filterValue === 'all') {
            setProductsData(products)
        }
        if (filterValue === undefined) {
            setProductsData(products)
        }
        if (filterValue === "woman_dress") {
            const filteredProducts = products.filter(
                (item) => item.category === "woman_dress"
            )
            setProductsData(filteredProducts)
        }
        if (filterValue === "man_dress") {
            const filteredProducts = products.filter(
                (item) => item.category === "man_dress"
            )
            setProductsData(filteredProducts)
        }
        if (filterValue === "children_dress") {
            const filteredProducts = products.filter(
                (item) => item.category === "children_dress"
            )
            setProductsData(filteredProducts)
        }
        if (filterValue === "women_shoes") {
            const filteredProducts = products.filter(
                (item) => item.category === "women_shoes"
            )
            setProductsData(filteredProducts)
        }
        if (filterValue === "men_shoes") {
            const filteredProducts = products.filter(
                (item) => item.category === "men_shoes"
            )
            setProductsData(filteredProducts)
        }
        if (filterValue === "children_shoes") {
            const filteredProducts = products.filter(
                (item) => item.category === "children_shoes"
            )
            setProductsData(filteredProducts)
        }
    }

    const searchProducts = (e) => {
        const searchValue = e.target.value
        const searched = products.filter(
            (item) => item.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        setProductsData(searched)
    }

    useEffect(() => {
        handleFilter()
        window.scroll(0,0)
    }, [products])

    return (
        <Helmet title="Shop">
            <CommonSection title="Products"/>
            <section>
                <Container>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <div className="filter__widget">
                                <select className="w-100" onChange={handleFilter}>
                                    <option value="all">Все</option>
                                    <option value="woman_dress">Женское одежда</option>
                                    <option value="man_dress">Мужское одежда</option>
                                    <option value="children_dress">Детский одежда</option>
                                    <option value="women_shoes">Женское обув</option>
                                    <option value="men_shoes">Мужское обув</option>
                                    <option value="children_shoes">Детский обув</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg={6} md={12}>
                            <div className="search__box">
                                <input type="text" placeholder="Search..." onChange={searchProducts}/>
                                <span>
                                <i className="ri-search-line"></i>
                            </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="pt-0">
                <Container>
                    <Row>
                        {productsData.length === 0 ?
                            (
                                <h1 className="text-center fs-4">No products are found!</h1>
                            ) : (
                                <ProductsList data={productsData} loading={loading}/>
                            )
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
}

export default Shop;
