import { OrdersState } from "./orders.state";
import { OrderModel } from './models/OrderModel';
import {
    GET_USER_ORDERS, SUBMIT_ORDER, DEAUTHENTICATE,
    GET_PENDING_ORDERS, APPROVE_ORDER
} from './order.actions';


const initialState: OrdersState = {
    userOrders: [],
    pendingOrders: []
}

function getUserOrders(state: OrdersState, orders: OrderModel[]) {
    return Object.assign({}, state, { userOrders: orders })
}

function getPendingOrders(state: OrdersState, orders: OrderModel[]) {
    return Object.assign({}, state, {
        pendingOrders: orders
    })
}

function submitOrder(state: OrdersState, order: OrderModel) {
    return Object.assign({}, state, { userOrders: [...state.userOrders, order] })
}

function removeOrders(state: OrdersState) {
    return Object.assign({}, state, {
        userOrders: [],
        pendingOrders: []
    })
}

function approveOrder(state: OrdersState, id) {
    return Object.assign({}, state, {
        pendingOrders: state.pendingOrders.filter(o => o._id !== id)
    })
}

export function ordersReducers(state: OrdersState = initialState, action) {
    switch (action.type) {
        case GET_USER_ORDERS:
            return getUserOrders(state, action.payload)
        case GET_PENDING_ORDERS:
            return getPendingOrders(state, action.payload)
        case SUBMIT_ORDER:
            return submitOrder(state, action.payload)
        case APPROVE_ORDER:
            return approveOrder(state, action.id)
        case DEAUTHENTICATE:
            return removeOrders(state)
        default:
            return state
    }
}