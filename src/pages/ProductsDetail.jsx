import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { Card, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import '../styles/stylesProductDetail.css'
import { addCartThunk } from '../store/slices/cart.slice';

const ProductsDetail = () => {

    const products = useSelector(state => state.products)
    const [productDetail, setProductDetail] = useState({})
    const [suggestedProducts, setSuggestedProduct] = useState([])
    const [quantity, setQuantity] = useState("");

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    useEffect(() => {
        const product = products.find(productShop => productShop.id === Number(id));
        setProductDetail(product)
        // console.log(product)

        const filteredProducts = products.filter(productShop =>
            productShop.category.id === product.category.id)
        setSuggestedProduct(filteredProducts);

    }, [products, id])

    const addToCart = () => {
        const toCart = {
            id: productDetail.id,
            quantity
        }
        alert("añadido al carrito")
        dispatch(addCartThunk(toCart));

    }


    return (
        <section >
            <article className='container__product-detail'>
                <section className='products__images'>
                    <img src={productDetail?.productImgs} alt="" />
                </section>
                <section className="products__description">
                    <h4>{productDetail?.title}</h4> <hr />
                    <div className='products__description-text'>
                        <p>Description:
                            {productDetail?.description}
                        </p>
                        <p>Price: {productDetail?.price}</p>
                    </div>
                    <div className="btn__cart-detail">
                        <button className='button__cart-detail'
                        onClick={addToCart}
                        >
                            Agregar al carrito
                        </button>
                    </div>
                </section>
            </article>
            <section className='products-seggested'>
                <Row xs={1} md={2} xl={3} className="g-4">
                    {suggestedProducts?.map(product => (
                        <Col key={product.id}>
                            <Card onClick={() => navigate(`/products/${product.id}`)}>
                                <div className="product-img">
                                    <Card.Img className="image__product-detail" src={product.productImgs} />
                                </div>
                                <Card.Body className="product-description">
                                    <Card.Title >{product.title}</Card.Title>
                                    <p><b>Price:</b></p>
                                    <Card.Text> {product.price}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>
        </section>

    );
};

export default ProductsDetail;
