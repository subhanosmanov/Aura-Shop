import MyBasketContent from "@/components/myBasket/myBasketContent";
import { Suspense } from 'react';
import MyBasketLoading from "./myBasketLoading";

export default function MyBasket() {
    return (
        <Suspense fallback={<MyBasketLoading />}>
            <MyBasketContent />
        </Suspense>
    )
};