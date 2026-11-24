"use client"

import { RemoveUser } from '@/services/auth/removeUser';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function ProfileActions() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // Hesabı tamamilə silmək üçündürsə:
    function handleDeleteAccount() {
        startTransition(async () => {
            try {
                await RemoveUser();
                router.push('/login');
            } catch (error) {
                console.error("Hesab silinərkən xəta:", error);
            }
        });
    }

    // Əgər sadəcə sistemdən çıxış etmək (logout) istəyirsinizsə:
    function handleLogout() {
        startTransition(async () => {
            router.push('/login');
        });
    }

    return (
        <div className="mt-6 flex flex-col gap-3">
            <button
                disabled={isPending}
                onClick={handleLogout}
                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
            >
                Çıxış Et
            </button>

            <button
                disabled={isPending}
                onClick={handleDeleteAccount}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
            >
                Hesabı Sil
            </button>
        </div>
    )
}
