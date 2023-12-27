import './UploadedFiles.css';

const getFileTypeLabel = (fileType) => {
    const fileTypeMap = {
        'text/csv': 'CSV File',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Spreadsheet',
        // Add more mappings for other file types if needed
    };

    return fileTypeMap[fileType] || 'Unknown Type';
};

const UploadedFiles = ({ uploadedFiles }) => {
    return (
        <div className="uploaded-files-container">
            <h2>Uploaded Files</h2>
            <table className="uploaded-files-table">
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>File Size</th>
                        <th>File Type</th>
                        <th>Organization</th>
                        <th>Folder Name</th>
                        <th>Upload Time</th>

                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {uploadedFiles &&
                        uploadedFiles.map((file) => (
                            <tr key={file.id}>
                                <td>{file.fileName}</td>
                                <td>{file.fileSize} bytes</td>
                                <td>{getFileTypeLabel(file.fileType)}</td>
                                <td>{file.organization || 'N/A'}</td>
                                <td>{file.folderName}</td>
                                <td>{new Date(file.uploadTimestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default UploadedFiles;
