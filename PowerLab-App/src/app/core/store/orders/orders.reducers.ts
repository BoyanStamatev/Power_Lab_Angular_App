import { OrdersState } from "./orders.state";
import { OrderModel } from './models/OrderModel';
import { GET_USER_ORDERS, SUBMIT_ORDER } from './order.actions';


const initialState: OrdersState = {
    userOrders: []
}

function getUserOrders(state: OrdersState, orders: OrderModel[]) {
    return Object.assign({}, state, { userOrders: orders })
}

function SubmitOrder(state: OrdersState, order: OrderModel) {
    return Object.assign({}, state, { userOrders: [...state.userOrders, order] })
}

export function ordersReducers(state: OrdersState = initialState, action) {
    switch (action.type) {
        case GET_USER_ORDERS:
            return getUserOrders(state, action.payload)
        case SUBMIT_ORDER:
            return SubmitOrder(state, action.payload)
        default:
            return state
    }
}