import './UploadedFiles.css';
import * as api from '../../api/index'
const getFileTypeLabel = (fileType) => {
    const fileTypeMap = {
        'text/csv': 'CSV File',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Spreadsheet',
        'application/json': 'JSON File',
        'application/pdf': 'PDF File',
        'application/msword': 'Word Document',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word Document',
        'application/vnd.ms-excel': 'Excel File (XLS)',

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
    console.log('up', uploadedFiles)
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
                        <th>Uploaded By</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {uploadedFiles &&
                        uploadedFiles?.map((file, index) => (
                            <tr key={index}>
                                <td className={file?.confidential ? 'confidential' : ''}>{file.fileName}</td>
                                <td>{getFileTypeLabel(file.fileType)}</td>
                                <td>{file.organization || 'N/A'}</td>
                                <td>{file.folderName}</td>
                                <td>{new Date(file.uploadTimestamp).toLocaleString()}</td>
                                <td>{file?.uploadedBy?.name}</td>
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
