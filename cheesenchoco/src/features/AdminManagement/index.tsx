import { Button, Select, Table } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import api from "@/lib/api";

interface productProps {
  id: number;
  name: string;
  price: number;
  content: string;
  imgUrls: string[];
  createdAt: string;
}

const AdminPage = () => {
  const router = useRouter();

  const [products, setProducts] = useState<productProps[]>([]); // 상품 관리

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [sortOption, setSortOption] = useState<
    "latest" | "oldest" | "priceAsc" | "priceDesc"
  >("oldest");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get("/admin/product");

        const data = res.data.data;
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    getProducts();
  }, []);

  // 삭제 기능
  const handleDelete = async (id: number) => {
    const confirmed = confirm("삭제하시겠습니까?");
    if (!confirmed) return; // 취소 시 종료

    try {
      const res = await api.delete(`/admin/delete/${id}`);

      alert(res.data.message);
      // 삭제된 상품을 화면에서도 제거
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // 선택 삭제 기능
  const handleBulkDelete = async () => {
    if (selectedRowKeys.length === 0) {
      alert("삭제할 상품을 선택하세요.");
      return;
    }

    const confirmed = confirm("선택한 상품을 모두 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await Promise.all(
        selectedRowKeys.map((id) => api.delete(`/admin/delete/${id}`))
      );

      alert("선택한 상품이 삭제되었습니다.");
      setProducts((prev) =>
        prev.filter((item) => !selectedRowKeys.includes(item.id))
      );
      setSelectedRowKeys([]); // 선택 초기화
    } catch (err) {
      console.error(err);
    }
  };

  // 상품 정렬
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "priceAsc") return a.price - b.price;
    if (sortOption === "priceDesc") return b.price - a.price;
    if (sortOption === "latest")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortOption === "oldest")
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return 0; // 기본값
  });

  // render 옵션은 Array.map()처럼 작동합니다.
  // render: (text, row, index) => {};
  // text: name의 data [String]
  // row: 하나의 row data [Object]
  // index: row index [Number]

  // HTML → 텍스트만 추출하는 유틸
  // const stripHtml = (html: string) => {
  //   const tempDiv = document.createElement("div");
  //   tempDiv.innerHTML = DOMPurify.sanitize(html); // 안전하게 정화 후
  //   return tempDiv.textContent || "";
  // };

  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "no",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Thumbnail",
      dataIndex: "img",
      key: "img",
      render: (_: any, record: productProps) => {
        return (
          <img
            width={30}
            height={30}
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/product/${record.imgUrls[0]}`}
            alt={`상품 이미지-${record.id}`}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: number) => {
        const formatted = text.toLocaleString(); // 숫자를 문자로
        const formattedPrice = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 세자리마다 콤마(,)
        return <span>{formattedPrice}원</span>;
      },
    },
    {
      title: "Management",
      dataIndex: "management",
      key: "management",

      render: (_: any, record: productProps) => (
        <div>
          <Button
            type="link"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/edit/${record.id}`);
            }}
          >
            수정
          </Button>
          <Button
            type="link"
            danger
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(record.id);
            }}
          >
            삭제
          </Button>
        </div>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>상품 관리</h3>
        <div style={{ display: "flex", gap: 10 }}>
          <Button onClick={handleBulkDelete} danger>
            선택 삭제
          </Button>
          <Button
            onClick={() => {
              router.push("/admin/write");
            }}
          >
            상품 등록
          </Button>
        </div>
      </div>

      {/* 정렬 */}
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Select
          value={sortOption}
          style={{ width: 120 }}
          onChange={(value) => setSortOption(value)}
          options={[
            { value: "oldest", label: "등록일순" },
            { value: "latest", label: "최신순" },
            { value: "priceAsc", label: "가격 낮은순" },
            { value: "priceDesc", label: "가격 높은순" },
          ]}
        />
      </div>

      <Table
        rowSelection={rowSelection}
        dataSource={sortedProducts}
        columns={columns}
        rowKey="id" // rowKey 미설정 시 selectbox를 선택해도 전체선택 / 전체해제만 가능
        onRow={(record) => ({
          onClick: () => router.push(`/admin/detail/${record.id}`),
        })}
        rowClassName="productList-row"
      />
    </>
  );
};

export default AdminPage;
