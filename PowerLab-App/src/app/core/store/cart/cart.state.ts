import { CartProductModel } from 'src/app/components/cart/models/CartProductModel';

export interface CartState {
    readonly products: CartProductModel[]
}