"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useEffect, useRef, useState } from "react";
import { TipTapStyled } from "./styled";
import Paragraph from "@tiptap/extension-paragraph";

import { Bold, Italic, Image as ImageIcon } from "lucide-react";
import api from "@/lib/api";

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

export default function Editor({ value, onChange }: EditorProps) {
  const [headingDropdownOpen, setHeadingDropdownOpen] = useState(false);

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

  // 현재 active heading level 찾기
  const currentLevel =
    ([1, 2, 3, 4, 5] as const).find((level) =>
      editor?.isActive("heading", { level })
    ) ?? null;

  // 외부 클릭시 드롭다운 닫기 (옵션)
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setHeadingDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  // 이미지 업로드
  const addImage = () => {
    // 1. <input type="file"> 엘리먼트를 JS로 동적으로 생성
    const input = document.createElement("input");
    input.type = "file"; // 파일 선택 창
    input.accept = "image/*"; // 이미지 파일만 선택 가능
    input.multiple = true; // 여러 이미지 선택 허용

    // 2. 파일이 선택되었을 때 실행되는 이벤트 핸들러 등록
    input.onchange = async () => {
      if (!input.files || input.files.length === 0) return;

      // 3. 선택된 파일들을 배열로 변환
      const formData = new FormData();
      Array.from(input.files).forEach((file) => formData.append("image", file));

      // 4. 각 파일마다 서버에 업로드 → URL 받아와서 에디터에 삽입
      try {
        const response = await api.post(
          `/admin/product/callbackImage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // 서버에서 반환한 이미지 URL 가져오기
        const imageUrls = response.data.urls;

        // Tiptap 에디터에 이미지 삽입
        imageUrls.forEach((url: string) => {
          editor.chain().focus().setImage({ src: url }).run();
        });
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
      }
    };

    // 5. 파일 선택 창을 유저에게 띄움
    input.click();
  };

  return (
    <div className="content-wrap">
      <TipTapStyled>
        {/* 툴바 */}
        <div className="toolbar-btn">
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
            <Italic size={18} />
          </button>

          {/* 커스텀 Heading 드롭다운 */}
          <div className="heading-dropdown" ref={dropdownRef}>
            <div
              className="heading-dropdown-button"
              onClick={() => setHeadingDropdownOpen((open) => !open)}
            >
              <span>{currentLevel ? `H${currentLevel}` : "H"}</span>
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 12,
                  transform: headingDropdownOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              >
                ▼
              </span>
            </div>

            {headingDropdownOpen && (
              <ul className="heading-dropdown-list">
                {([1, 2, 3, 4, 5] as const).map((level) => (
                  <li
                    key={level}
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level }).run();
                      setHeadingDropdownOpen(false);
                    }}
                    style={{
                      padding: "6px 12px",
                      cursor: "pointer",
                      backgroundColor: currentLevel === level ? "#e0e0e0" : "",
                    }}
                  >
                    H{level}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button type="button" onClick={addImage}>
            <ImageIcon size={18} />
          </button>
        </div>

        {/* 에디터 본문 */}
        <EditorContent editor={editor} className="editor-content" />
      </TipTapStyled>
    </div>
  );
}
