import { ProductsState } from "./products.state";
import { GET_ALL } from './products.action';
import { ProductModel } from 'src/app/components/products/models/ProductModel';


const initialState: ProductsState = {
    all: []
}

function getAllProducts(state: ProductsState, products: ProductModel[]) {
    return Object.assign( {}, state, { all: products } )
}

export function ProductsReducer(state: ProductsState = initialState, action) {

    switch(action.type) {
        case GET_ALL:
            return getAllProducts(state, action.payload)
        default:
            return state
    }
}