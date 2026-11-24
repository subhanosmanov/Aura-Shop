import { Product } from '@/types/Product';
import CommentForm from './commentForm'
import CommentList from './commentList'
import { GetCommentsByProduct } from '@/services/comment/getCommentsByProduct';
import { User } from '@/types/User';

interface CommentsPropsType {
    product: Product,
    user: User
}

export default async function CommentContent({ product, user }: CommentsPropsType) {
    const comments = await GetCommentsByProduct(product._id);
    console.log("gelen commentler", comments)

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-3 border-gray-100">
                Rəylər və Şərhlər
                ({comments?.length})
            </h2>

            <CommentForm user={user} product={product} />
            <CommentList comments={comments} product={product} user={user} />
        </div>
    )
}
