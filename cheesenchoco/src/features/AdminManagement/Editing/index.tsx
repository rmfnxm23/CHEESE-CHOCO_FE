import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { EditingStyled } from "./styled";
import clsx from "clsx";

interface productProps {
  id: number;
  name: string;
  price: number;
  content: string;
  imgUrls: string[];
}

const EditingPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<productProps>(); // 상품 관리

  const [existingImages, setExistingImages] = useState<string[]>([]); // 상품 데이터의 이미지만 관리 (서버에 저장된 이미지들)

  const [previewImages, setPreviewImages] = useState<string[]>([]); // 새 파일을 선택했을 경우 미리보기 관리

  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null); // ref 선언

  // 수정할 내용 가져오기
  useEffect(() => {
    const getUpdatePost = async (id: any) => {
      if (!id) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/admin/product/${id}`
        );
        // console.log(res.data.data.img);
        // console.log(res.data.data.imgUrls);
        const post = res.data.data;

        setProduct(post);
        setExistingImages(post.imgUrls || []);
        setPreviewImages([]); // 새로 불러오면 새 이미지 없음
      } catch (err) {
        console.error(err);
      }
    };
    getUpdatePost(id);
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true, // ← 이게 있어야 갱신됨
    initialValues: {
      img: [],
      name: product?.name || "",
      price:
        product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "",
      content: product?.content || "",
    },
    onSubmit: async (values) => {
      console.log(values);
      setErrorMessage("");

      const img = values.img;
      const name = values.name;
      const price = values.price;
      const content = values.content;

      //   if (!img.length) {
      //     return setErrorMessage("파일을 선택해주세요.");
      //   }
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

      //   img.forEach((file) => {
      //     formData.append("img", file); // 배열이 아닌 같은 key로 여러 개 추가
      //   });

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

      try {
        const res = await axios.post(
          `http://localhost:5000/admin/update/${id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

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

  const BASE_URL = "http://localhost:5000"; // 서버 주소

  return (
    <EditingStyled className={clsx("writing-wrap")}>
      <div className="writing-container">
        <h2>상품 수정</h2>
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
            onChange={handleFileChange}
          />

          {/* <div className="image-preview-wrapper">
            {existingImages.map((src, index) => (
              <div key={index} className="preview-box">
                <img
                  src={`${BASE_URL}/uploads/${src}`}
                  alt={`기존 이미지-${index}`}
                />
              </div>
            ))}

            {previewImages.map((src, index) => (
              <div key={`new-${index}`} className="preview-box">
                <img src={src} alt={`새 이미지-${index}`} />
              </div>
            ))}
          </div> */}

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
                      src={`${BASE_URL}/uploads/${src}`}
                      alt={`기존 이미지-${index}`}
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
            저장
          </button>
          <p>{errorMessage}</p>
        </form>
      </div>
    </EditingStyled>
  );
};

export default EditingPage;
