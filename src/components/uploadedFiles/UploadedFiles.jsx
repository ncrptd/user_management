import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import * as api from '../../api/index';
import { useTheme } from '@emotion/react';
import JSZip from 'jszip';

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

const UploadedFiles = ({ uploadedFiles }) => {
    const theme = useTheme();
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleDownload = async (file) => {
        try {
            const res = await api.getDownloadLink(file);
            window.location.href = res.data.signedUrl;
        } catch (error) {
            console.error(error);
        }
    };

    const handleDownloadAll = async () => {
        try {
            const zip = new JSZip();
            const currentDate = new Date();
            const dateString = currentDate.toLocaleDateString().replaceAll('/', '-');
            // Iterate over selected files
            for (const file of selectedFiles) {
                const res = await api.getDownloadLink(file);
                const blob = await (await fetch(res.data.signedUrl)).blob();
                zip.file(file.fileName, blob);
            }

            // Generate zip file
            const zipBlob = await zip.generateAsync({ type: 'blob' });

            // Trigger download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(zipBlob);
            link.download = `${dateString}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading files:', error);
        }
    };

    const handleFileSelect = (file) => {
        const selectedIndex = selectedFiles.findIndex(selectedFile => selectedFile.fileName === file.fileName);
        if (selectedIndex === -1) {
            setSelectedFiles([...selectedFiles, file]);
        } else {
            setSelectedFiles(selectedFiles.filter(selectedFile => selectedFile.fileName !== file.fileName));
        }
    };
    return (
        <div style={{ marginTop: '20px' }}>
            <Typography variant="h5" style={{ marginBottom: '16px' }}>
                Uploaded Files
            </Typography>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" onClick={handleDownloadAll} sx={{
                    backgroundColor: theme.palette.primary.brand,
                    color: 'white',
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.brand,
                    },

                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
                }}
                    disabled={selectedFiles.length < 2}
                >
                    <CloudDownloadIcon />
                    Download All
                </Button>
            </div>
            <TableContainer component={Paper} style={{ marginTop: '16px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>

                            <TableCell>File Name</TableCell>
                            <TableCell>File Type</TableCell>
                            <TableCell>Organization</TableCell>
                            <TableCell>Folder Name</TableCell>
                            <TableCell>Upload Time</TableCell>
                            <TableCell>Uploaded By</TableCell>
                            <TableCell></TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uploadedFiles && uploadedFiles.map((file, index) => (
                            <TableRow key={index}>
                                <TableCell style={{ color: file?.confidential ? 'red' : 'inherit' }}>
                                    <input type="checkbox" onChange={() => handleFileSelect(file)} />
                                </TableCell>
                                <TableCell style={{ color: file?.confidential ? 'red' : 'inherit' }}>
                                    {file.fileName}
                                </TableCell>
                                <TableCell>{getFileTypeLabel(file.fileType)}</TableCell>
                                <TableCell>{file.organization || 'N/A'}</TableCell>
                                <TableCell>{file.folderName}</TableCell>
                                <TableCell>{new Date(file.createdAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    {file?.uploadedBy?.name}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        sx={{
                                            marginRight: 1, color: theme.palette.primary.brand,
                                            '&:hover': {
                                                color: theme.palette.secondary.brand,
                                            },
                                        }}
                                        onClick={() => handleDownload(file)}
                                    >
                                        <CloudDownloadIcon />
                                    </Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div >
    );
};

export default UploadedFiles;
