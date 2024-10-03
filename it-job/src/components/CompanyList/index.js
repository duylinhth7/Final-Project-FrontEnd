import { useEffect, useState } from "react";
import { getDetailCompany } from "../../services";
import { Button, Card, Col, Row } from "antd";
import { Link, useParams } from "react-router-dom";

function CompanyList() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDetailCompany(`http://localhost:3002/commpany`)
            setData(response)
        }
        fetchApi()
    }, []);
    // console.log(data);
    return (
        <>
        <h2>Danh sách một số công ty</h2>
        <Row gutter={20}>
        {
            data && (
                <>
                    {data.map((item, index) => (
                        <Col span={8} key={index} className="mb-20">
                            <Card>
                            <Link to={`/company/${item.id}`}>
                                <div className="mb-20">
                                    <span>Công ty: </span>
                                    <strong>{item.companyName}</strong>
                                </div>
                                <div className="mb-20">
                                    <span>Thành viên: </span>
                                    <strong>{item.quanlityPeople}</strong>
                                </div>
                                <div>
                                    <span>Địa chỉ: </span>
                                    <strong>{item.address}</strong>
                                </div>
                            </Link>
                            </Card>
                        </Col>
                    ))}
                </>
            )
        }
        </Row>
        <Link to={`/`}>
            <Button>Xem thêm</Button>
        </Link>
        </>
    )
}
export default CompanyList;