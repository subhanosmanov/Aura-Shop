import { Suspense } from 'react';
import CommentContent from './commentContent';
import { Product } from '@/types/Product';
import { User } from '@/types/User';
import CommentsSkeleton from './commentsSkeleton';

interface CommentsPropsType {
    product: Product,
    user: User
}

export default async function Comments({ product, user }: CommentsPropsType) {

    return (
        <Suspense fallback={<CommentsSkeleton /> }>
            <CommentContent product={product} user={user} />
        </Suspense>

    )
}
