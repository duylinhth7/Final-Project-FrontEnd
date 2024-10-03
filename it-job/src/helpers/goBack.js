import { Button } from "antd";
import { useNavigate } from "react-router-dom"

function GoBack(){
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }
    return(
        <>
        <Button color="gray" onClick={handleGoBack}>
            Trở lại
        </Button>
        </>
    )
}
export default GoBack;