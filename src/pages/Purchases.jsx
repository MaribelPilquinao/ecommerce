import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import '../styles/stylesPurchases.css'


const Purchases = () => {

    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchases);


    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])


    const getTotal = products => {
        let total = 0
        products.forEach(product => {
            total = Number(product.price)
        })
        return total
    }


    return (
        <section>
            <section className='purchases__title'>
            <h2>My purchases</h2>
            </section>
            <article className="purchases__user">
                {purchases.map((purchasesItem, index) => (
                    
                        <div className="purchases__user-product">
                            <section className="purchases__date"> 
                                <h6>Purchases Nº {index + 1}</h6> 
                                <h6 key={purchasesItem.id}>{purchasesItem.createdAt.slice(0, 10)}</h6>
                            </section>
                            {purchasesItem.cart.products.map(product => (
                                <section className="purchases__info">
                                    <h5 key={product.title}>{product.title}</h5>
                                    <p>{product.productsInCart.quantity}</p>
                                    <p><b>{product.price}</b></p>
                                    <div className="purchases__price">
                                        <h5>{product.productsInCart.quantity*product.price}</h5>
                                    </div>
                                </section>
                            ))}
                        </div>
                   ))}

                   <div>${getTotal} </div>

            </article>
        </section>
    );
};

export default Purchases;