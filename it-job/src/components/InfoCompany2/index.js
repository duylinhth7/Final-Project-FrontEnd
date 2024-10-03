import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getInfoCompany, updateInfoCompany } from "../../services";
import { Button, Card, Col, Form, Input, message, notification, Row } from "antd";
import { useForm } from "antd/es/form/Form";

function InfoCompany2() {
    const idCompany = getCookie("id");
    const [data, setData] = useState(null);
    const [form] = Form.useForm();
    const [disable, setDisable] = useState(true);
    const rules = [{ required: true }];
    const [noti, contextHolder] = message.useMessage();
    const fetchApi = async () => {
        const response = await getInfoCompany(idCompany);
        setData(response[0])
    };
    useEffect(() => {
        fetchApi();
    }, [data]);
    const handleEdit = () => {
        setDisable(0);
    };
    const handleCancel = () => {
        setDisable(1);
        form.resetFields();
    };
    const onFinish = async (values) => {
        const valueUpdate = {
            ...data,
            ...values
        }
        const response = await updateInfoCompany(idCompany, valueUpdate);
        if(response){
            await fetchApi();
            handleCancel();
            noti.success("Cập nhật thành công!");
        }
        else{
            handleCancel();
            noti.error("Cập nhật thất bại!");
        }
    }
    return (
        <>
        {contextHolder}
            {
                data && (
                    <Card
                        title="Thông tin công ty"
                        extra={disable ? (<Button onClick={handleEdit}>Chỉnh sửa</Button>) : (<Button onClick={handleCancel}>Hủy</Button>)}
                    >
                        <Form
                            onFinish={onFinish}
                            form={form}
                            initialValues={data}
                            layout="vertical"
                            disabled={disable}

                        >
                            <Row gutter={20}>
                                <Col span={24}>
                                    <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Email" name="email" rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Địa chỉ" name="address" rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Số lượng nhân sự" name="quanlityPeople" rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Thời gian làm việc" name="workingTime" rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Website" name="website" rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Mô tả ngắn" name="description" rules={rules}>
                                        <Input.TextArea />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Mô tả chi tiết" name="detail" rules={rules}>
                                        <Input.TextArea />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item>
                                        <Button htmlType="submit" type="primary">Cập nhật</Button>
                                        <Button onClick={handleCancel} style={{ marginLeft: "10px" }}>Hủy</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                )
            }
        </>
    )
}
export default InfoCompany2;