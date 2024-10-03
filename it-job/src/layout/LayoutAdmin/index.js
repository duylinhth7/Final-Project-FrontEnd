import { Layout } from "antd";
import "./LayoutAdmin.scss";
import {MenuFoldOutlined, LogoutOutlined, HomeOutlined} from '@ant-design/icons';
import { Link, Outlet } from "react-router-dom";
import MenuSider from "../../components/MenuSider";
import { useState } from "react";
const { Sider, Content } = Layout;
function LayoutAdmin(){
    const [collapsed, setCollapsed] = useState(false);
    
    return(
        <>
        <div className="layout__admin">
        <header className="header">
                    <Link to="/" className={"header__logo " + (collapsed && "header__logo--collapsed")} >
                        <div >{collapsed ? (<>ITA</>) : (<>IT Admin</>)}</div>
                    </Link>
                    <div className="header__nav">
                        <div className="header__nav-left">
                            <div className="header__collapse" onClick={
                                () => { setCollapsed(!collapsed); }
                            }><MenuFoldOutlined /></div>
    
                        </div>
                    <ul className="header__nav-right">
                        <li style={{marginRight:"15px"}} className="layoutdefault__logout"><Link to="/"><HomeOutlined /> Trang chủ</Link></li>
                        <li className="layoutdefault__logout"><Link to="/logout"><LogoutOutlined /> Đăng xuất</Link></li>
                    </ul>
                    </div>
                </header>
            <Layout>
                <Sider className="layout__admin-sider" theme="light" collapsed={collapsed}>
                    <MenuSider item={collapsed} />
                </Sider>
                <Content className="layout__admin-content"> 
                    <Outlet />
                </Content>
            </Layout>
        </div>
        </>
    )
}
export default LayoutAdmin;