import "../styles/styles.css"
import '../styles/styleHome.css'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProductsThunk, filterProductsThunk, filterCategoryThunk } from '../store/slices/products.slice';
import { useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { Card, ListGroup, Form, InputGroup, Button } from 'react-bootstrap';
import axios from "axios";
import iconSearch from '../images/iconSearch.png'
import ProductsCart from "../components/ProductsCart";


const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("")
    const [categories, setCategories] = useState([])

    const products = useSelector(state => state.products)


    useEffect(() => {
        dispatch(getProductsThunk());

        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => setCategories(res.data?.data.categories))
    }, [])
    // console.log(categories)

  


    return (
        <div>
            <section className="container__input">
                <InputGroup className="mb-4 mt-5 ">
                    <Form.Control aria-label="Text"
                        style={{ marginLeft: "30rem", marginRight: ".2rem" }}
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                        placeholder="Nombre del producto"
                    />
                    <Button variant="outline-primary"
                        style={{ marginRight: "12.5rem" }}
                        onClick={() => dispatch(filterProductsThunk(searchValue))}>
                        <img src={iconSearch} alt="" />
                    </Button>
                </InputGroup>
            </section>
            <article className="container">
                <section className="container__category">
                    <ListGroup>
                        <span className="category-span">Categorias</span><hr />
                        {categories.map(category => (
                            <ListGroup.Item key={categories.title}
                                onClick={() => dispatch(filterCategoryThunk(category.id))}>
                                {category.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </section>
                <section className="container-card">
                    {/* <Row xs={1} md={2} xl={3} className="g-4">
                        {products?.map(product => (
                            <Col key={product.title}>
                                <Card onClick={() => navigate(`/products/${product.id}`)}>
                                    <div className="product-img">
                                        <Card.Img className="image" src={product.productImgs} />
                                    </div>
                                    <Card.Body className="product-description">
                                        <Card.Title >{product.title}</Card.Title>
                                        <p><b>Price:</b></p>
                                        <Card.Text> {product.price}</Card.Text>
                                    </Card.Body>
                                </Card>
                                <Button variant="outline-danger"
                                    className="btn__cart"
                                    onClick={() => addToCart(product.id, 1)}>
                                    <img className="img__cart" src={shoppingcart} alt="icon shopping cart" />
                                </Button>
                            </Col>
                        ))}
                    </Row> */}
                    <ProductsCart products={products}/>
                </section>
            </article>
        </div>
    );
};

export default Home;