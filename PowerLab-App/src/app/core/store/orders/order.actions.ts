import { OrderModel } from './models/OrderModel'

export const GET_USER_ORDERS = '[ORDERS] GET_USER_ORDERS'
export const SUBMIT_ORDER = '[ORDERS] SUBMIT_ORDER' 
export const DEAUTHENTICATE = '[ORDERS] DEAUTHENTICATE'

export class GetUserOrders {
    readonly type: string = GET_USER_ORDERS

    constructor(public payload: OrderModel[]) {}
}

export class SubmitOrder {
    readonly type: string = SUBMIT_ORDER

    constructor(public payload: OrderModel) {}
}

export class deauthenticate {
    readonly type: string = DEAUTHENTICATE
}