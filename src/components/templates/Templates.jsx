import { useState } from 'react';
import './Templates.css';
import * as api from '../../api/index'
import toast from 'react-hot-toast';
const getFileTypeLabel = (fileType) => {
    const fileTypeMap = {
        'text/csv': 'CSV File',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Spreadsheet',
    };

    return fileTypeMap[fileType] || 'Unknown Type';
};

const Templates = ({ templates }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const handleTemplateSelection = (templateId) => {
        setSelectedTemplate(templateId === selectedTemplate ? null : templateId);
    };

    const handleUploadToGlobalFolder = async () => {
        // Implement logic to upload the selected template to the global folder
        if (selectedTemplate !== null) {
            const selectedTemplateObject = templates.find((template) => template.id === selectedTemplate);

            try {
                const res = await api.uploadGlobalTemplate(selectedTemplateObject);
                toast.success('Template Uploaded Successfully')
                console.log('res', res)
            } catch (error) {
                console.error(error)
                toast.error('Failed uploading template')
            }
        }
    };

    return (
        <div className="uploaded-files-container">
            <h2>Templates</h2>
            <table className="uploaded-files-table">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>File Name</th>
                        <th>File Size</th>
                        <th>File Type</th>
                        <th>Organization</th>
                        <th>Folder Name</th>
                        <th>Upload Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {templates?.map((file) => (
                        <tr key={file.id}>
                            <td>
                                <input
                                    type="radio"
                                    name="selectedTemplate"
                                    checked={file.id === selectedTemplate}
                                    onChange={() => handleTemplateSelection(file.id)}
                                />
                            </td>
                            <td>{file.fileName}</td>
                            <td>{file.fileSize} bytes</td>
                            <td>{getFileTypeLabel(file.fileType)}</td>
                            <td>{file.organization || 'N/A'}</td>
                            <td>{file.folderName}</td>
                            <td>{new Date(file.uploadTimestamp).toLocaleString()}</td>
                            <td>
                                <button>
                                    <a
                                        href={file?.filePath}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="download"
                                    >
                                        Download
                                    </a>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleUploadToGlobalFolder}>Upload Selected Template</button>
        </div>
    );
};

export default Templates;
