import React from 'react';
import {Container, Row, Col} from "reactstrap";
import {motion} from "framer-motion";
import ServiceData from "../assets/data/serviceData";
import '../styles/services.css'

function Services() {
    return (
        <section className="services">
            <Container>
                <Row>
                    {ServiceData.map((item, i) => {
                        return (
                            <Col lg={3} md={4} key={i}>
                                <motion.div
                                    whileHover={{scale: 1.1}}
                                    className="service__item p-2 d-flex align-items-center rounded-1 gap-3"
                                    style={{background: `${item.bg}`, cursor: "pointer"}}
                                >
                                <span>
                                    <i
                                        className={`${item.icon} p-2 bg-dark text-white rounded-circle`}
                                        style={{fontSize: "2.2rem"}}
                                    >
                                    </i>
                                </span>
                                    <div>
                                        <h3 className="fs-5">{item.title}</h3>
                                        <p>{item.subtitle}</p>
                                    </div>
                                </motion.div>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </section>
    );
}

export default Services;
