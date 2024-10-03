import { useNavigate } from "react-router-dom"; 
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import { deleteAllCookies } from "../../helpers/deleteAllCookies";
import { notification } from "antd"; // Sử dụng thông báo từ Ant Design

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        deleteAllCookies(); // Gọi xóa cookie
        setTimeout(() => {
            dispatch(checkLogin(false));
        }, [500]) // Cập nhật trạng thái đăng nhập
        notification.success({
            message: "Đăng xuất thành công!",
            description: "Bạn đã đăng xuất khỏi tài khoản.",
            placement: "topRight",
        });
        navigate("/");
    }, [dispatch, navigate]);

    return null; // Không cần render gì cả
}

export default Logout;
