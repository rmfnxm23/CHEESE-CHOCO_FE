import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import banner1 from "@/assets/images/main_img01.jpg";
import banner2 from "@/assets/images/main_img02.jpg";
import contact from "@/assets/images/main_contact_img.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import Header from "@/components/Header";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import api from "@/lib/api";

import { MainpageStyled } from "./styled";
import clsx from "clsx";

import ProductCard from "@/components/ProductCard";

interface productProps {
  id: number;
  name: string;
  price?: string;
  content?: string;
  imageUrl: string;
  img: string;
}

const MainPage = () => {
  const router = useRouter();

  // const swiperRef = useRef<any>(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0); // 현재 슬라이드 인덱스 관리

  const [products, setProducts] = useState<productProps[]>([]);

  // 배너 데이터(이미지 + 텍스트) 배열 객체로 관리
  const banners = [
    { image: banner1, label: "PROMOTHIN 01" },
    { image: banner2, label: "PROMOTHIN 02" },
  ];

  useEffect(() => {
    const getProduct = async () => {
      try {
        // const res = await api.get("/admin/product");
        let url = `${process.env.NEXT_PUBLIC_API_URL}/admin/product`;
        if (router.pathname === "/") {
          url += "?limit=4&sort=desc"; // 홈일 때만 4개만 요청
        }
        console.log("요청 URL:", url);

        const res = await api.get(url);
        if (res.data.data) {
          console.log(res.data.data);
          setProducts(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getProduct();
  }, []);

  return (
    <>
      <Header />
      <MainpageStyled className={clsx("main-wrap")}>
        <div className="banners-wrap">
          <div
            className="main-banners"
            style={{ margin: 0, width: "100%", padding: 0 }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              pagination={{ clickable: true }}
              spaceBetween={0}
              slidesPerView={1}
              loop
              autoplay={{ delay: 5000 }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {/* <SwiperSlide>
                <Image src={banner1} alt="banner" className="banner" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={banner2} alt="banner" className="banner" />
              </SwiperSlide> */}
              {banners.map((banner, idx) => (
                <SwiperSlide key={`${banner.label}-${idx}`}>
                  <Image
                    src={banner.image}
                    alt={`banner ${idx + 1}`}
                    className="banner"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div>
            <ul className="slick-dots">
              {/* <li className="slick">
                <span>PROMOTHIN 01</span>
              </li>
              <li className="slick">
                <span>PROMOTHIN 02</span>
              </li> */}
              {banners.map((banner, idx) => (
                <li
                  key={idx}
                  className={clsx("slick", { active: activeIndex === idx })}
                  onClick={() => swiperRef.current?.slideToLoop(idx)}
                >
                  <span>{banner.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="main-shop-now">
            <div>SHOP NOW</div>
          </div>
        </div>
        <div className="product-grid">
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              content={product.content}
              imgUrls={product.imgUrls[0]}
            />
          ))}
        </div>

        <div className="main-text">
          <ul>
            <li className="text2">
              It doesn't matter where you are coming from.
              <br />
              All that matters is where you are going.
            </li>
            <br />
            <li className="text1">DISCOVER MORE</li>
          </ul>
        </div>
        <div className="contact">
          <Image src={contact} alt="contact" />
        </div>
        <div className="rolling-text">
          <div className="logo-text">
            <span>C H E E S E & C H O C O&nbsp;</span>
            <span>C H E E S E & C H O C O&nbsp;</span>
            <span>C H E E S E & C H O C O&nbsp;</span>
            <span>C H E E S E & C H O C O&nbsp;</span>
            <span>C H E E S E & C H O C O&nbsp;</span>
            <span>C H E E S E & C H O C O&nbsp;</span>
            <span>C H E E S E & C H O C O&nbsp;</span>
            <span>C H E E S E & C H O C O&nbsp;</span>
            <span>C H E E S E & C H O C O&nbsp;</span>
            <span>C H E E S E & C H O C O&nbsp;</span>
            <span>C H E E S E & C H O C O&nbsp;</span>
            <span>C H E E S E & C H O C O&nbsp;</span>
            <span>C H E E S E & C H O C O&nbsp;</span>
            <span>C H E E S E & C H O C O&nbsp;</span>
            <span>C H E E S E & C H O C O&nbsp;</span>
            <span>C H E E S E & C H O C O&nbsp;</span>
          </div>
        </div>
      </MainpageStyled>
    </>
  );
};

export default MainPage;
