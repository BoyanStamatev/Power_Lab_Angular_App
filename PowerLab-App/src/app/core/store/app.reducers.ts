import { authenticationReducer } from './authentication/authentication.reducers';
import { productsReducer } from './products/products.reducers';
import { cartReducer } from './cart/cart.reducers';
import { httpReducer } from './http/http.reducers';
import { ordersReducers } from './orders/orders.reducers';


export const appReducers = {
    authentication: authenticationReducer,
    products: productsReducer,
    cart: cartReducer,
    http: httpReducer,
    orders: ordersReducers
}