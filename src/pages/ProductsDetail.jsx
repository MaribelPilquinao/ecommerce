import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { Card, Row, Col } from 'react-bootstrap';
import '../styles/stylesProductDetail.css';
import { addCartThunk, getCartThunk } from '../store/slices/cart.slice';

const ProductsDetail = () => {
    const products = useSelector((state) => state.products);
    const [productDetail, setProductDetail] = useState({});
    const [suggestedProducts, setSuggestedProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(getCartThunk());
    }, []);

    useEffect(() => {
        const product = products.find(
            (productShop) => productShop.id === Number(id)
        );
        setProductDetail(product);
        // console.log(product)

        const filteredProducts = products.filter(
            (productShop) => productShop.category.id === product.category.id
        );
        setSuggestedProduct(filteredProducts);
    }, [products, id]);

    const addToCart = (id, quantity) => {
        dispatch(addCartThunk(id, quantity));
    };

    // sumar productos
    const add = () => {
        if (quantity > 0 && quantity < 5) {
            setQuantity(quantity + 1);
        }
    };

    // quitar del carrito
    const subtract = () => {
        if (quantity > 1 && quantity <= 5) {
            setQuantity(quantity - 1);
        }
    };
    // efecto de imagen
    const showImage = (event) => {
        event.target.childNodes[1]?.classList.add('hover');
    };

    const hiddeImage = (event) => {
        event.target.childNodes[1]?.classList?.remove('hover');
    };
    // fin efecto de imagen

    return (
        <section>
            <div className='title'>
                <h4>Home</h4>
                <div className='circle'></div>
            </div>
            <article className='container__product-detail'>
                <section className='products__images'>
                    <img
                        src={productDetail?.productImgs}
                        alt=''
                    />
                </section>
                <section className='products__description'>
                    <h4>{productDetail?.title}</h4> <hr />
                    <h4 className='title__product-detail__pAbsolute'>
                        {productDetail?.title}
                    </h4>
                    <div className='products__description-text'>
                        <p>
                            Description:
                            {productDetail?.description}
                        </p>
                        <p>Price: {productDetail?.price}</p>
                    </div>
                    <div className='quantity'>
                        <span className='label'>Quantity</span>
                        <div className='flex'>
                            <button onClick={() => subtract()}>-</button>
                            <div className='value'>{quantity}</div>
                            <button onClick={() => add()}>+</button>
                        </div>
                    </div>
                    <div className='btn__cart-detail'>
                        <button
                            className='button__cart-detail'
                            onClick={() => addToCart(productDetail.id, 1)}
                        >
                            Agregar al carrito
                        </button>
                    </div>
                </section>
            </article>
            <section className='products-seggested'>
                <Row
                    xs={1}
                    md={2}
                    xl={4}
                    className='g-4'
                >
                    {suggestedProducts?.map((product) => (
                        <Col key={product.id}>
                            <Card
                                onClick={() =>
                                    navigate(`/product/${product.id}`)
                                }
                            >
                                <div className='product-img'>
                                    <div
                                        onMouseEnter={(e) => showImage(e)}
                                        onMouseLeave={(e) => hiddeImage(e)}
                                        className='image-wrapp'
                                    >
                                        <img
                                            src={product.productImgs[0]}
                                            alt=''
                                        />
                                        <img
                                            src={product.productImgs[1]}
                                            alt=''
                                        />
                                    </div>
                                </div>
                                <Card.Body className='product-description'>
                                    <Card.Title>{product.title}</Card.Title>
                                    <p>
                                        <b>Price</b>
                                    </p>
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
