"use client"

import { DeleteComment } from '@/services/comment/deleteComment';
import { Comment } from '@/types/Comment';
import { Product } from '@/types/Product';
import { User } from '@/types/User';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react'

export default function CommentCard({ comment, product, user }: { comment: Comment, product: Product, user: User }) {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [formatted, setFormatted] = useState<string>("");

    // İstifadəçinin rəyi silmək səlahiyyətinin olub-olmadığını yoxlayırıq
    const canDelete = user && (
        user.role === "admin" ||
        (comment.user && comment.user.email === user.email && comment.user.name === user.name)
    );

    useEffect(() => {
        if (comment?.createdAt) {
            const dateStr = new Date(comment.createdAt).toLocaleDateString("az-AZ", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });
            setFormatted(dateStr);
        }
    }, [comment?.createdAt]);

    function deleteComment(comment: Comment) {
        if (!user) return;

        const isAdmin = user.role === "admin";
        const isOwner = comment.user && comment.user.email === user.email && comment.user.name === user.name;

        if (isAdmin || isOwner) {
            startTransition(async () => {
                try {
                    const updatecom = await DeleteComment(product._id, comment._id);
                    console.log("silinen comm: ", updatecom)
                    router.refresh();
                } catch (error) {
                    console.log(error);
                }
            })
        }
    }

    return (
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
            <div className='flex justify-between'>
                <div>
                    <div className="flex items-center gap-10">
                        <span className="font-semibold text-sm text-gray-800">
                            {comment.user?.name ? comment.user.name : <span className="text-gray-400 italic">Silinen hesab</span>}
                        </span>
                        <span className="text-xs text-gray-400">
                            {formatted}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 break-words mt-1">
                        {comment.text}
                    </p>
                </div>

                {canDelete && (
                    <button
                        onClick={() => deleteComment(comment)}
                        disabled={isPending}
                        className='cursor-pointer text-red-500 hover:text-red-700 disabled:opacity-50'
                    >
                        {isPending ? <svg className="animate-spin h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> : "X"}
                    </button>
                )}
            </div>
        </div>
    )
};