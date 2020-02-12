import { OrderModel } from './models/OrderModel'

export const GET_USER_ORDERS = '[ORDERS] GET_USER_ORDERS'

export class GetUserOrders {
    readonly type: string = GET_USER_ORDERS

    constructor(public payload: OrderModel[]) {}
}