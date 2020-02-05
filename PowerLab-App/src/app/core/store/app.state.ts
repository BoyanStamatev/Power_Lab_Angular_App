import { AuthenticationState } from './authentication/authentication.state';


export interface AppState {
    authentication: AuthenticationState,
    // products: ProductsState
}