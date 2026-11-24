import AddCategory from "../admin/addCategory";
import AddProduct from "../admin/addProduct";

export default function AdminDashboard() {

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="max-w-6xl mx-auto px-4">

                <div className="my-8">
                    <h1 className="text-3xl font-black text-gray-900">Admin İdarəetmə Paneli</h1>
                    <p className="text-gray-500 mt-1">Sayt üçün yeni kateqoriyalar və məhsullar əlavə edin.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* KATEQORİYA ƏLAVƏ ETMƏ FORMU */}
                    <AddCategory />
                    {/* MƏHSUL ƏLAVƏ ETMƏ FORMU */}
                    <AddProduct />
                </div>
            </div>
        </div>
    )
}
