import { Button, Card, Table, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getCv } from "../../services";
import { EyeOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom";
import DeleteCv from "./DeleteCv";
import { getCookie } from "../../helpers/cookie";

function CVList() {
    const idCompany = getCookie("id")
    const [cv, setCv] = useState();
    const fetchApi = async () => {
        const response = await getCv(idCompany);
        setCv(response);
    };
    useEffect(() => {
        fetchApi();
    }, []);
    const handleReload = () => {
        fetchApi();
    }

    const columns = [
        {
            title: "Tên job",
            dataIndex: "nameJob",
            key: "nameJob"
        },
        {
            title: "Họ và tên",
            dataIndex: "name"
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: "Ngày gửi",
            dataIndex: "createAt",
            key: "createAt",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (_, record) => (
                <>
                    {record.statusRead ? (<Tag color="green">Đã đọc</Tag>) : (<Tag color="gray">Chưa đọc</Tag>)}
                </>
            )
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <>
                    <Link to={`/detail-cv/${record.id}`} >
                        <Tooltip title="Xem chi tiết">
                            <Button icon={<EyeOutlined />} />
                        </Tooltip>
                    </Link>
                    <DeleteCv record={record} onReload={handleReload} />
                </>
            )
        }]
    return (
        <>
            {cv && (
                <Card title="Danh sách CV ứng tuyển" >
                    <Table dataSource={cv} columns={columns} />
                </Card>
            )}
        </>
    )
}
export default CVList;