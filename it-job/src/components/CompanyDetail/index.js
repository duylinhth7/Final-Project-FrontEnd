import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetailCompany, getJobDetail } from "../../services";
import { Button, Card, Tag } from "antd";
import GoBack from "../../helpers/goBack";

function CompanyDetail() {
     const params = useParams();
     const [data, setData] = useState([]);
     const [dataJob, setDataJob] = useState([]);
     useEffect(() => {
          const fetchApi = async () => {
               const response = await getDetailCompany(`http://localhost:3002/commpany/${params.id}`)
               setData(response);
          }
          fetchApi();
     }, []);
     console.log(data);

     useEffect(() => {
          const fetchApi = async () => {
               const response = await getJobDetail(`http://localhost:3002/jobs/?idCompany=${params.id}`)
               setDataJob(response);
          };
          fetchApi();
     }, [])
     console.log(dataJob)


     return (
          <>
          <div>
             <GoBack />  
          </div>
               <h2>Thông tin chi tiết công ty</h2>
               {
                    data && (
                         <>
                              <div className="mb-20">
                                   <span>Tên công ty: </span>
                                   <strong>{data.companyName}</strong>
                              </div>
                              <div className="mb-20">
                                   <span>Địa chỉ công ty: </span>
                                   <strong>{data.address}</strong>
                              </div>
                              <div className="mb-20">
                                   <span>Website công ty: </span>
                                   <a href={data.website}>{data.website}</a>
                              </div>
                              <div className="mb-20">
                                   <span>Số lượng nhân sự: </span>
                                   <strong>{data.quanlityPeople} người</strong>
                              </div>
                              <div className="mb-20">
                                   <span>Thời gian làm việc: </span>
                                   <strong>{data.workingTime}</strong>
                              </div>
                              <div className="mb-20">
                                   <span>Số điện thoại: </span>
                                   <strong>{data.phone}</strong>
                              </div>
                              <div className="mb-20">
                                   <span>Mô tả ngắn: </span>
                                   <div>{data.description}</div>
                              </div>
                              <div className="mb-20">
                                   <span>Mô tả chi tiết: </span>
                                   <div>{data.detail}</div>
                              </div>
                         </>
                    )
               }
               <div style={{marginBottom:"20px", fontWeight:"600", fontSize:"18px"}}>Danh sách các Jobs:</div>
               <div>
                    {
                         dataJob.map((item, index) => (
                              <div>
                                   <Card className="mr-20"
                                        key={index}
                                        title={<Link to={`/jobs/${item.id}`}>{item.name}</Link>}
                                        style={{
                                             width: 300,
                                        }}
                                   >
                                        <div className="mb-20">
                                             <span>Ngôn ngữ: </span>
                                             {item.tag.map((item) => (
                                                  <Tag className="mb-10" color="green">{item}</Tag>
                                             ))}
                                        </div>
                                        <div className="mb-20">
                                             <span>Thành phố: </span>
                                             {item.city.map((item) => (
                                                  <Tag color="green">{item}</Tag>
                                             ))}
                                        </div>
                                        <div className="mb-20">
                                             <span>Lương: </span>
                                             <strong>{item.salary}$</strong>
                                        </div>
                                        <div className="mb-20">
                                             <span>Công ty: </span>
                                             <strong>{item.companyName}</strong>
                                        </div>
                                        <div>
                                             <span>Ngày tạo: </span>
                                             <strong>{item.timeCreatJob}</strong>
                                        </div>
                                   </Card>
                              </div>
                         ))
                    }
               </div>
          </>
     )
}
export default CompanyDetail;