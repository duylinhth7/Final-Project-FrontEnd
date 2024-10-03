import { Flex, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTags } from "../../services";

function Tags() {
    const navigate  = useNavigate();
    const [tagData, setTagData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getTags()
            setTagData(response)
        }
        fetchApi();
    }, []);
    // console.log(tagData)
    return (
        <>
            <Flex gap="4px 0" wrap>
                {tagData.map((item, index) => (
                    <Link key={index} to={`/search?keyword=${item.value}`}><Tag color="blue" value={item.id}>{item.value}</Tag></Link>
                ))}
            </Flex>
        </>
    )
}
export default Tags;