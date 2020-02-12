import { AuthenticationReducer } from './authentication/authentication.reducers';
import { ProductsReducer } from './products/products.reducers';
import { cartReducer } from './cart/cart.reducers';


export const appReducers = {
    authentication: AuthenticationReducer,
    products: ProductsReducer,
    cart: cartReducer
}