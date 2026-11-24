import { getMeProfile } from '@/services/auth/getMeProfile';
import AdminDashboard from './adminDashboard';
import UserDashboard from './userDashboard';

export default async function DashboardContent() {
    const { user } = await getMeProfile();
    return (
        <div>
            {user ? (
                user.role === "admin" ? <AdminDashboard /> : <UserDashboard />
            ) : user.role !== "user" && (
                <p className="text-gray-500">Zəhmət olmasa daxil olun.</p>
            )}
        </div>
    )
};