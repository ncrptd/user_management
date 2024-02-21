import { useState } from 'react';
import { Button, Typography, Modal, Box, TextField, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@emotion/react';
const SaveTemplateModal = ({
    templateNameInput,
    setTemplateNameInput,
    handleTemplateSave,
    templateData,
    // handleDownloadTemplate,

}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const theme = useTheme();
    return (
        <div>
            {templateData.length > 0 && (
                <div>
                    {/* <Button
                        variant="contained"
                        onClick={handleDownloadTemplate}
                        sx={{ backgroundColor: '#2196F3', color: 'white', marginRight: '10px' }}
                    >
                        Download Template
                    </Button> */}

                    <Button
                        variant="contained"
                        onClick={handleOpen}
                        sx={{
                            backgroundColor: theme.palette.primary.brand,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.brand,
                            },
                        }}
                    >
                        Save
                        <SaveIcon sx={{ marginLeft: '10px' }} />
                    </Button>
                </div>
            )}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            outline: 'none',
                            position: 'relative',
                            width: '400px',
                        }}
                    >
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                top: '5px',
                                right: '10px',
                                cursor: 'pointer',
                            }}
                        >
                            <CancelIcon />
                        </IconButton>
                        <Typography variant="h5" sx={{ marginBottom: '20px', color: '#333' }}>
                            Save Template
                        </Typography>
                        <form>
                            <TextField
                                label="Template Name"
                                type="text"
                                value={templateNameInput}
                                onChange={(e) => setTemplateNameInput(e.target.value)}
                                fullWidth
                                sx={{ marginY: 1 }}
                            />

                            <Button
                                type="button"
                                variant="contained"
                                onClick={() => {
                                    handleTemplateSave(templateNameInput);
                                    handleClose();
                                }}
                                sx={{ marginY: 2, backgroundColor: theme.palette.primary.brand, color: 'white' }}
                            >
                                <CheckCircleIcon />
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default SaveTemplateModal;
