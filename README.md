# CHEESE&CHOCO - 웹쇼핑몰 사이트 구현 [개인]

## :page_facing_up: 프로젝트 소개
 1. Next.js + Node.js (+ MySQL 데이터베이스) 기반의 풀스택 쇼핑몰 웹 애플리케이션입니다.
 2. 회원가입/로그인, 상품 검색 및 결제, 관리자 페이지까지 포함된 실제 서비스 가능한 수준의 쇼핑몰을 구현했습니다.<br/><br/>

## 📆 프로젝트 기간 및 역할

1. 기간: 2025.05 ~ 2025.06 (4주)
2. 역할: 전체 기능 단독 개발 (프론트엔드 + 백엔드) <br/><br/>
 
## 🔅 프로젝트 실행

1. 프론트엔드 실행
```bash
cd cheesenchoco
npm install
npm run dev
```
2. 백엔드 실행
```bash
npm install
nodemon app.js
```
<br/>

## 🗂️ DB 설계도

<img width="700" alt="db" src="https://github.com/user-attachments/assets/45cc517b-afd5-45a6-87ce-8bb1683b4481" />

## 주요 화면 및 기능
### 📑 1. 메인 페이지 
<div align="center">
<img width="70%" alt="Image" src="https://github.com/user-attachments/assets/5faa74d0-f760-4348-8f48-40bedf207e74" /></div>

- 배너의 이미지가 일정시간 바뀜
- 상품이 등록된 날짜를 기준으로 최신순부터 4개의 상품만 표시
- SHOP 클릭시 상품의 분류 기준인 카테고리가 나타남
- 검색 클릭 시 화면의 상단에서 아래로 검색창이 나타남
- 내정보, 장바구니, 로그인 클릭 시 해당 페이지로 이동 가능

### 📑 2. 카테고리별 상품 페이지 
<img width="80%" alt="Image" src="https://github.com/user-attachments/assets/a7aaf429-41fe-42ba-b5c7-74408be0452b" />

- 페이지 당 20개의 상품을 보여주고 다음페이지 생성

### 📑 3. 상세 페이지 
| 상품 썸네일 및 옵션 | 상품의 상세 이미지 |
|-------|-------|
|<img width="80%" alt="Image" src="https://github.com/user-attachments/assets/b64345c5-8d9f-436b-b14d-b32a368b092b" />|<img width="80%" alt="Image" src="https://github.com/user-attachments/assets/319dbc6f-1370-452c-8332-85edc243f0ee" />|
- 선택한 상품의 이미지, 상세 정보, 옵션을 확인할 수 있음
- 장바구니 담기, 바로 구매 기능 제공
- 반응형 UI로 PC/모바일 모두 최적화

### 📑 4. 장바구니 페이지 (Cart)
<img width="80%" alt="Image" src="https://github.com/user-attachments/assets/3b84a4dc-82c5-4019-ba8a-ea3d0cf8c4b0" />

- 담은 상품의 수량 및 옵션 목록 확인
- 선택 상품만 주문 가능
- 담긴 상품 선택하여 삭제 가능
- 총 금액 자동 계산 (25,000원 이상일 경우 배송비 무료)

### 📑 5. 검색결과 페이지 (Search)
<img width="80%" alt="Image" src="https://github.com/user-attachments/assets/2d8204a4-ab04-4b44-a293-3cace0f5fb1f" />

### 📑 6. 내정보 페이지 (Mypage)
| 주문내역 조회 | 회원정보 수정 |
|-------|-------|
| <img src="https://github.com/user-attachments/assets/c1e37ca2-4bb9-49d0-b2aa-69b15c1b5e8b" width="100%"> | <img src="https://github.com/user-attachments/assets/b4c687ab-7aba-4188-901d-055db60ebc16" width="100%"> |

- 주문 내역/활동 기록 확인
- 사용자 프로필 관리 (닉네임 변경, 프로필 이미지, 비밀번호 변경)
- 회원 탈퇴 및 로그아웃 기능 포함

### 📑 7. 관리자 페이지 (admin)
- 등록된 상품 리스트 확인
- 상품 등록/수정/삭제 기능 제공
- 이미지 및 카테고리 관리 가능


