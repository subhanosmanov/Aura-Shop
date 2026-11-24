import { getMeProfile } from '@/services/auth/getMeProfile';
import { redirect } from 'next/navigation';

export default async function ProfileContent() {
    const { user } = await getMeProfile();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="space-y-3 text-left">
            <p><strong>Ad:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Rollar:</strong> {Array.isArray(user?.roles) ? user?.roles.join(', ') : user?.role}</p>
        </div>
    );
}