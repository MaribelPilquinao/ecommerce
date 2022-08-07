import "../styles/styles.css"
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProductsThunk, filterProductsThunk, filterCategoryThunk } from '../store/slices/products.slice';
import { useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { Card, ListGroup, Form, InputGroup, Button } from 'react-bootstrap';
import axios from "axios";







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
    console.log(categories)

    return (
        <div>
            <h1>Home</h1>
            <>
                <InputGroup className="mb-3">
                    <Form.Control aria-label="Text"
                        style={{marginLeft: "4rem", marginRight: ".3rem"}}
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                        placeholder="Nombre del producto"
                    />
                    <Button variant="outline-danger"
                            style={{marginRight: "5.5rem"}}
                        onClick={() => dispatch(filterProductsThunk(searchValue))}>
                        Search
                    </Button>
                </InputGroup>
            </>
            <div className='container__card'>
                <div>
                    <ListGroup>
                        <h3>Categorias</h3>
                        {categories.map(category => (
                            <ListGroup.Item key={categories.id}
                                onClick={() => dispatch(filterCategoryThunk(category.id))}
                            >
                                {category.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
                {products?.map(product => (

                    <Card style={{ width: '18rem', display: "flex" }}
                        key={product.id}
                        onClick={() => navigate(`/products/${product.id}`)}>
                        <div className="img-product">
                            <Card.Img src={product.productImgs}
                                className="card-img"
                                variant="top"
                                alt="image product" />
                        </div>
                        <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item><b>Price:</b> {product.price}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Home;