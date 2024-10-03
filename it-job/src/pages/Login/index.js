import { Button, Card, Col, Form, Input, message, notification, Row } from "antd";
import { CheckLogin } from "../../services";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import "./Login.scss"

function Login() {
    const rules = [{ required: true }];
    const [noti, contextHolder] = notification.useNotification();
    // const [mess, contextHolder2] = message.useMessage();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        // console.log(values);
        const response = await CheckLogin(values.email, values.password);
        if (response.length > 0 && response[0].email === values.email && response[0].password === values.password) {
            setCookie("id", response[0].id, 1)
            setCookie("companyName", response[0].companyName, 1)
            setCookie("email", response[0].email, 1)
            setCookie("phone", response[0].phone, 1)
            setCookie("token", response[0].token, 1)
            setTimeout(() => {
                navigate("/");
            }, 2000)
            dispatch(checkLogin(true));
            noti.success({
                message: "Đăng nhập thành công!",
                description: "Bạn đã đăng nhập thành công, Chào mừng bạn đên với Tt Jobs!",
                placement: "topRight"
            });
            
        }
        else {
            noti.error({
                message: "Đăng nhập không thành công!",
                description: "Bạn đã nhập sai tài khoản hoặc mật khẩu!",
                placement: "topRight"
            });
        }
    }
    return (
        <>
            {contextHolder}
            {/* {contextHolder2} */}
            <div className="form">
                <div className="form__login">
                   <div style={{marginBottom:"50px"}}>
                   <h2>Chào mừng bạn đến với <i><strong className="strong">It Jobs</strong></i></h2>
                   <div style={{fontSize:"15px", maxWidth:"600px", fontStyle:"italic"}}>Bằng việc đăng nhập, bạn đồng ý với các Điều khoản dịch vụ và Chính sách quyền riêng tư của <strong className="strong">It Jobs</strong> liên quan đến thông tin riêng tư của bạn.</div>
                   </div>
                    <Row justify="left" >
                        <Col span={20}>
                            <Card title="Đăng nhập">
                                <Form onFinish={onFinish} layout="vertical">
                                    <Form.Item name="email" label="Email:" rules={rules}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="password" label="Mật khẩu:" rules={rules}>
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item >
                                        <Button htmlType="submit" type="primary">Đăng nhập</Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className="form__description">
                    <h3>
                    Đăng nhập để truy cập ngay vào hàng ngàn đánh giá và dữ liệu lương thị trường IT
                    </h3>
                    <div></div>
                    <ul className="form__description-list">
                        <li>Xem trước mức lương để có thể lợi thế khi thoả thuận lương</li>
                        <li>Tìm hiểu về phúc lợi, con người, văn hóa công ty qua các đánh giá chân thật</li>
                        <li>Dễ dàng ứng tuyển chỉ với một thao tác</li>
                        <li>Quản lý hồ sơ và quyền riêng tư của bạn</li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Login;