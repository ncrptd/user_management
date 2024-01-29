import { Button, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toggleUploadModal } from '../../features/modals/modalsSlice';
import { getUploadedFiles } from '../../features/upload/uploadSlice';
import UploadedFiles from '../../components/uploadedFiles/UploadedFiles';
import FileUpload from '../../components/fileUpload/FileUpload';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import * as api from '../../api/index';
import { useTheme } from '@emotion/react';

function Upload() {
    const dispatch = useDispatch();
    const uploadedFiles = useSelector(state => state.upload.uploadedFiles);
    const [adminTemplate, setAdminTemplate] = useState([]);

    useEffect(() => {
        dispatch(getUploadedFiles());
        const fetchTemplates = async () => {
            try {
                const response = await api.getTemplates();
                setAdminTemplate(response.data.adminTemplate[0]);
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        };

        fetchTemplates();
    }, [dispatch]);

    const handleUpload = () => {
        dispatch(toggleUploadModal());
    };

    const handleDownload = async () => {


        try {
            const reqBody = { ...adminTemplate, adminTemplate: true };
            const res = await api.getDownloadLink(reqBody);
            window.location.href = res.data.signedUrl;
        } catch (error) {
            console.error(error);
        }
    };


    const theme = useTheme();

    return (
        <Container sx={{ padding: '10px' }}>
            {uploadedFiles?.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>


                    {adminTemplate && (
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{
                                marginTop: 2, backgroundColor: theme.palette.primary.brand,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: theme.palette.secondary.brand,
                                },
                            }}
                            onClick={() => handleDownload()}
                        >
                            Download
                            <CloudDownloadIcon sx={{
                                marginLeft: '10px', '&hover': {
                                    color: 'red'
                                }
                            }} />
                        </Button>

                    )
                    }

                    <Button variant="contained" color="primary"

                        onClick={handleUpload}

                        sx={{
                            marginTop: 2, backgroundColor: theme.palette.primary.brand,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.brand,
                            },
                        }}

                    >
                        Upload
                        <CloudUploadIcon sx={{
                            marginLeft: '10px', '&hover': {
                                color: 'red'
                            }
                        }} />
                    </Button>

                </div>
            )}


            {uploadedFiles?.length > 0 && <UploadedFiles uploadedFiles={uploadedFiles} />}
            {uploadedFiles?.length <= 0 && <FileUpload />}
        </Container >
    );
}

export default Upload;
