import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { Card, ListGroup } from 'react-bootstrap';

const ProductsDetail = () => {

    const products = useSelector(state => state.products)
    const [productDetail, setProductDetail] = useState({})
    const [suggestedProducts, setSuggestedProduct] = useState([])

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

    return (
        // en general modificar estilos, están horribles
        <div>
            <h1>Product Detail</h1>
            <Card style={{ width: '18rem', border: 'dark' }}>
                <Card.Img variant="top" src={productDetail?.productImgs} />
                <Card.Body>
                    <Card.Title>{productDetail?.title}</Card.Title>
                    <Card.Text>Description:
                        {productDetail.description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Price: {productDetail?.price}</ListGroup.Item>
                </ListGroup>
            </Card>
            {/* productos sugeridos, modificar estilos */}
            <ul>
            {suggestedProducts.map(product =>(
                <li onClick={()=> navigate(`/products/${product.id}`)}>
                    {product.title}
                </li>
            ) )}
            </ul>
        </div>
    );
};

export default ProductsDetail;