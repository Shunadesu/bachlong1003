import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full flex justify-center items-center flex-col">
      {/* Footer Content */}
      <div className="max-w-[1440px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-6 w-full">
        {/* Column 1 - Company Info */}
        <div>
          <h3 className="font-semibold text-lg">Thông tin công ty</h3>
          <ul className="mt-3 space-y-4 text-white flex flex-col gap-2">
            <li><Link href="#">Giới thiệu</Link></li>
            <li><Link href="#">Hướng dẫn mua hàng</Link></li>
            <li><Link href="#">Chính sách bảo hành</Link></li>
            <li><Link href="#">Chính sách đổi trả</Link></li>
            <li><Link href="#">Chính sách bảo mật</Link></li>
          </ul>
        </div>

        {/* Column 2 - Customer Support */}
        <div>
          <h3 className="font-semibold text-lg">Hỗ trợ khách hàng</h3>
          <ul className="mt-3 space-y-4 text-white flex flex-col gap-2">
            <li><Link href="#">Quy trình giao hàng</Link></li>
            <li><Link href="#">Trả góp 0% lãi suất</Link></li>
            <li><Link href="#">Đổi cũ lấy mới</Link></li>
            <li><Link href="#">Tuyển dụng</Link></li>
            <li><Link href="#">Liên hệ</Link></li>
          </ul>
        </div>

        {/* Column 3 - Contact Information */}
        <div>
          <h3 className="font-semibold text-lg">Thông tin liên hệ</h3>
          <p className="mt-3 text-white">
            Mua hàng: <span className="font-bold text-white">1900.63.64.69</span>
          </p>
          <p className="text-white">
            Bảo hành: <span className="font-bold text-white">1900.63.69.81</span>
          </p>
          <p className="text-white">
            Email: <span className="font-bold text-white">director@bachlongmobile.com</span>
          </p>
        </div>

        {/* Column 4 - Google Maps */}
        <div>
          <h3 className="font-semibold text-lg">Địa chỉ cửa hàng</h3>
          <p className="text-white mt-2">141 Trần Phú, Quận 5, TP.HCM</p>
          <div className="mt-6 w-full h-40 md:h-48 rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.606341004948!2d106.67794027481267!3d10.841035357784027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f2c047e70d3%3A0x12f4d0f7e7a75e9e!2zMTQxIFRy4bqnbiBQaMO6LCBRdeG6rW4gNSwgVGjDoG5oIHBo4buRIE3hu7kgVOG7qW5oLCBIbyBDaGkgTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1sen!2s!4v1710248334161!5m2!1sen!2s"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
      </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-white text-sm py-4">
        © {new Date().getFullYear()} Bach Long Mobile. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
