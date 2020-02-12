import { OrderProduct } from './OrderProduct';

export interface OrderModel {
    creatorId: string
    products: OrderProduct[]
    date: Date
    status: string
}