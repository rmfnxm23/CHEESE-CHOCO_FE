"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";
import { TipTapStyled } from "./styled";
import axios from "axios";
import Paragraph from "@tiptap/extension-paragraph";

import { Bold, Italic, Heading2, Image as ImageIcon } from "lucide-react";

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}

// 커스텀 Paragraph 확장
const CustomParagraph = Paragraph.extend({
  renderHTML({ HTMLAttributes }) {
    return ["div", HTMLAttributes, 0];
  },
});

// const CustomParagraph = Paragraph.extend({
//   renderHTML({ HTMLAttributes }) {
//     return ["p", { class: "my-paragraph", ...HTMLAttributes }, 0];
//   },
// });

export default function Editor({ value, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false, // 기본 paragraph 제거
      }),
      CustomParagraph,
      Image.configure({ allowBase64: true, inline: true }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    // 🚨 중요: SSR 환경에서 mismatch 방지를 위해 false 설정
    // autofocus: false,
    // injectCSS: true,
    // editable: true,
    immediatelyRender: false, // 🚨 중요: Tiptap이 인스턴스 생성 시 에디터 내용을 즉시 렌더링할지 여부
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  // 이미지 업로드
  const addImage = () => {
    // 🔹 1. <input type="file"> 엘리먼트를 JS로 동적으로 생성
    const input = document.createElement("input");
    input.type = "file"; // 파일 선택 창
    input.accept = "image/*"; // 이미지 파일만 선택 가능
    input.multiple = true; // 여러 이미지 선택 허용

    // 🔹 2. 파일이 선택되었을 때 실행되는 이벤트 핸들러 등록
    input.onchange = async () => {
      if (!input.files || input.files.length === 0) return;

      // 🔹 3. 선택된 파일들을 배열로 변환
      //   const files = Array.from(input.files);
      const formData = new FormData();
      Array.from(input.files).forEach((file) => formData.append("image", file));

      // 🔹 4. 각 파일마다 서버에 업로드 → URL 받아와서 에디터에 삽입
      //   for (const file of files) {
      //     // 🔸 4-1. 서버에 보낼 formData 생성
      //     const formData = new FormData();
      //     formData.append("image", file); // 서버에서 'image'라는 키로 받음
      console.log(formData.getAll("image"), "check");
      //   return;
      try {
        // 🔸 4-2. axios로 이미지 업로드 요청
        const response = await axios.post(
          `http://localhost:5000/admin/product/callbackImage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // 🔐 필수: 파일 업로드 형식 명시
            },
          }
        );

        // 🔸 4-3. 서버에서 반환한 이미지 URL 가져오기
        const imageUrls = response.data.urls;
        console.log(imageUrls, "hey");

        // 🔸 4-4. Tiptap 에디터에 이미지 삽입;
        imageUrls.forEach((url: string) => {
          editor.chain().focus().setImage({ src: url }).run();
        });
      } catch (error) {
        // 🔸 4-5. 에러 핸들링
        console.error("이미지 업로드 실패:", error);
      }
    };

    // 🔹 5. 파일 선택 창을 유저에게 띄움
    input.click();
  };

  return (
    <div className="content-wrap">
      <TipTapStyled>
        {/* 툴바 */}
        <div className="toolbar-btn" style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "font-bold text-blue-600" : ""}
          >
            <Bold size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "italic text-blue-600" : ""}
          >
            Italic
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            H2
          </button>

          <button type="button" onClick={addImage}>
            이미지 추가
          </button>
        </div>

        {/* 에디터 본문 */}

        <EditorContent editor={editor} className="editor-content" />
      </TipTapStyled>
    </div>
  );
}
