import { Button, message, Popconfirm, Tooltip } from "antd";
import { deleteCv } from "../../services";
import { DeleteOutlined }  from "@ant-design/icons";

function DeleteCv(props) {
    const record = props.record;
    const onReload = props.onReload;
    const [noti, contextHolder] = message.useMessage();
    const handleDelete = async () => {
        const response = await deleteCv(record.id)
        if (response) {
            noti.success("Xóa thành công!")
            onReload();
        }
    }
    return (
        <>
            {contextHolder}
            <Tooltip title="Xóa job">
                <Popconfirm title="Bạn có chắc chắn muốn xóa không?" onConfirm={handleDelete}>
                    <Button icon={< DeleteOutlined />} />
                </Popconfirm>
            </Tooltip>
        </>
    )
}
export default DeleteCv;