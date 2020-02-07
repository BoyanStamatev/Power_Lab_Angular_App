import { AuthenticationReducer } from './authentication/authentication.reducers';
import { ProductsReducer } from './products/products.reducers';


export const appReducers = {
    authentication: AuthenticationReducer,
    products: ProductsReducer
}