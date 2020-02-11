import { ProductsState } from "./products.state";
import { GET_ALL, ADD_REVIEW } from './products.action';
import { ProductModel } from 'src/app/components/products/models/ProductModel';


const initialState: ProductsState = {
    all: []
}

function getAllProducts(state: ProductsState, products: ProductModel[]) {
    return Object.assign({}, state, { all: dataReassign(state.all, products) })
}

function dataReassign(oldData, newData) {
    let newDataById = {}
    for(let entry of newData) {
        newDataById[entry._id] = entry
    }

    let result = []
    for(let entry of oldData) {
        if (newDataById[entry._id]) {
            result.push(newDataById[entry._id])
            delete newDataById[entry._id]
        } else {
            result.push(entry)
        }
    }

    return result
}

export function ProductsReducer(state: ProductsState = initialState, action) {

    switch (action.type) {
        case GET_ALL:
            return getAllProducts(state, action.payload)
        case ADD_REVIEW:
            return getAllProducts(state, [action.payload])
        default:
            return state
    }
}

