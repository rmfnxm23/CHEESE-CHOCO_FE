import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DetailPageStyled } from "./styled";
import clsx from "clsx";

interface productProps {
  id: number;
  name: string;
  price: string;
  content: string;
  imgUrls: string[];
}

const DetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<productProps>();

  const [existingImages, setExistingImages] = useState<productProps[]>([]);

  useEffect(() => {
    const getUpdateItem = async (id: any) => {
      if (!id) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/admin/product/${id}`
        );
        // console.log(res.data.data.img);
        // console.log(res.data.data.imgUrls);
        const item = res.data.data;

        setProduct(item);
        setExistingImages(item.imgUrls || []);
      } catch (err) {
        console.error(err);
      }
    };
    getUpdateItem(id);
  }, []);
  const BASE_URL = "http://localhost:5000";
  return (
    <DetailPageStyled className={clsx("detail-wrap")}>
      <div className="detail-container">
        <div className="img-wrap">
          {existingImages.map((src, index) => (
            <div key={`existing-${index}`} className="previewBox">
              <img
                src={`${BASE_URL}/uploads/${src}`}
                alt={`기존 이미지-${index}`}
              />
            </div>
          ))}
        </div>
        <div className="productInfo">
          <div>
            <strong>상품명:</strong> {product?.name}
          </div>
          <div>
            <strong>가격:</strong> {product?.price}
          </div>
          <div>
            <strong>내용:</strong> {product?.content}
          </div>
        </div>
      </div>
    </DetailPageStyled>
  );
};

export default DetailPage;
