import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { DetailPageStyled } from "./styled";
import api from "@/lib/api";

interface productProps {
  id: number;
  name: string;
  price: number | string;
  content: string;
  imgUrls: string[];
  createdAt: string;
  updatedAt: string;
  categories: string[];
  colorArray: string[];
  sizeArray: string[];
  Category: { category: string };
}

const DetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<productProps | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;

    const getUpdateItem = async () => {
      try {
        const res = await api.get(`/admin/product/${id}`);
        const item = res.data.data;

        setProduct(item);
        console.log(item);
        setExistingImages(item.imgUrls || []);
      } catch (err) {
        console.error(err);
      }
    };

    getUpdateItem();
  }, [id]);

  if (!product) return <div>로딩 중...</div>;

  return (
    <DetailPageStyled>
      <div className="detail-page-wrapper">
        <div className="header">
          <h2>상품 상세 정보</h2>
          <div className="meta-info-text">
            등록일: {product.createdAt} | 수정: {product.updatedAt}
          </div>
          <div className="button-group">
            <button onClick={() => router.push(`/admin/edit/${product.id}`)}>
              수정
            </button>
            <button onClick={() => router.push("/admin")}>목록으로</button>
          </div>
        </div>

        <div className="content">
          <div className="image-grid">
            {existingImages.map((src, idx) => (
              <div key={idx} className="img-box">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/product/${src}`}
                  alt={`상품 이미지 ${idx + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="info-section">
            <div className="info-item">
              <span>상품명</span>
              <p>{product.name}</p>
            </div>
            <div className="info-item">
              <span>가격</span>
              <p>{Number(product.price).toLocaleString()}원</p>
            </div>
            <div className="info-item" style={{ flexBasis: "100%" }}>
              <span>카테고리</span>
              <p>{product.Category.category}</p>
            </div>
            <div className="info-item">
              <span>색상</span>
              <div className="tag-list">
                {product.colorArray.length
                  ? product.colorArray.map((color, i) => (
                      <span key={i}>{color}</span>
                    ))
                  : "없음"}
              </div>
            </div>
            <div className="info-item">
              <span>사이즈</span>
              <div className="tag-list">
                {product.sizeArray.length
                  ? product.sizeArray.map((size, i) => (
                      <span key={i}>{size}</span>
                    ))
                  : "없음"}
              </div>
            </div>
          </div>

          <div
            className="description-wrapper"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.content),
            }}
          />
        </div>
      </div>
    </DetailPageStyled>
  );
};

export default DetailPage;
