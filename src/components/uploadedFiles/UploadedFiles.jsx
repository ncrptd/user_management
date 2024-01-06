import './UploadedFiles.css';
import * as api from '../../api/index'
const getFileTypeLabel = (fileType) => {
    const fileTypeMap = {
        'text/csv': 'CSV File',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Spreadsheet',
    };

    return fileTypeMap[fileType] || 'Unknown Type';
};


const UploadedFiles = ({ uploadedFiles, adminTemplate }) => {

    const handleDownload = async (data) => {
        try {
            const reqBody = { ...data, adminTemplate }

            const res = await api.getDownloadLink(reqBody);
            window.location.href = res.data.signedUrl;
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="uploaded-files-container">


            {adminTemplate ? <h2>Admin Template </h2> : <h2>Uploaded Files</h2>}
            <table className="uploaded-files-table">
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>File Type</th>
                        <th>Organization</th>
                        <th>Folder Name</th>
                        <th>Upload Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {uploadedFiles &&
                        uploadedFiles?.map((file) => (
                            <tr key={file.id}>
                                <td>{file.fileName}</td>
                                <td>{getFileTypeLabel(file.fileType)}</td>
                                <td>{file.organization || 'N/A'}</td>
                                <td>{file.folderName}</td>
                                <td>{new Date(file.uploadTimestamp).toLocaleString()}</td>

                                <td>
                                    <button onClick={() => handleDownload(file)}>
                                        Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default UploadedFiles;
