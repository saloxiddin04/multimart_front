import React, {useRef, useEffect} from 'react';
import './header.css'
import {Container, Row} from "reactstrap";
import {motion} from "framer-motion";
import logo from '../../assets/images/eco-logo.png'
import user_logo from '../../assets/images/user-icon.png'
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import useAuth from "../../custom_hooks/useAuth";
import {signOut} from 'firebase/auth'
import {auth} from "../../firebase.config";
import {toast} from "react-toastify";

const nav_links = [
    {
        path: "home",
        display: "Home"
    },
    {
        path: "shop",
        display: "Shop"
    },
    {
        path: "cart",
        display: "Cart"
    },
]

function Header() {
    const headerRef = useRef(null)
    const menuRef = useRef(null)
    const profileActionRef = useRef(null)
    const navigate = useNavigate()
    const {cartItems} = useSelector((state) => state.cart)

    const {currentUser} = useAuth()
    const stickyHeaderFunc = () => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add("sticky__header")
            } else {
                headerRef.current.classList.remove("sticky__header")
            }
        })
    }

    const logout = () => {
        signOut(auth).then(() => {
            toast.success("Logged Out")
            navigate("/home")
            localStorage.removeItem("user")
            localStorage.removeItem("token")
        }).catch(err => toast.error(err.message))
    }

    useEffect(() => {
        stickyHeaderFunc()
        return () => window.removeEventListener("scroll", stickyHeaderFunc)
    })

    const menuToggle = () => menuRef.current.classList.toggle('active__menu')
    const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions')

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <Row>
                    <div className="nav__wrapper">
                        <div className="logo">
                            <img src={logo} alt="logo"/>
                            <div>
                                <h1>Multimart</h1>
                            </div>
                        </div>
                        <div className="navigation" ref={menuRef} onClick={menuToggle}>
                            <ul className="menu">
                                {nav_links.map(item => (
                                    <li className="nav__item" key={item.path}>
                                        <NavLink
                                            to={item.path}
                                            className={(navClass) => navClass.isActive ? "nav__active" : ""}
                                        >
                                            {item.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="nav__icons">
                            <span className="cart__icon" onClick={() => navigate("/cart")}>
                                <i className="ri-shopping-bag-line"></i>
                                <span className="badge">{cartItems.length}</span>
                            </span>
                            <div className="profile">
                                <motion.img
                                    whileTap={{scale: 1.2}}
                                    src={currentUser ? currentUser.photoURL : user_logo}
                                    alt={currentUser?.displayName}
                                    onClick={toggleProfileActions}
                                />
                                <div className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions}>
                                    {currentUser
                                        ?
                                        <span onClick={logout}>Logout</span>
                                        :
                                        <div className="d-flex align-items-center justify-content-center flex-column">
                                            <Link to="/register">Signup</Link>
                                            <Link to="/login">Login</Link>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="mobile__menu">
                                <span onClick={menuToggle}>
                                    <i className="ri-menu-line"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    );
}

export default Header;
