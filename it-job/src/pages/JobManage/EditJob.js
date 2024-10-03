import { Button, Card, Col, Form, Input, message, Modal, Row, Select, Switch, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTimeCurrent } from "../../helpers/getTimeCurrent";
import { updateJob } from "../../services/jobService/jobService";
import { getListCity, getTags } from "../../services";


function EditJob(props) {
    const [noti, contextHolder] = message.useMessage();
    const record = props.record;
    const onReload = props.onReload;
    const [tag, setTag] = useState([]);
    const [city, setCity] = useState([]);
    const [modal, setModal] = useState(false);
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

    // console.log(tag)
    const isModalOpen = () => {
        setModal(true)
    };
    const handleOk = () => {
        setModal(false)
    };
    const handleCancel = () => {
        setModal(false)
    }
    const onFinish = async (values) => {
        values.updateAt = getTimeCurrent();
        values.timeCreatJob = record.timeCreatJob;
        values.idCompany = record.idCompany;
        values.companyName = record.companyName
        const response = await updateJob(record.id, values);
        if (response) {
            onReload();
            setModal(false);
            noti.success("Cập nhật thành công!")
            
        }
    }
    return (
        <>
            {contextHolder}
            <Tooltip title="Chỉnh sửa">
                <Button icon={< EditOutlined />} onClick={isModalOpen} />
            </Tooltip>

            <Modal footer={null} title="Chỉnh sửa job" open={modal} onOk={handleOk} onCancel={handleCancel}>
                {
                    record && (
                        <Form
                            onFinish={onFinish}
                            // form={form}
                            initialValues={record}
                            layout="vertical"
                        // disabled={disable}

                        >
                            <Row gutter={20}>
                                <Col span={24}>
                                    <Form.Item label="Tên job" name="name">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={18}>
                                    <Form.Item label="Tag" name="tag" >
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{
                                                width: '100%',
                                            }}
                                            defaultValue={record.tag.map(tag => (
                                                {
                                                    label: tag,
                                                    value: tag
                                                }
                                            ))}
                                            // onChange={handleChange}
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
                                    <Form.Item label="Mức lương ($)" name="salary" >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Thành phố" name="city" >
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{
                                                width: '100%',
                                            }}
                                            defaultValue={record.city.map(city => (
                                                {
                                                    label: city,
                                                    value: city
                                                }
                                            ))}
                                            // onChange={handleChange}
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
                                    <Form.Item label="Mô tả" name="description">
                                        <Input.TextArea />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Trạng thái" name="status" >
                                        <Switch defaultChecked={record.status} checkedChildren="Bật" unCheckedChildren="Tắt" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item >
                                        <Button htmlType="submit" type="primary">Cập nhật</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    )
                }
            </Modal>
        </>
    )
}
export default EditJob;