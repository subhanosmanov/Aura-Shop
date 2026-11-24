import { Suspense } from 'react';
import DashboardContent from './dashboardContent';

export default function Dashboard() {
    return (
        <div className='mt-4'>
            <Suspense fallback={<div className="text-gray-500">Admin İstifadeci paneli yuklenir..</div>}>
                <DashboardContent />
            </Suspense>
        </div>
    )
};