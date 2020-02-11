import { Action } from '@ngrx/store';
import { CartProductModel } from 'src/app/components/cart/models/CartProductModel';

export const ADD_TO_CART = '[CART] ADD'

export class AddToCart implements Action {
    readonly type: string = ADD_TO_CART

    constructor(public payload: CartProductModel) {}
}