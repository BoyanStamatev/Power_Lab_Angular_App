import { CartProductModel } from 'src/app/core/models/CartProductModel';

export interface CartState {
    readonly products: CartProductModel[]
}