import { useDispatch, useSelector } from "react-redux";
import FileUpload from "../../components/fileUpload/FileUpload"
import UploadedFiles from "../../components/uploadedFiles/UploadedFiles"
import { getUploadedFiles } from "../../features/upload/uploadSlice";
import { useEffect, useState } from "react";
import { toggleUploadModal } from "../../features/modals/modalsSlice";
import * as api from '../../api/index'
import './Upload.css'
function Upload() {

    const dispatch = useDispatch();
    const uploadedFiles = useSelector((state) => state.upload.uploadedFiles);
    const [adminTemplate, setAdminTemplate] = useState([]);

    const handleUpload = () => {
        dispatch(toggleUploadModal())
    }
    useEffect(() => {
        dispatch(getUploadedFiles());
        const fetchTemplates = async () => {
            try {
                const response = await api.getTemplates();
                setAdminTemplate(response.data.adminTemplate);
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        };

        fetchTemplates();
    }, [dispatch]);



    return (
        <div id="upload-page">
            {uploadedFiles?.length > 0 && <div className="button-container"><button onClick={handleUpload}>Upload</button></div>}
            {
                adminTemplate.length > 0 && <UploadedFiles uploadedFiles={adminTemplate} adminTemplate />
            }

            {uploadedFiles?.length > 0 && <UploadedFiles uploadedFiles={uploadedFiles} />}
            {uploadedFiles?.length <= 0 &&
                <FileUpload />
            }

        </div>

    )
}

export default Upload