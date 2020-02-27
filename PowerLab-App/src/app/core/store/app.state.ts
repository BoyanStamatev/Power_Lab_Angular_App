import { AuthenticationState } from './authentication/authentication.state';
import { ProductsState } from './products/products.state';
import { CartState } from './cart/cart.state';
import { HttpState } from './http/http.state';
import { OrdersState } from './orders/orders.state';
import { ReviewsState } from './reviews/reviews.state';


export interface AppState {
    authentication: AuthenticationState,
    products: ProductsState,
    reviews: ReviewsState,
    cart: CartState,
    http: HttpState,
    orders: OrdersState
}