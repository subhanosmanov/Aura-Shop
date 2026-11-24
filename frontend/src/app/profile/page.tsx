import { Suspense } from 'react';
import ProfileContent from './profileContent';
import ProfileActions from './profileActions';

export default function Profile() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
                <h1 className="text-2xl font-bold mb-4">İstifadəçi Profili</h1>
                <Suspense fallback={<div className="text-gray-500">Profil yüklənir...</div>}>
                    <ProfileContent />
                </Suspense>
                <ProfileActions />
            </div>
        </div>
    );
}