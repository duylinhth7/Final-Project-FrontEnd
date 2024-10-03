import { Menu } from "antd";
import { Link } from "react-router-dom";
import {HomeOutlined, InfoCircleOutlined, UnorderedListOutlined, FileTextOutlined} from '@ant-design/icons';

function MenuSider(props) {
    const item = props.item;
    const items = [
        {
            key: "admin",
            title: "Thông tin tổng quát",
            label: <Link to="/admin"><HomeOutlined />{item ? (<></>) : (<> Tổng quan</>)}</Link>,
        },
        {
            key: "info-company",
            title:"Thông tin công ty",
            label: <Link to="info-company"><InfoCircleOutlined />{item ? (<></>) : (<> Thông tin công ty</>)}</Link>,
        },
        {
            key: "job-manage",
            title: "Quản lý việc làm",
            label: <Link to="/job-manage"><UnorderedListOutlined />{item ? (<></>) : (<> Quản lý việc làm</>)}</Link>
        },
        {
            key: "manage-cv",
            title: "Quản lý CV",
            label: <Link to="/cv-manage"><FileTextOutlined />{item ? (<></>) : (<> Quản lý CV</>)}</Link>
        }
    ]
    return (
        <>
            <Menu
                mode="inline"
                items={items}
                defaultSelectedKeys={["admin"]}
                // defaultOpenKeys={["menu-1"]}
            />
        </>
    )
}

export default MenuSider;