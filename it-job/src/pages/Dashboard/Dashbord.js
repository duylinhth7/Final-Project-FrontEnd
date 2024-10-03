import { Col, Row } from "antd";
import CvStatus from "./CvStatus";
import JobStatus from "./JobStatus";
import InfoCompany from "./InfoCompany";

function Dashbord() {
    return (
        <>
            <Row gutter={20}>
                <Col span={8}>
                    <JobStatus />
                </Col>
                <Col span={8}>
                    <CvStatus />
                </Col>
                <Col span={8}>
                    <InfoCompany />
                </Col>
            </Row>
        </>
    )
}
export default Dashbord;