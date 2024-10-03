import { useEffect, useState } from "react";
import { getInfoCompany } from "../../services";
import { getCookie } from "../../helpers/cookie";
import { Card } from "antd";

function InfoCompany() {
    const idCompany = getCookie("id");
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getInfoCompany(idCompany);
            setData(response);
        }
        fetchApi();
    }, []);
    // console.log(data);
    return (
        <>
            {
                data && (
                    <Card className="mb-20" size="small" title="Thông tin công ty">
                        <div>
                            <span>Tên công ty: </span>
                            <strong>{data[0].companyName}</strong>
                        </div>
                        <div>
                            <span>Số điện thoại: </span>
                            <strong>{data[0].phone}</strong>
                        </div>
                        <div>
                            <span>Email: </span>
                            <strong>{data[0].email}</strong>
                        </div>
                        <div>
                            <span>Số lượng nhân viên: </span>
                            <strong>{data[0].quanlityPeople}</strong>
                        </div>
                    </Card>
                )
            }
        </>
    )
}
export default InfoCompany;