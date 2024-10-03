import { Card } from "antd";
import { useEffect, useState } from "react";
import { getListCv } from "../../services";
import { getCookie } from "../../helpers/cookie";

function CvStatus() {
    const idCompany = getCookie("id");
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListCv(idCompany);
            console.log(response)
            if (response) {
                let obj = {
                    total: 0,
                    statusTrue: 0,
                    statusFalse: 0
                };
                obj.total = response.length;
                response.forEach((item) => {
                    item.statusRead ? obj.statusTrue++ : obj.statusFalse++;
                })
                setData(obj);
            }
        }
        fetchApi();
    }, []);
    console.log(idCompany);
    return (
        <>
            {
                data && (
                    <Card className="mb-20" size="small" title="CV">
                        <div>
                            <span>Số lượng CV: </span>
                            <strong>{data.total}</strong>
                        </div>
                        <div>
                            <span>Số lượng CV đã đọc </span>
                            <strong>{data.statusTrue}</strong>
                        </div>
                        <div>
                            <span>Số lượng CV chưa đọc: </span>
                            <strong>{data.statusFalse}</strong>
                        </div>
                    </Card>
                )
            }
        </>
    )
}
export default CvStatus;