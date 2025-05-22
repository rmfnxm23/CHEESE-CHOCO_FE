import axios from "axios";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { WritingStyled } from "./styled";
import clsx from "clsx";
import { useRouter } from "next/router";

const WritingPage = () => {
  const router = useRouter();

  //   const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null); // ✅ ref 선언

  const formik = useFormik({
    initialValues: {
      //   img: null,
      img: [],
      name: "",
      price: "",
      content: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      setErrorMessage("");

      const img = values.img;
      const name = values.name;
      const price = values.price;
      const content = values.content;

      //   if (!img) {
      if (!img.length) {
        return setErrorMessage("파일을 선택해주세요.");
      }
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

      //   if (values.img) {
      //     formData.append("img", img);
      //   }
      img.forEach((file) => {
        formData.append("img", file); // 배열이 아닌 같은 key로 여러 개 추가
      });
      formData.append("name", name);
      formData.append("price", price.replace(/,/g, ""));
      formData.append("content", content);

      //   // FormData의 value 확인
      //   for (let value of formData.values()) {
      //     console.log(value);
      //   }

      try {
        const res = await axios.post(
          "http://localhost:5000/admin/product/register",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        alert(res.data.message);
        // formik.resetForm();
        // // setPreviewImage(null);
        // setPreviewImages([]);

        // if (fileInputRef.current) {
        //   fileInputRef.current.value = ""; // ✅ 파일 input 초기화
        // }

        router.push("/admin");
      } catch (err) {
        console.error("상품 등록 실패: ", err);
      }
    },
  });

  // 선택한 파일 미리보기(한개)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const file = e.currentTarget.files?.[0];
    const files = e.currentTarget.files;
    // if (file) {
    //   formik.setFieldValue("img", file);

    //   if (previewImage) {
    //     URL.revokeObjectURL(previewImage); // 이전 URL 제거
    //   }

    //   const previewUrl = URL.createObjectURL(file);
    //   setPreviewImage(previewUrl);
    // }
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      formik.setFieldValue("img", fileArray);

      // 기존 미리보기 해제
      previewImages.forEach((url) => URL.revokeObjectURL(url));

      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewImages(previewUrls);
    }
  };

  return (
    <WritingStyled className={clsx("writing-wrap")}>
      <div className="writing-container">
        <h2>상품 등록</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* <select
            name="categoryId"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
          >
            <option value="">카테고리 선택</option>
            {categories.map((x) => (
              <option value={x.id} key={x.id}>
                {x.category}
              </option>
            ))}
          </select> */}
          <input
            type="file"
            name="img"
            accept="image/*" // 이미지 파일만
            multiple // 이미지 여러개 선택
            // value={formik.values.img}
            onChange={handleFileChange}
          />

          {/* 이미지 미리보기 한개*/}
          {/* {previewImage && (
            <div style={{ margin: "10px 0" }}>
              <img
                src={previewImage}
                alt="미리보기"
                style={{ maxWidth: "150px", height: "auto" }}
              />
            </div>
          )} */}
          {/* 이미지 미리보기 여러 개 */}
          <div className="image-preview-wrapper">
            {previewImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`미리보기-${index}`}
                // style={{ maxWidth: "150px", height: "auto" }}
              />
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
              //   formik.handleChange;
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
            name="content"
            placeholder="내용"
            value={formik.values.content}
            onChange={formik.handleChange}
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
