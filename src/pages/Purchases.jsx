import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import '../styles/stylesPurchases.css'


const Purchases = () => {

    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchases);

    console.log(purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

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
                                <h6>{purchasesItem.createdAt.slice(0, 10)}</h6>
                            </section>
                            {purchasesItem.cart.products.map(product => (
                                <section className="purchases__info">
                                    <h5>{product.title}</h5>
                                    <p><b>{product.price}</b></p>
                                </section>
                            ))}
                        </div>
                   ))}

            </article>
        </section>
    );
};

export default Purchases;