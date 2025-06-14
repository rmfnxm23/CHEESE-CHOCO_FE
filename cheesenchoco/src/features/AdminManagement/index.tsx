import { Button, Table } from "antd";
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
}

const AdminPage = () => {
  const router = useRouter();

  const [products, setProducts] = useState<productProps[]>([]); // 상품 관리

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get("/admin/product");
        console.log(res.data.data);
        const data = res.data.data;

        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  });

  // 삭제 기능
  const handleDelete = async (id: number) => {
    console.log("id", id);
    confirm("삭제하시겠습니까?");
    try {
      const res = await api.delete(`/admin/delete/${id}`);

      alert(res.data.message);
      // 삭제된 상품을 화면에서도 제거
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // render 옵션은 Array.map()처럼 작동합니다.
  // render: (text, row, index) => {};
  // text: name의 data [String]
  // row: 하나의 row data [Object]
  // index: row index [Number]

  // HTML → 텍스트만 추출하는 유틸
  const stripHtml = (html: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = DOMPurify.sanitize(html); // 안전하게 정화 후
    return tempDiv.textContent || "";
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
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
            alt={`기존 이미지-${record.id}`}
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
    // {
    //   title: "Content",
    //   dataIndex: "content",
    //   key: "content",
    //   render: (html: string) => {
    //     const text = stripHtml(html);
    //     const truncated = text.length > 100 ? text.slice(0, 100) + "..." : text;
    //     return <span>{truncated}</span>;
    //   },
    // },
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
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
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
        <Button
          onClick={() => {
            router.push("/admin/write");
          }}
        >
          상품 등록
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        dataSource={products}
        columns={columns}
        rowKey="id" // rowKey 미설정 시 selectbox를 선택해도 전체선택 / 전체해제만 가능
        // onRow={()=>{router.push("/admin")}}
        onRow={(record) => ({
          onClick: () => router.push(`/admin/detail/${record.id}`),
        })}
      />
    </>
  );
};

export default AdminPage;
