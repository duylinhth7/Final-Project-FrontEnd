import { Button, message, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined} from "@ant-design/icons"
import { deleteJob } from "../../services/jobService/jobService";

function DeleteJob(props){
    const record = props.record;
    const onReload = props.onReload;
    const [noti, contextHolder] = message.useMessage();
    const handleDelete =  async () => {
        const response = await deleteJob(record.id)
        if(response){
            noti.success("Xóa thành công!")
            onReload();
        }
    }
    return(
        <>
        {contextHolder}
        <Tooltip title="Xóa job">
                <Popconfirm title="Bạn có chắc chắn muốn xóa không?" onConfirm = {handleDelete}>
                <Button icon={< DeleteOutlined />} />
                </Popconfirm>
            </Tooltip>
        </>
    )
}
export default  DeleteJob;