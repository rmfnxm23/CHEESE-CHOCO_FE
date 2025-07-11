import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { WritingStyled } from "./styled";
import clsx from "clsx";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import api from "@/lib/api";

// TipTap 에디터 동적 import (SSR 방지)
const Editor = dynamic(() => import("@/components/Common/TipTap"), {
  ssr: false,
});

const WritingPage = () => {
  const router = useRouter();

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);

  // 카테고리 데이터 가져오기
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await api.get(`/category`);

        if (res.data.data) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error("카테고리 조회 실패: ", err);
      }
    };
    getCategory();
  }, []);

  const formik = useFormik({
    initialValues: {
      img: [],
      name: "",
      price: "",
      content: "",
      color: "",
      size: "",
      categoryId: "",
    },
    onSubmit: async (values) => {
      setErrorMessage("");

      const { img, name, price, content, color, size, categoryId } = values;

      if (!categoryId) {
        return setErrorMessage("카테고리를 선택해주세요.");
      }
      if (!img.length) {
        return setErrorMessage("파일을 선택해주세요.");
      }
      if (!name) {
        return setErrorMessage("상품명을 기입해주세요.");
      }
      if (!price) {
        return setErrorMessage("가격을 기입해주세요.");
      }
      // if (!content) {
      //   return setErrorMessage("내용을 입력해주세요.");
      // }

      // HTML 문자열에서 유의미한 내용이 있는지 판단
      const plainText = content.replace(/<[^>]*>/g, "").trim(); // 태그 제거
      const hasImage = /<img\s+[^>]*src=/.test(content); // img 태그 유무 확인

      if (!plainText && !hasImage) {
        return setErrorMessage("내용을 입력해주세요.");
      }

      const formData = new FormData();

      img.forEach((file) => {
        formData.append("img", file); // 배열이 아닌 같은 key로 여러 개 추가
      });
      formData.append("name", name);
      formData.append("price", price.replace(/,/g, ""));
      formData.append("content", content);

      formData.append("color", color);
      formData.append("size", size);
      formData.append("categoryId", categoryId);

      try {
        const res = await api.post(`/admin/product/register`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert(res.data.message);

        router.push("/admin");
      } catch (err) {
        console.error("상품 등록 실패: ", err);
      }
    },
  });

  // 파일 업로드 및 미리보기 처리
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      formik.setFieldValue("img", fileArray);

      // 기존 미리보기 url 해제
      previewImages.forEach((url) => URL.revokeObjectURL(url));

      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewImages(previewUrls);
    }
  };

  return (
    <WritingStyled className={clsx("writing-wrap")}>
      <div className="writing-container">
        <h2 className="writing-title">상품 등록</h2>
        <form onSubmit={formik.handleSubmit}>
          <select
            name="categoryId"
            value={formik.values.categoryId}
            onChange={(e) => {
              formik.handleChange(e);
              setErrorMessage("");
            }}
          >
            <option value="">카테고리 선택</option>
            {categories.map((x: any) => (
              <option value={x.id} key={x.id}>
                {x.category}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="img"
            accept="image/*" // 이미지 파일만
            multiple // 이미지 여러개 선택
            onChange={handleFileChange}
          />

          {/* 이미지 미리보기 */}
          <div
            className="image-preview-wrapper"
            style={{ display: previewImages.length > 0 ? "flex" : "none" }}
          >
            {previewImages.map((src, index) => (
              <img key={index} src={src} alt={`미리보기-${index}`} />
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
            placeholder="색상"
            value={formik.values.color}
            onChange={(e) => {
              formik.handleChange(e);
              setErrorMessage("");
            }}
          />

          <input
            type="text"
            name="size"
            placeholder="사이즈"
            value={formik.values.size}
            onChange={(e) => {
              formik.handleChange(e);
              setErrorMessage("");
            }}
          />

          {/* TipTap Editor (HTML 값 저장됨) */}
          <Editor
            value={formik.values.content}
            onChange={(html) => formik.setFieldValue("content", html)}
          />

          <button
            type="submit"
            // disabled={!isValid}
            style={{ cursor: "pointer" }}
          >
            등록
          </button>
          <p>{errorMessage}</p>
        </form>
      </div>
    </WritingStyled>
  );
};

export default WritingPage;
