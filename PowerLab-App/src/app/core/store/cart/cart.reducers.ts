import { ADD_TO_CART } from './cart.actions'
import { CartProductModel } from "src/app/components/cart/models/CartProductModel";
import { CartState } from './cart.state';

const initialState: CartState = {
    products: []
}

function addToCart(state: CartState, product: CartProductModel) {
    if (state.products.find(p => p.productId === product.productId)) {
        let newProducts = state.products.slice()
        let cartProduct = newProducts.find(p => p.productId === product.productId)
        cartProduct.quantity += 1

        return Object.assign({}, state, { products: newProducts })
    }

    return Object.assign({}, state, {
        products: [...state.products, product]
    })
}

export function cartReducer(state: CartState = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return addToCart(state, action.payload)
        default:
            return state
    }
}