import { useParams } from "react-router-dom";
import GoBack from "../../helpers/goBack";
import { useEffect, useState } from "react";
import { getJobDetail } from "../../services";
import { Tag } from "antd";

function DetailJob() {
    const params = useParams();
    // console.log(params)
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getJobDetail(`http://localhost:3002/jobs/${params.id}`)
            setData(response);
        }
        fetchApi();
    }, []);
    console.log(data);
    return (
        <>
            {data && (
                <div style={{ padding: "30px" }}>
                    <GoBack />
                    <h2 className="mb-20">Tên job: {data.name}</h2>
                    <div className="mb-20">
                        <span>Trạng thái: </span>
                        {data.status ? (<Tag color="green">Đang bật</Tag>) : (<Tag color="gray">Đang tắt</Tag>)}
                    </div>
                    <div className="mb-20">
                        <span>Tag: </span>
                        {data.tag && ((data.tag).map((item, index) => (
                            <Tag color="blue" key={index}>{item}</Tag>
                        )))}
                    </div>
                    <div className="mb-20">
                        <span>Mức lương: </span>
                        <strong>{data.salary}$</strong>
                    </div>
                    <div className="mb-20">
                        <span>Ngày tạo: </span>
                        <strong>{data.timeCreatJob}</strong>
                    </div>
                    <div className="mb-20">
                        <span>Ngày cập nhật: </span>
                        <strong>{data.updateAt}</strong>
                    </div>
                    <div className="mb-20">
                        <span>Thành phố: </span>
                        {data.city && (data.city).map((item, index) => (
                            <Tag color="orange" key={index}>{item}</Tag>
                        ))}
                    </div>
                    <div className="mb-20">
                        <span>Mô tả: </span>
                        <span>{data.description}</span>
                    </div>
                </div>
            )}
        </>
    )
}
export default DetailJob;