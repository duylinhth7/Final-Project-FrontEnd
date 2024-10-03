import { Card } from "antd";
import { useEffect, useState } from "react";
import { getListJob } from "../../services/jobService/jobService";
import { getCookie } from "../../helpers/cookie";

function JobStatus() {
    const idCompany = getCookie("id");
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListJob(idCompany)
            if (response) {
                let obj = {
                    total: 0,
                    statusTrue: 0,
                    statusFalse: 0
                };
                obj.total = response.length;
                response.forEach((item) => {
                    item.status ? obj.statusTrue++ : obj.statusFalse++
                })
                setData(obj)
            }
        }
        fetchApi();
    }, [])
    // console.log(data)
    return (
        <>
            {
                data && (
                    <Card className="mb-20" size="small" title="Jobs"> 
                <div>
                    <span>Số lượng job: </span>
                    <strong>{data.total}</strong>
                </div>
                <div>
                    <span>Job đang bật: </span>
                    <strong>{data.statusTrue}</strong>
                </div>
                <div>
                    <span>Job đang tắt: </span>
                    <strong>{data.statusFalse}</strong>
                </div>
            </Card>
                )
            }
        </>
    )
}
export default JobStatus;