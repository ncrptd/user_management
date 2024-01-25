import { Button, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toggleUploadModal } from '../../features/modals/modalsSlice';
import { getUploadedFiles } from '../../features/upload/uploadSlice';
import UploadedFiles from '../../components/uploadedFiles/UploadedFiles';
import FileUpload from '../../components/fileUpload/FileUpload';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
                setAdminTemplate(response.data.adminTemplate);
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        };

        fetchTemplates();
    }, [dispatch]);

    const handleUpload = () => {
        dispatch(toggleUploadModal());
    };

    const theme = useTheme();

    return (
        <Container sx={{ padding: '10px' }}>
            {uploadedFiles?.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>




                    <Button variant="contained" color="primary"

                        onClick={handleUpload}

                        sx={{
                            marginTop: 2, backgroundColor: theme.palette.primary.brand,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.brand,
                            },
                        }}>
                        Upload
                        <CloudUploadIcon sx={{
                            marginLeft: '10px', '&hover': {
                                color: 'red'
                            }
                        }} />
                    </Button>
                </div>
            )}
            {adminTemplate.length > 0 && (
                <UploadedFiles uploadedFiles={adminTemplate} adminTemplate />
            )}
            {uploadedFiles?.length > 0 && <UploadedFiles uploadedFiles={uploadedFiles} />}
            {uploadedFiles?.length <= 0 && <FileUpload />}
        </Container>
    );
}

export default Upload;
