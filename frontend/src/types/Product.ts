import { Category } from "./Category";

export interface Product {
    category: Category,
    createdAt: string,
    description: string,
    images: [string],
    price: string,
    stock: string,
    title: string,
    updatedAt: string,
    __v: number,
    _id: string
}