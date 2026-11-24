import { Product } from "./Product";
import { User } from "./User";

export interface Comment {
    createdAt: string,
    product: Product,
    text: string,
    updatedAt: string,
    user: User,
    __v: number,
    _id: string
} 