import { useEffect, useState } from "react";
import { getListJob } from "../../services/jobService/jobService";
import { getCookie } from "../../helpers/cookie";
import { Button, Card, Table, Tag, Tooltip } from "antd";
import Column from "antd/es/table/Column";
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined } from "@ant-design/icons"
import EditJob from "./EditJob";
import DeleteJob from "./DeleteJob";

function JobList() {
    const idCompany = getCookie("id");
    const [job, setJob] = useState(null);
    const fetchApi = async () => {
        const response = await getListJob(idCompany)
        if(response){
            setJob(response.reverse());
        }
    }
    useEffect(() => { 
        fetchApi();
    }, []);
    const handleReload = () => {
        fetchApi();
    }
    // console.log(job);
    const columns = [
        {
            title: "Tên job",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Tag",
            // dataIndex: "tag",
            key: "tag",
            render: (_, record) => {
                return (
                    ((record.tag || []).map((item, index) => (
                        <Tag color="blue" key={index} className="mb-10">
                            {item}
                        </Tag>
                    )))
                )
            }
        },
        {
            title: "Mức lương ($)",
            dataIndex: "salary",
            key: "salary"
        },
        {
            title: "Thời gian",
            // dataIndex: "time",
            key: "name",
            render: (_, record) => (
                <>
                    <small>Ngày tạo: {record.timeCreatJob}</small>
                    <br />
                    <small>Cập nhât: {record.updateAt}</small>
                </>
            )
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (_, record) => (
                <>
                    {record.status ? (<Tag color="green">Đang bật</Tag>) : (<Tag color="gray">Đang tắt</Tag>)}
                </>
            )
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <>
                    <Link to= {`/detail-job/${record.id}`} >
                        <Tooltip title="Xem chi tiết">
                            <Button icon={<EyeOutlined />} />
                        </Tooltip>
                    </Link>
                    <EditJob record={record} onReload={handleReload} />
                    <DeleteJob record={record} onReload={handleReload} />
                </>
            )
        }



    ]
    return (
        <>
            {job && (
                <Card title="Danh sách việc làm" extra={<Link to="/add-job"><Button>+ Tạo việc làm</Button></Link>}>
                    <Table dataSource={job} columns={columns} />
                </Card>
            )}
        </>
    )
}
export default JobList;