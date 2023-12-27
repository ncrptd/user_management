import { useDispatch, useSelector } from "react-redux";
import FileUpload from "../../components/fileUpload/FileUpload"
import UploadedFiles from "../../components/uploadedFiles/UploadedFiles"
import { getUploadedFiles } from "../../features/upload/uploadSlice";
import { useEffect } from "react";
import { toggleUploadModal } from "../../features/modals/modalsSlice";
import './Upload.css'
function Upload() {

    const dispatch = useDispatch();
    const uploadedFiles = useSelector((state) => state.upload.uploadedFiles);
    const handleUpload = () => {
        dispatch(toggleUploadModal())
    }
    useEffect(() => {
        dispatch(getUploadedFiles());
    }, [dispatch]);


    return (
        <div id="upload-page">
            {uploadedFiles?.length > 0 && <div className="button-container"><button onClick={handleUpload}>Upload</button></div>}
            {uploadedFiles?.length > 0 && <UploadedFiles uploadedFiles={uploadedFiles} />}
            {uploadedFiles?.length <= 0 &&
                <FileUpload />
            }

        </div>

    )
}

export default Upload