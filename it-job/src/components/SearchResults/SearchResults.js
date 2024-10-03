import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getAllJob } from "../../services/jobService/jobService";
import { Card, Tag } from "antd";
import "./SearchResults.css"
import GoBack from "../../helpers/goBack";
function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();
    const citySearch = searchParams.get("city") || "";
    const keywordSearch = searchParams.get("keyword") || "";
    console.log(citySearch, keywordSearch);
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getAllJob()
            if (res) {
                const newData = res.filter((item) => {
                    const city = citySearch ? item.city?.includes(citySearch) : true;
                    const keyword = keywordSearch ? item.tag?.includes(keywordSearch) : true;
                    const status = item.status;
                    return (city && keyword && status)
                });
                setData(newData)
            }
        };
        fetchApi();
    }, [])
    console.log(data)
    return (
        <>
        <div style={{marginBottom:"20px"}}>
            <GoBack />
        </div>
            <div>
                <span>Kết quả tìm kiếm: </span>
                {citySearch ? (<Tag>{citySearch}</Tag>) : (<></>)}
                {keywordSearch ? (<Tag>{keywordSearch}</Tag>) : (<></>)}
            </div>
            {
                data.length > 0 ? (
                    <>
                        <div className="dfl">
                            {data.map((item, index) => (
                                <Card className="mr-20"
                                    key={index}
                                    title={<Link to={`/jobs/${item.id}`}>{item.name}</Link>}
                                    style={{
                                        width: 300,
                                    }}
                                >
                                    <div className="mb-20">
                                        <span>Ngôn ngữ: </span>
                                        {item.tag.map((item) => (
                                            <Tag className="mb-10" color="green">{item}</Tag>
                                        ))}
                                    </div>
                                    <div className="mb-20">
                                        <span>Thành phố: </span>
                                        {item.city.map((item) => (
                                            <Tag color="green">{item}</Tag>
                                        ))}
                                    </div>
                                    <div className="mb-20">
                                        <span>Lương: </span>
                                        <strong>{item.salary}$</strong>
                                    </div>
                                    <div className="mb-20">
                                        <span>Công ty: </span>
                                        <strong>{item.companyName}</strong>
                                    </div>
                                    <div>
                                        <span>Ngày tạo: </span>
                                        <strong>{item.timeCreatJob}</strong>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </>
                ) : (
                    <><h2>Không tìm thấy kết quả</h2></>
                )
            }
        </>
    )
}
export default SearchResults;