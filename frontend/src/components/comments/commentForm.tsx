"use client"

import { AddComment } from '@/services/comment/addComment';
import { Product } from '@/types/Product';
import { User } from '@/types/User';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react'

interface CommentFormPropsType {
    product: Product,
    user: User
}

export default function CommentForm({ user, product }: CommentFormPropsType) {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [text, setText] = useState<string>("");

    const addCommentHandler = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (!user) {
            router.push("/register");
            return;
        }

        if (text.trim() === "") {
            setError(true);
            return;
        }

        setError(false);
        startTransition(async () => {
            try {
                const response = await AddComment(product._id, text);
                console.log(response, "gelen resposne");
                setText("");
                router.refresh();
            } catch (err: any) {
                console.error("Şərh əlavə edilərkən xəta baş verdi:", err);
                setErrorMessage(err?.message)
            }
        })
    };
    return (
        <form
            onSubmit={addCommentHandler}
            className="space-y-3">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Məhsul haqqında fikirlərinizi bölüşün..."
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-sm resize-none"
            />

            {error && (
                <p className="text-sm text-red-500 font-medium pl-1">
                    Zəhmət olmasa boş buraxmayın!
                </p>
            )}

            <div className="flex justify-end">

                {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                        {error}
                    </div>
                )}

                <button
                    disabled={isPending}
                    type="submit"
                    className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-5 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                >
                    {isPending ? "Gönderilir..." : "Şərh Göndər"}
                </button>
            </div>
        </form>
    )
}