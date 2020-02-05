export interface ProductModel {
 _id: string
 name: string
 description: string
 image: string
 price: number
 weight: number
 ingredients: Array<String>
 likes: Array<String>
 reviews: Array<Object>
}