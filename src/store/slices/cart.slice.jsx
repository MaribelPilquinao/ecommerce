import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from "../../utils/getConfig"
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (_state, action) => {
            const cart = action.payload;
            return cart
        }

    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then((res) => dispatch(res.data))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addCartThunk = cart => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', cart, getConfig())
        // .then((res) => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;


