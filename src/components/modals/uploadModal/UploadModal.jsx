import FileUpload from '../../fileUpload/FileUpload';
import './UploadModal.css'
const UploadModal = () => {


    return (
        <div >
            <div>
                <h2 className="modal-title">Upload Files</h2>
                <FileUpload />
            </div>
        </div>
    );
};

export default UploadModal;
