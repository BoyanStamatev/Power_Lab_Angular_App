import { AuthenticationState } from './authentication/authentication.state';
import { ProductsState } from './products/products.state';
import { CartState } from './cart/cart.state';
import { HttpState } from './http/http.state';


export interface AppState {
    authentication: AuthenticationState,
    products: ProductsState,
    cart: CartState,
    http: HttpState
}