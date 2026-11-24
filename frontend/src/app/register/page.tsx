'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 1. Buradan import etdiyindən əmin ol
import { registerUser } from '@/services/auth/registerService';
import { loginUser } from '@/services/auth/loginUser';

export default function RegisterPage() {
    const router = useRouter(); // 2. Hook-u funksiyanın əvvəlində, state-lərin dərhal yanında çağırırıq

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await registerUser({ name, email, password });
            const loginRes = await loginUser({ email, password });
            const token = loginRes.token;
            if (token) {
                if (token) {
                    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
                }
            }
            // Form sahələrini sıfırlayırıq
            setName('');
            setEmail('');
            setPassword('');

            // Ana səhifəyə yönləndiririk
            router.push('/');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">AuraShop-a Qoşulun</h1>
                    <p className="text-sm text-gray-500 mt-1">Yeni hesab yaradaraq alış-verişə başlayın</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                            Ad Soyad
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Məs: Əli Məmmədov"
                            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                        />
                    </div>

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
                        {loading ? 'Gözləyin...' : 'Qeydiyyatdan keç'}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                        Artıq hesabınız var?{' '}
                        <Link href="/login" className="font-medium text-black hover:underline">
                            Daxil ol
                        </Link>
                    </p>
                </div>
            </div>
        </div>)
}