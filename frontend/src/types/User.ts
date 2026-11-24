import { Product } from "./Product";

export interface User {
    basketList: Product[],
    createdAt: string,
    email: string,
    name: string,
    role: string,
    updatedAt: string,
    wishList: Product[],
    __v: number,
    _id: string,
}