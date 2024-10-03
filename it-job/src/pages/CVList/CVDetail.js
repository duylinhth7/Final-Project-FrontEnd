import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { changeStatusCv, getDetailCv } from "../../services";
import { Tag } from "antd";
import GoBack from "../../helpers/goBack";

function CVDetail(){
    const params = useParams();
    const [data, setData] = useState([]);
    const fetchApi = async () => {
        const response = await getDetailCv(params.id)
        setData(response);
        const updateData = {
            ...response,
            statusRead : true
        }
        changeStatusCv(params.id, updateData )
    }
    useEffect(() => {
        fetchApi();
    }, []);
    console.log(data)
    return(
        <>
        <div style={{margin:"20px"}}><GoBack /></div>
        <div style={{padding:"20px"}}>
            {data && (
                <>
                <h2 style={{marginBottom:"50px"}}>Tên Job: {data.nameJob}</h2>
                <div className="mb-20">
                    <span>Ứng viên: </span>
                    <strong>{data.name}</strong>
                </div>
                <div className="mb-20">
                    <span>Số điện thoại: </span>
                    <strong>{data.phone}</strong>
                </div>
                <div className="mb-20">
                    <span>Email: </span>
                    <strong>{data.email}</strong>
                </div>
                <div className="mb-20">
                    <span>Thành phố ứng tuyển: </span>
                    <Tag color="orange">{data.city}</Tag>
                </div>
                <div className="mb-20">
                    <span>Giới thiệu: </span>
                    <strong>{data.description}</strong>
                </div>
                <div className="mb-20">
                    <span>Link project: </span>
                    <strong>{data.linkProject}</strong>
                </div>
                <div className="mb-20">
                    <span>Trạng thái: </span>
                    {data.statusRead ? (<Tag color="green">Đã đọc</Tag>) : (<Tag color="gray">Chưa đọc</Tag>)}
                </div>
                </>
            )}
        </div>
        </>
    )
}
export default CVDetail;