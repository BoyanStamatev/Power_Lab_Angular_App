import { OrderProductModel } from './OrderProductModel';

export interface OrderModel {
    _id: string
    creator: string
    creatorEmail: string
    products: OrderProductModel[]
    date: Date
    status: string
}