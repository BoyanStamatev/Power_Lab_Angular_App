import { Action } from '@ngrx/store'
import { ProductModel } from 'src/app/components/products/ProductModul'

export const GET_ALL = '[PRODUCTS] GET_ALL'

export class GetAllProducts implements Action {
    readonly type: string = GET_ALL

    constructor(public payload: ProductModel[]) {}
    
}