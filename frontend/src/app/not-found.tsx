import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="max-w-md w-full">
        {/* Böyük Xəta Kodu */}
        <h1 className="text-8xl font-black text-gray-900 tracking-wider mb-2">404</h1>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Səhifə tapılmadı</h2>
        
        <p className="text-gray-600 mb-6">
          Axtardığınız səhifə silinmiş, adı dəyişdirilmiş və ya heç mövcud olmamış ola bilər.
        </p>

        {/* Ana səhifəyə qayıdış düyməsi */}
        <Link 
          href="/" 
          className="inline-block w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition shadow-sm"
        >
          Ana səhifəyə qayıt
        </Link>
      </div>
    </div>
  );
}