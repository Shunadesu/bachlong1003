"use client";
import { useEffect, useState } from "react";
import { fetchDailySales } from "../../lib/fetchDailySales";
import { Product } from "../../constant/Product";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export function DailySalesList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [linkLoading, setLinkLoading] = useState(false);
  const quantity = 2;
  const total_quantity = 20;
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDailySales();
        setProducts(data ?? []); 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 5);

  const calculateTimeLeft = () => {
    const difference = +endDate - +new Date();
    return difference > 0
      ? {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLinkClick = (href: string) => {
    setLinkLoading(true);
    router.push(href);
  };

  if (loading) return <p>Loading...</p>;
  if (products.length === 0) return <p>No products available</p>;

  const settings = {
    autoplay: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: window.innerWidth > 1440 ? 5 : window.innerWidth > 1024 ? 4 : window.innerWidth > 768 ? 3 : 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    lazyLoad: "ondemand" as const,
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="slider-container xl:max-w-[1440px] lg:max-w-[1024px] md:max-w-[768px] sm:max-w-[640px] max-w-[400px] w-full">
        <Slider {...settings} className="cursor-grab">
          {products.map((product, index) => (
            <div
              key={index}
              className="border items-center xl:!w-[265px] lg:!w-[245px] md:!w-[225px] w-full border-gray-200 bg-white p-4 !rounded-lg !flex gap-4 flex-col transition-all duration-300 hover:shadow-xl hover:border-red-400 md:justify-self-center "
              onClick={() => handleLinkClick(`/product/${product.sku}`)}
            >
              <div className="relative flex transition-all duration-300 xl:w-[160px] xl:h-[160px] lg:w-[150] lg:h-[150] sm:w-[120] sm:h-[120] hover:scale-105">
                <img
                  src={product.image.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <img
                  src="https://beta-api.bachlongmobile.com/media/catalog/tmp/category/2025-03-03_09-16-18-824_18.png"
                  alt="banner"
                  className="absolute top-0 left-0 w-full h-full object-contain"
                />
              </div>

              <div className="lg:w-full text-black font-bold text-center text-[12px] bg-amber-400 rounded-lg p-2">
                Kết thúc: {timeLeft.days} Ngày - {String(timeLeft.hours).padStart(2, "0")}:
                {String(timeLeft.minutes).padStart(2, "0")}:
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-bold xl:text-[17px] lg:text-[16px] md:text-[14px] line-clamp-2">
                  {product.name}
                </p>
                <p className="text-red-700 font-bold xl:text-[16px] text-[14px]">
                  {product.sale_price.toLocaleString()} VND
                </p>

                <div className="flex items-center gap-2 xl:text-[14px] text-[12px]">
                  <p className="line-through">
                    {product.price_original.toLocaleString()} VND
                  </p>
                  <div className="px-2 text-red-700 font-bold border border-red-700 rounded-lg">
                    <p>
                      -{((1 - product.sale_price / product.price_original) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>

                {/* Installment */}
                <div className="flex items-center gap-2">
                  <p>
                    Trả trước từ{" "}
                    <span className="text-red-700 font-bold">
                      {(product.sale_price * 10) / 100}
                    </span>
                  </p>
                </div>

                {/* Progress bar */}
                <div className="relative py-2">
                  <img
                    src="https://bachlongmobile.com/assets/images/svg/ic-fire.svg"
                    alt="fire"
                    className="w-[40px] h-[40px] z-10 absolute -left-3 top-0"
                  />
                  <div className="relative overflow-hidden h-6 mb-4 text-xs flex rounded-full bg-yellow-200">
                    <div
                      style={{
                        width: `${(100 - (quantity / total_quantity) * 100)}%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
                    ></div>

                    <div className="absolute z-1 inset-0">
                      <span className="text-xs w-full text-center font-semibold inline-block py-1 px-2 uppercase rounded-full text-black">
                        Còn {quantity}/{total_quantity} sản phẩm
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-pink-200 text-center text-red-600 text-[12px] font-semibold p-4 rounded-lg">
                  Giá thu bằng giá bán - Trợ giá lên đến 100%
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {linkLoading && (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-500"></div>
    </div>
    )}    
</div>
  );
}
