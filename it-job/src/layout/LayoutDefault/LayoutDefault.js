import { Link, Outlet } from "react-router-dom";
import "./LayoutDefault.scss";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
import { HomeOutlined, LogoutOutlined} from '@ant-design/icons';

function LayoutDefault() {
    const token = getCookie("token");
    const isLogin = useSelector(state => state.loginReducer);
    return (
        <>
            <div className="layoutdefault">
                <header className="layoutdefault__header">
                    <div ><Link className="layoutdefault__logo" to="/">It Jobs</Link></div>
                    <div className="layoutdefault__menu">
                        <ul>
                            {
                                token ? (
                                    <>
                                    <li className="layoutdefault__admin"><Link to="/admin"><HomeOutlined/> Quản lý</Link></li>
                                    <li className="layoutdefault__logout"><Link to="/logout"><LogoutOutlined /> Đăng xuất</Link></li>
                                    </>
                                ):(
                                    <>
                                    <li className="layoutdefault__login"><Link to="/login">Đăng nhập</Link></li>
                                    <li className="layoutdefault__register"><Link to="/register">Đăng ký</Link></li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </header>
                <div className="layoutdefault__main">
                    {<Outlet />}
                </div>
                <footer className="layoutdefault__footer">
                    @Copyright by Hoang Duy Linh
                </footer>
            </div>

        </>
    )
}
export default LayoutDefault;
