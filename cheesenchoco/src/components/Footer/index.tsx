import { useRouter } from "next/router";
import { FooterStyled } from "./styled";
import Column from "antd/es/table/Column";

const Footer = () => {
  const router = useRouter();

  return (
    <FooterStyled>
      <div className="company-info">
        <p>
          <strong>상호</strong> 치즈앤초코 (주)
        </p>
        <p>
          <strong>대표이사 </strong>
          <a href="https://github.com/rmfnxm23">박소현</a>
        </p>

        <p>
          <strong>사업자등록번호</strong> 123-45-67890
        </p>
        <p>
          <strong>주소</strong> 서울특별시 강남구 테헤란로 123, 5층
        </p>
      </div>

      <div className="links">
        {/* <a href="/terms">이용약관</a> */}
        <span>이용약관</span>
        <span>|</span>
        {/* <a href="/privacy">개인정보처리방침</a> */}
        <span>개인정보처리방침</span>
        <span>|</span>
        {/* <a href="/customer-service">고객센터</a> */}
        <span>고객센터</span>
      </div>

      <div className="copyright">
        © {new Date().getFullYear()} CHEESE&CHOCO. All rights reserved.
      </div>
    </FooterStyled>
  );
};

export default Footer;
