import { Button, Card, Col, Form, Input, message, Row, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { getListCity, getTags } from "../../services";
import GoBack from "../../helpers/goBack";
import { getTimeCurrent } from "../../helpers/getTimeCurrent";
import { creatJob } from "../../services/jobService/jobService";
import { getCookie } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";

function Addjob() {
    const [tag, setTag] = useState([]);
    const [city, setCity] = useState([]);
    const rules = [{ required: true }];
    const navigate = useNavigate();
    const [noti, contextHolder] = message.useMessage();
    const idCompany = getCookie("id");
    const companyName = getCookie("companyName");
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getTags();
            setTag(response);
        }
        fetchApi();
    }, []);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListCity();
            setCity(response);
        }
        fetchApi();
    }, []);
    const onFinish = async (values) => {
        values.timeCreatJob = getTimeCurrent();
        values.idCompany = idCompany;
        values.companyName = companyName;
        const response = await creatJob(values);
        if (response) {
            setTimeout(() => {
                navigate("/job-manage");
            }, 1000)
            noti.success("Tạo Job mới thành công!")
        }

    }
    return (
        <>
            {contextHolder}

            <div style={{ margin: "10px" }}>
                <GoBack />
            </div>
            <Card title="Tạo job mới">
                <Form
                    onFinish={onFinish}
                    // form={form}
                    layout="vertical"
                    initialValues={{
                        status: true
                    }}
                >
                    <Row gutter={20}>
                        <Col span={24}>
                            <Form.Item label="Tên job" name="name" rules={rules}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={18}>
                            <Form.Item label="Tag" name="tag" rules={rules} >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    options={tag && tag.map(tag => (
                                        {
                                            label: tag.value,
                                            value: tag.value
                                        }
                                    ))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Mức lương ($)" name="salary" rules={rules} >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Thành phố" name="city" rules={rules} >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    options={city && city.map(city => (
                                        {
                                            label: city.value,
                                            value: city.value
                                        }
                                    ))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Mô tả" name="description" rules={rules}>
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Trạng thái" name="status" rules={rules} >
                                <Switch defaultChecked={true} checkedChildren="Bật" unCheckedChildren="Tắt" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item >
                                <Button htmlType="submit" type="primary">Tạo mới</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    )
}
export default Addjob;