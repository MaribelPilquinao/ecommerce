import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Cart = ({ show, handleClose }) => {

    const cart = useSelector(state => state.cart)

    console.log(cart)

    return (

        <Offcanvas show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
                <ul className="cart-products-list">
                    {
                        cart?.map(product => (
                            <li
                                key={product.id}
                            >
                                <div className="product-info">
                                    <div className="details">
                                        <span className="brand" >{product.brand}</span>
                                        <p>{product.title}</p>
                                        <div className="quantity">{product.productsInCart.quantity}</div>
                                    </div>
                                </div>
                                <div className="total">
                                    <span className="label">Total: </span>
                                    <b>$ {product.price * product.productsInCart.quantity}</b>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className="checkout-section">
                    <div className="total">
                        <span className="label" >Total:</span>
                        <b>$ 0</b>
                    </div>
                    <button

                        className="buy-button" >
                        Checkout
                    </button>
                </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
            </Offcanvas.Body>
        </Offcanvas>

    );
};

export default Cart;