import { OrderModel } from './models/OrderModel';

export interface OrdersState {
    readonly userOrders: OrderModel[],
    readonly pendingOrders: OrderModel[]
}