import { ProductModel } from 'src/app/core/store/products/models/ProductModel';

export interface ProductsState {
    readonly all: ProductModel[]
}