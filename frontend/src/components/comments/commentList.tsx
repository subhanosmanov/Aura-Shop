import { User } from '@/types/User'
import CommentCard from './commentCard'
import { Product } from '@/types/Product'
import { Comment } from '@/types/Comment'

interface CommentListPropsType {
    product: Product,
    user: User,
    comments: Comment[]
}

export default function CommentList({ comments, product, user }: CommentListPropsType) {
    return (
        <div className="space-y-4 pt-2">
            {
                comments.length > 0 ? (
                    comments.map((comment: Comment, index: number) => (
                        <CommentCard key={comment?._id || index} comment={comment} product={product} user={user} />
                    ))
                ) : (
                    <p className="text-sm text-gray-400 text-center py-4">
                        Hələ ki heç bir şərh yazılmayıb. İlk rəyi siz yazın!
                    </p>
                )
            }
        </div>
    )
}
