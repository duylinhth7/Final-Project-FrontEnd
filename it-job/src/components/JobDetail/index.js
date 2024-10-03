import { useParams } from "react-router-dom";
import { creatCv, getDetailCompany, getJobDetail } from "../../services";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Input, Row, Tag, Spin, message, Select, notification } from "antd";
import { getTimeCurrent } from "../../helpers/getTimeCurrent";
import GoBack from "../../helpers/goBack";


function JobDetail() {
    const [noti, contextHolder] = notification.useNotification()
    const { TextArea } = Input;
    const params = useParams();
    const formRef = useRef(null);
    // console.log(params);
    const [dataJob, setDataJob] = useState();
    const rules = [{ required: true }]
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getJobDetail(`http://localhost:3002/jobs/${params.id}`)
            const infoCompany = await getDetailCompany(`http://localhost:3002/commpany/${response.idCompany}`)
            const dataFinal = {
                ...response,
                infoCompany: infoCompany
            }
            setDataJob(dataFinal);
        }
        fetchApi();
    }, [])
    console.log(dataJob);
    // console.log(getTimeCurrent());
    const onFinish = async (values) => {
        values.idCompany = dataJob.idCompany
        values.idJob = dataJob.infoCompany.id
        values.statusRead = false
        values.nameJob = dataJob.name
        values.createAt = getTimeCurrent();
        const response = await creatCv(values);
        if(response){
            formRef.current.resetFields();
            noti.success({
                message: "Gửi thành công!",
                description: "Nhà tuyển dụng sẽ sớm liên lạc với bạn, chúc may mắn!",
                placement: "topRight"
              });
        }
        else{
            console.log("no")
        }
    }
    return (
        <>
        <div className="mb-20">
            < GoBack />
        </div>
            <div>
                {dataJob && (
                    <>
                     {contextHolder}
                        <h2>{dataJob.name}</h2>
                        <Button
                            type="primary"
                            size="large"
                            className="mb-20"
                            href="#apply"
                        >Ứng tuyển ngay</Button>
                        <div className="mb-20">
                            <span>Ngôn ngữ: </span>
                            {dataJob.tag.map((item, index) => (
                                <Tag color="success" key={index}>{item}</Tag>
                            ))}
                        </div>
                        <div className="mb-20">
                            <span>Thành phố: </span>
                            {dataJob.city.map((item, index) => (
                                <Tag color="red" key={index}>{item}</Tag>
                            ))}
                        </div>
                        <div className="mb-20">
                            <span>Mức lương: </span>
                            <strong>{dataJob.salary}$</strong>
                        </div>
                        <div className="mb-20">
                            <span>Địa chỉ công ty: </span>
                            <strong>{dataJob.infoCompany.address}</strong>
                        </div>
                        <div className="mb-20">
                            <span>Thời gian đăng bài: </span>
                            <strong>{dataJob.timeCreatJob}</strong>
                        </div>
                        <div className="mb-20">
                            <span className="mb-10">Mô tả công việc: </span>
                            <div>{dataJob.description}</div>
                        </div>
                        <div className="mb-20">
                            <span className="mb-10">Giới thiệu công ty: </span>
                            <div>
                                {dataJob.infoCompany.description}
                            </div>
                        </div>

                        <Card title="Ứng tuyển ngay" id="apply">
                            <Form layout="vertical"
                                name="form-apply"
                                onFinish={onFinish}
                                ref={formRef}
                            >
                                <Row gutter={20}>
                                    <Col span={6}>
                                        <Form.Item label="Họ và tên:" name="name" rules={rules}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="Số điện thoại:" name="phone" rules={rules}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="Email" name="email" rules={rules}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="Thành phố:" name="city" rules={rules}>
                                            <Select options={dataJob.city.map((item) => ({
                                                value: item,
                                                label: item,
                                            }))} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={24}>
                                            <Form.Item label="Giới thiệu về bản thân:" rules={rules} name="description">
                                            <TextArea rows={5} />
                                            </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={24}>
                                            <Form.Item label="Danh sách project đã làm:" rules={rules} name="linkProject">
                                            <TextArea rows={5} />
                                            </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={6}>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit" size="large">Gửi yêu cầu</Button>
                                            </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </>
                )}
            </div>
        </>
    )
}
export default JobDetail;