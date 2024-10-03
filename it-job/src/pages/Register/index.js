import { Button, Card, Col, Form, Input, notification, Row } from "antd";
import { generateToken } from "../../helpers/generate";
import { CheckExist, creatCompany } from "../../services";
import { useNavigate } from "react-router-dom";
// import { useRef } from "react";
function Register(){
    const rules = [{ required: true }];
    const navigate = useNavigate();
    // const formRef = useRef(null)
    const [noti, contextHolder] = notification.useNotification()
    const onFinish = async (values) => {
        values.token = generateToken();
        console.log(values);
        
        const  CheckExistEmail = await CheckExist("email", values.email);
        const  CheckExistPhone= await CheckExist("phone", values.phone);
        
        if(CheckExistEmail.length > 0 && CheckExistPhone.length > 0){
            noti.error({
                message: "Không thành công!",
                description: "Email và số điện thoại bạn vừa nhập đã tồn tại!",
                placement: "topRight"
              });
              return;
        } else if(CheckExistPhone.length > 0){
            noti.error({
                message: "Không thành công!",
                description: "Số điện thoại bạn vừa nhập đã tồn tại!",
                placement: "topRight"
              });
              return;
        } else if(CheckExistEmail.length > 0){
            noti.error({
                message: "Không thành công!",
                description: "Email bạn vừa nhập đã tồn tại!",
                placement: "topRight"
              });
              return;
        } else {
            const result = await creatCompany(values)
            if(result){
                noti.success({
                    message: "Thành công!",
                    description: "Đăng ký tài khoản thành công!",
                    placement: "topRight"
                  });
                  setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }
        }
         
    }   
    return(
        <>
        {contextHolder} 
        <Row justify="center" >
            <Col span={12}>
            <Card title="Đăng ký tài khoản">
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item name="name" label="Tên công ty:" rules={rules}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Số điện thoại:" rules={rules}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email:" rules={rules}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Mật khẩu:" rules={rules}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item >
                        <Button htmlType="submit" type="primary">Đăng ký</Button>
                    </Form.Item>
                </Form>
            </Card>
            </Col>
        </Row>
        </>
    )
}
export default Register;