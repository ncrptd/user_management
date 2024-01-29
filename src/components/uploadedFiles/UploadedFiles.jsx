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
// import { getLoggedUser } from '../../utils/getLoggedUser';


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


const UploadedFiles = ({ uploadedFiles, }) => {

    const theme = useTheme();

    // const loggedInUser = getLoggedUser();
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
        <div style={{ marginTop: '20px' }}>
            <Typography variant="h5" style={{ marginBottom: '16px', }}>
                Uploaded Files
            </Typography>
            <TableContainer component={Paper} style={{ marginTop: '16px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
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
                        {uploadedFiles &&
                            uploadedFiles.map((file, index) => (
                                <TableRow key={index}>
                                    <TableCell style={{ color: file?.confidential ? 'red' : 'inherit' }}>
                                        {file.fileName}
                                    </TableCell>
                                    <TableCell>{getFileTypeLabel(file.fileType)}</TableCell>
                                    <TableCell>{file.organization || 'N/A'}</TableCell>
                                    <TableCell>{file.folderName}</TableCell>
                                    <TableCell>{new Date(file.uploadTimestamp).toLocaleString()}</TableCell>
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
                                            <CloudDownloadIcon sx={{

                                            }} />
                                        </Button>


                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UploadedFiles;
