import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Button, Table, Space, Image, Modal, Select } from "antd";
import { Link } from "react-router-dom";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
const { Paragraph } = Typography;
import type { ColumnsType } from "antd/es/table";
import {
  deleteProduct,
  getAll,
  getProductCategory,
} from "../../../api/product";
import { ProductType } from "../../../types/Product";
import { CategoriesType } from "../../../types/Category";
import { getAllCategory } from "../../../api/categories";

interface DataType {
  name: string;
  saleOffPrice: number;
  feature: string;
  description: string;
  // hidden: string;
  // status: string;
}

const ProductAdminPage = () => {
  const [dataTable, setDataTable] = useState<ProductType[]>([]);
  const [category, setCategory] = useState<CategoriesType[]>([]);
  const columns: ColumnsType<ProductType> = [
    { key: "1", title: "ID", dataIndex: "id" },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "img sản phẩm",
      dataIndex: "img",
      key: "img",
      render: (text: string, record: ProductType) => {
        return <Image width={200} src={text} />;
      },
    },
    {
      title: "Đặc điểm",
      dataIndex: "feature",
      key: "feature",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Giá gốc",
      dataIndex: "originalPrice",
      key: "originalPrice",
    },
    {
      title: "Giá khuyến mãi",
      dataIndex: "saleOffPrice",
      key: "saleOffPrice",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ẩn hiện",
      dataIndex: "hidden",
      key: "hidden",
    },
    {
      title: "Action",
      key: "action",
      sorter: true,
      render: (text, record) => (
        <Space size="middle">
          <Link to={`product/edit/${record.id}`}>
            <EditOutlined />
          </Link>
          <a>
            <Space>
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={() => {
                  onDelete(record.id as string);
                }}
              />
            </Space>
          </a>
        </Space>
      ),
    },
  ];
  console.log(dataTable);

  const onDelete = async (id: string) => {
    console.log(id);

    Modal.confirm({
      title: "Bạn có muốn xóa không?",
      onOk: async () => {
        const { data } = await deleteProduct(id);
        if (data) {
          setDataTable(dataTable.filter((item) => item.id !== id));
        }
      },
    });

    console.log();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAll();
        setDataTable(data.data);
      } catch (err) {}
    };

    fetchData();
  }, []);
  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await getAllCategory();
        setCategory(data);
      } catch (error) {}
    };
    getCategory();
  }, []);
  const handlechange = async (value: any) => {
    if (value === undefined) {
      const { data } = await getAllCategory();
      setDataTable(data);
    } else {
      const { data } = await getProductCategory(value);
      setDataTable(data);
    }
  };
  const { Option } = Select;
  return (
    <>
      <Breadcrumb>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Điện thoại
        </Typography.Title>
        <Space>
          <h4>lọc</h4>
          <Select
            style={{ width: "100%" }}
            size="large"
            placeholder="Phân loại "
            onChange={handlechange}
          >
            {category.map((item, index) => (
              <Option value={item.id} key={index}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Space>
        <Link to="/admin/product/add">
          <Button type="dashed" shape="circle" icon={<PlusOutlined />} />
        </Link>
      </Breadcrumb>
      <Table columns={columns} dataSource={dataTable} />
    </>
  );
};
const Breadcrumb = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
export default ProductAdminPage;
