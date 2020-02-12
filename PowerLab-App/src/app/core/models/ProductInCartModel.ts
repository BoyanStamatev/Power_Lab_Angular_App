export interface ProductInCartModel {
    _id: string
    name: string
    image: string
    price: number
    quantity: number
    ingredients: Array<String>
}