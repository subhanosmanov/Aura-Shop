'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/auth/loginUser';

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await loginUser({ email, password });

            const token = res.token || res.data?.token;

            if (token) {
                document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
            }

            router.push('/');
            router.refresh();

        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Giriş zamanı xəta baş verdi');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Xoş gəlmisiniz!</h1>
                    <p className="text-sm text-gray-500 mt-1">AuraShop hesabınıza daxil olun</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                            E-poçt ünvanı
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ornek@mail.com"
                            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                            Şifrə
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition duration-200 disabled:opacity-50"
                    >
                        {loading ? 'Daxil olunur...' : 'Daxil ol'}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                        Hesabınız yoxdur?{' '}
                        <Link href="/register" className="font-medium text-black hover:underline">
                            Qeydiyyatdan keç
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}