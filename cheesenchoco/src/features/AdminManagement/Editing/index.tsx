import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { EditingStyled } from "./styled";
import clsx from "clsx";

import dynamic from "next/dynamic";
import api from "@/lib/api";

// TipTap 에디터 동적 import (SSR 방지)
const Editor = dynamic(() => import("@/components/Common/TipTap"), {
  ssr: false,
});
interface productProps {
  id: number;
  name: string;
  price: number;
  content: string;
  imgUrls: string[];
  categoryId: number;
  colorArray: string[];
  sizeArray: string[];
}

const EditingPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<productProps>(); // 상품 관리

  const [category, setCategory] = useState<{ id: number; category: string }[]>(
    []
  );

  const [existingImages, setExistingImages] = useState<string[]>([]); // 상품 데이터의 이미지만 관리 (서버에 저장된 이미지들)

  const [previewImages, setPreviewImages] = useState<string[]>([]); // 새 파일을 선택했을 경우 미리보기 관리

  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null); // ref 선언

  // 수정할 내용 가져오기
  useEffect(() => {
    const getUpdateItem = async (id: any) => {
      if (!id) return;

      try {
        const res = await api.get(`/admin/product/${id}`);

        const item = res.data.data;

        setProduct(item);
        setExistingImages(item.imgUrls || []);
        setPreviewImages([]); // 새로 불러오면 새 이미지 없음
      } catch (err) {
        console.error(err);
      }
    };
    getUpdateItem(id);
  }, [id]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await api.get("/category");

        if (res.data.data) {
          setCategory(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getCategory();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      img: [],
      name: product?.name || "",
      price:
        product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "",
      content: product?.content || "",
      color: product?.colorArray || [],
      size: product?.sizeArray || [],
      categoryId: product?.categoryId || "",
    },
    onSubmit: async (values) => {
      setErrorMessage("");

      const img = values.img;
      const name = values.name;
      const price = values.price;
      const content = values.content;
      const color = values.color;
      const size = values.size;
      const categoryId = values.categoryId;

      // if (!categoryId) {
      //   return setErrorMessage("카테고리를 선택해주세요.");
      // }
      // if (!img.length) {
      //   return setErrorMessage("파일을 선택해주세요.");
      // }
      if (!name) {
        return setErrorMessage("상품명을 기입해주세요.");
      }
      if (!price) {
        return setErrorMessage("가격을 기입해주세요.");
      }
      if (!content) {
        return setErrorMessage("내용을 입력해주세요.");
      }

      const formData = new FormData();

      // 새 이미지가 있으면 그걸 사용
      if (img && img.length > 0) {
        img.forEach((file: File) => {
          formData.append("img", file);
        });
      } else {
        // 새 이미지 없으면 기존 이미지 유지용으로 전송
        existingImages.forEach((filename: string) => {
          formData.append("existingImg", filename);
        });
      }

      formData.append("name", name);
      formData.append("price", price.replace(/,/g, ""));
      formData.append("content", content);
      formData.append("color", color.join(","));
      formData.append("size", size.join(","));
      formData.append("categoryId", String(categoryId));

      try {
        const res = await api.post(`/admin/update/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert(res.data.message);

        router.push("/admin");
      } catch (err) {
        console.error("상품 수정 실패: ", err);
      }
    },
  });

  // 선택한 파일 미리보기 (여러 개)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files && files.length > 0) {
      const fileArray = Array.from(files);

      // Formik에 파일 저장
      formik.setFieldValue("img", fileArray);

      setExistingImages([]); // 기존 이미지 제거

      // 기존 미리보기 해제
      previewImages.forEach((url) => URL.revokeObjectURL(url));

      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewImages(previewUrls);
    }
  };

  return (
    <EditingStyled className={clsx("writing-wrap")}>
      <div className="writing-container">
        <h2>상품 수정</h2>
        <form onSubmit={formik.handleSubmit}>
          <select
            name="categoryId"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
          >
            {/* 현재 선택된 카테고리를 기본으로 표시 */}
            {/* <option value="">
              {category.length > 0 && product
                ? category.find((x: any) => x.id === product.categoryId)
                    ?.category || "카테고리 선택"
                : "카테고리 선택"}
            </option> */}

            {/* 나머지 카테고리 표시 */}
            {category
              // .filter((x: any) => x.id !== product?.categoryId) // 현재 선택된 카테고리는 중복 안 되게
              .map((x: any) => (
                <option key={x.id} value={x.id}>
                  {x.category}
                </option>
              ))}
          </select>

          <input
            type="file"
            name="img"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />

          <div className="image-preview-wrapper">
            {/* 새 이미지 선택했으면 그것만 보여줌 */}
            {previewImages.length > 0
              ? previewImages.map((src, index) => (
                  <div key={`preview-${index}`} className="preview-box">
                    <img src={src} alt={`미리보기-${index}`} />
                  </div>
                ))
              : existingImages.map((src, index) => (
                  <div key={`existing-${index}`} className="preview-box">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/product/${src}`}
                      alt={`상품 이미지-${index}`}
                    />
                  </div>
                ))}
          </div>

          <input
            type="text"
            name="name"
            placeholder="상품명"
            value={formik.values.name}
            onChange={(e) => {
              formik.handleChange(e);
              setErrorMessage("");
            }}
          />

          <input
            type="text"
            name="price"
            placeholder="가격"
            value={formik.values.price}
            onChange={(e) => {
              const inputPrice = e.target.value.replace(/\D/g, "");
              const formattedPrice = inputPrice.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              );
              formik.setFieldValue("price", formattedPrice);
              setErrorMessage("");
            }}
          />

          <input
            type="text"
            name="color"
            placeholder="색상 (예: 빨강,파랑)"
            value={formik.values.color.join(",")}
            onChange={(e) => {
              const arr = e.target.value.split(",").map((c) => c.trim());
              formik.setFieldValue("color", arr);
              setErrorMessage("");
            }}
          />

          <input
            type="text"
            name="size"
            placeholder="사이즈 (예: S,M,L)"
            value={formik.values.size.join(",")}
            onChange={(e) => {
              const arr = e.target.value.split(",").map((s) => s.trim());
              formik.setFieldValue("size", arr);
              setErrorMessage("");
            }}
          />

          <Editor
            value={formik.values.content}
            onChange={(html: string) => formik.setFieldValue("content", html)}
          />
          <button
            type="submit"
            // disabled={!isValid}
            style={{ cursor: "pointer" }}
          >
            저장
          </button>
          <p>{errorMessage}</p>
        </form>
      </div>
    </EditingStyled>
  );
};

export default EditingPage;
