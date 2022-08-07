import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';


const Purchases = () => {

    const dispatch = useDispatch();
    const purchases = useSelector(state  => state.purchases); 

    console.log(purchases)

    useEffect(()=>{
        dispatch(getPurchasesThunk())
    }, [])

    return (
        <div>
            <h1>Purchases</h1>
            <ul>
                {purchases.map((purchasesItem, index ) => (
                    <div className='mt-5'>
                        <h3>Purchases #{index+1}</h3>
                        {purchasesItem.cart.products.map(product => (
                        <li>{product.title}</li>))}
                    </div>               
                ))}
            </ul>
            
        </div>
    );
};

export default Purchases;