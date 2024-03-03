import { useState } from 'react';
import { Button, Typography, Input, Modal, Box, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import * as api from '../../../api/index';
import toast from 'react-hot-toast';

const ConfigModal = () => {
    const [configFile, setConfigFile] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        // Check if the selected file is a JSON file
        if (file && file.type === 'application/json') {
            setConfigFile(file);
        } else {
            // Reset the file selection and show an error message
            setConfigFile(null);
            toast.error('Please select a valid JSON file.');
        }
    };

    const handleUploadConfig = async (file) => {
        try {
            if (file) {
                const reader = new FileReader();

                const uploadConfig = async (formData) => {
                    try {
                        const res = await api.uploadConfigFile(formData);
                        if (res.status === 200) {
                            toast.success('Config File Uploaded Successfully');
                        }
                    } catch (error) {
                        console.error(error);
                        toast.error('Error Uploading Config File');
                    }
                };

                reader.onload = async (e) => {
                    try {
                        // Parse the JSON content
                        const jsonContent = JSON.parse(e.target.result);

                        // Check if JSON has the expected structure
                        if (
                            jsonContent &&
                            jsonContent.allowedFileFormats &&
                            Array.isArray(jsonContent.allowedFileFormats) &&
                            jsonContent.allowedFileFormats.every((format) => typeof format === 'string')
                        ) {

                            // Proceed with further actions, e.g., uploading the file
                            const formData = new FormData();
                            formData.append('configFile', file);
                            uploadConfig(formData);
                            // Call the API or perform other actions with formData
                        } else {
                            console.error('Invalid JSON structure. Please provide a valid configuration file.');
                            toast.error('Invalid JSON structure. Please provide a valid configuration file.');
                        }
                    } catch (error) {
                        toast.error('Error parsing JSON:', error);
                        console.error('Error parsing JSON:', error);
                    }
                };

                reader.readAsText(file);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpload = () => {
        if (configFile) {
            handleUploadConfig(configFile);
            handleClose();
        }
    };

    return (
        <div>
            <Button
                variant="contained"
                onClick={handleOpen}
                style={{ backgroundColor: '#4CAF50', color: 'white', }}
            >
                Upload Config File
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '25%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            padding: '30px',
                            borderRadius: '8px',
                            outline: 'none',
                            position: 'relative',
                            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)',
                        }}
                    >
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                top: '2px',
                                right: '10px',
                                cursor: 'pointer',
                            }}
                        >
                            <CancelIcon />
                        </IconButton>
                        <Typography variant="h5" sx={{ marginBottom: '20px', color: '#333' }}>
                            Upload Configuration File
                        </Typography>
                        <Input type="file" accept=".json" onChange={handleFileChange} sx={{ marginBottom: '20px' }} />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button onClick={handleClose} sx={{ marginRight: '10px', color: '#333' }}>
                                Cancel
                            </Button>
                            <Button variant="contained" onClick={handleUpload} sx={{ backgroundColor: '#4CAF50', color: 'white' }}>
                                Upload
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default ConfigModal;
