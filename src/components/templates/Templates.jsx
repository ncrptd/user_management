import { useState } from 'react';
import {
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Radio,
    Typography,
} from '@mui/material';
import * as api from '../../api/index';
import toast from 'react-hot-toast';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
        if (selectedTemplate !== null) {
            const selectedTemplateObject = templates.find((template) => template.id === selectedTemplate);

            try {
                await api.uploadGlobalTemplate(selectedTemplateObject);
                toast.success('Template Uploaded Successfully');
            } catch (error) {
                console.error(error);
                toast.error('Failed uploading template');
            }
        }
    };

    const handleDownload = async (data) => {
        try {
            const reqBody = { ...data };

            const res = await api.getDownloadLink(reqBody);
            window.location.href = res.data.signedUrl;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ marginTop: 2 }}>
            <Typography variant="h5">Templates</Typography>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Select</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>File Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>File Size</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>File Type</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Organization</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Folder Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Upload Time</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {templates?.map((file) => (
                        <TableRow key={file.id}>
                            <TableCell sx={{ padding: 0 }}>
                                <Radio
                                    checked={file.id === selectedTemplate}
                                    onChange={() => handleTemplateSelection(file.id)}
                                />
                            </TableCell>
                            <TableCell>{file.fileName}</TableCell>
                            <TableCell>{file.fileSize} bytes</TableCell>
                            <TableCell>{getFileTypeLabel(file.fileType)}</TableCell>
                            <TableCell>{file.organization || 'N/A'}</TableCell>
                            <TableCell>{file.folderName}</TableCell>
                            <TableCell>{new Date(file.uploadTimestamp).toLocaleString()}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{ marginRight: 1 }}
                                    onClick={() => handleDownload(file)}
                                >
                                    <CloudDownloadIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div style={{ marginTop: 2 }}>
                <Button variant="contained" color="primary" onClick={handleUploadToGlobalFolder} sx={{ marginTop: 2 }}>
                    Default Template
                    <CloudUploadIcon sx={{ marginLeft: '10px' }} />
                </Button>
            </div>
        </div>
    );
};

export default Templates;
