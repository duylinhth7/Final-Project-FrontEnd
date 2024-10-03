import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getListCity } from '../../services';
function Search() {
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [dataCity, setDataCity] = useState();
    useEffect(() => {
        const fetchApi = async () => {
           const res =  await getListCity()
           setDataCity(res)
            
        }
        fetchApi();
    }, [])
    const onFinish = (e) => {
        formRef.current.resetFields();
        console.log(e);
        navigate(`/search?city=${e.city || ""}&keyword=${e.keyword || ""}`)
    }
    return (
        <>
            <div className="home">
                <h1 className="home__title">
                    1000+ Jobs For Developers
                </h1>
                <Form onFinish={onFinish} ref={formRef}>
                    <Row gutter={[12, 12]}>
                        <Col xl={6}>
                            <Form.Item name="city">
                                <Select options={dataCity} placeholder="Chọn thành phố" />
                            </Form.Item>
                        </Col>
                        <Col xl={8}>
                            <Form.Item name="keyword">
                                <Input placeholder='Nhập từ khóa...' />
                            </Form.Item>
                        </Col>
                        <Col xl={6}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Tìm kiếm
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    )
}
export default Search;