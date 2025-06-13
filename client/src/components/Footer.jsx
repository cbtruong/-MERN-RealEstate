import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-16 px-6"> {/* Đã tăng py-12 → py-16 */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Giới thiệu Thịnh Phát */}
        <div>
          <h2 className="text-white font-semibold mb-4 uppercase tracking-widest">Về Thịnh Phát</h2>
          <div className="w-10 h-0.5 bg-white mb-4"></div>
          <p className="text-sm leading-relaxed text-gray-400">
            Thịnh Phát là nền tảng bất động sản hàng đầu, giúp bạn dễ dàng tìm mua, thuê hoặc đăng tin bất động sản. 
            Chúng tôi cam kết mang đến dịch vụ uy tín, minh bạch và thuận tiện cho tất cả người dùng.
          </p>
        </div>

        {/* Điều hướng */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-white font-semibold mb-4 uppercase tracking-widest">Liên kết</h2>
            <div className="w-10 h-0.5 bg-white mb-4"></div>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Trang chủ</li>
              <li className="hover:text-white cursor-pointer">Mua nhà</li>
              <li className="hover:text-white cursor-pointer">Thuê nhà</li>
              <li className="hover:text-white cursor-pointer">Bất động sản</li>
            </ul>
          </div>
          <div>
            <ul className="mt-10 space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Giới thiệu</li>
              <li className="hover:text-white cursor-pointer">Chính sách bảo mật</li>
              <li className="hover:text-white cursor-pointer">Liên hệ</li>
              <li className="hover:text-white cursor-pointer">Điều khoản</li>
            </ul>
          </div>
        </div>

        {/* Mạng xã hội */}
        <div>
          <h2 className="text-white font-semibold mb-4 uppercase tracking-widest">Theo dõi chúng tôi</h2>
          <div className="w-10 h-0.5 bg-white mb-4"></div>
          <div className="flex space-x-6 text-xl text-gray-400">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaLinkedinIn className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
