import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Input,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { toggleEditColumnModal, saveEditColumnData } from '../../../features/template/templateSlice';
import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { CloudUpload } from '@mui/icons-material';
import toast from 'react-hot-toast';


const EditColumnModal = ({ formData, setFormData, setRelatedFile, comment, setComment }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const { showEditColumnModal } = useSelector((state) => state.template);


    // Assuming editedColumnData is coming from Redux store or props
    const editedColumnData = useSelector((state) => state.template.editedColumnData);
    const dispatch = useDispatch();
    const theme = useTheme();


    const handleClose = () => {
        dispatch(toggleEditColumnModal(false))
        setSelectedFile(null)
    };



    const handleSaveEditData = () => {
        // Check if default value and comment are provided

        if (!formData.defaultValue) {
            toast.error('Please provide a value');
            return;
        } else if (!comment) {
            toast.error('Please provide a comment');
            return

        }

        // Dispatch action to save edited data
        setRelatedFile(selectedFile)
        dispatch(saveEditColumnData({ formData }));
        handleClose();
    };


    const handleFileSelect = async (e) => {
        const file = e.target.files[0];


        const allowedFileFormats = ["xls", "xlsx", "csv", "pdf", "doc", "docx", "json"];

        const isFileFormatAllowed = (fileName) => {
            const fileExtension = fileName.split('.').pop().toLowerCase();
            return allowedFileFormats.includes(fileExtension);
        };

        if (!isFileFormatAllowed(file.name) || allowedFileFormats.length <= 0) {
            toast.error('Unsupported file type');
            return;
        }


        setSelectedFile(file)


    }

    useEffect(() => {
        if (editedColumnData) {
            // If editedColumnData exists, update formData
            setFormData(editedColumnData);
        }
        else {
            // If editedColumnData is null or undefined, reset formData
            setFormData({
                columnName: "",
                dataType: "",
                defaultValue: "",
                unitOfMeasure: "",
                category: '',
                impactPercentage: 0,
            });
        }
    }, [editedColumnData, setFormData]);

    return (
        <div>
            <Modal open={showEditColumnModal} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '15px',
                        width: '400px', // Adjust width as needed
                    }}
                >
                    <span
                        style={{ position: 'absolute', top: '5px', right: '10px', cursor: 'pointer', color: 'red', fontSize: '2rem' }}
                        onClick={handleClose}
                    >
                        &times;
                    </span>
                    <form>
                        <Typography variant="h6" sx={{ paddingY: '10px' }}>Indicator: {formData.columnName}</Typography>

                        <TextField
                            label="Value"
                            type="text"
                            value={formData.defaultValue}
                            onChange={(e) => setFormData({ ...formData, defaultValue: e.target.value })}
                            fullWidth
                            required
                            sx={{ marginY: 1, }}
                        />
                        <TextField
                            id="comment"
                            label="Comment"
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            required
                            InputLabelProps={{ shrink: true }} // Ensure the label remains visible when value is present
                            InputProps={{
                                style: { resize: 'vertical' },
                            }}
                            sx={{ marginTop: 1 }}
                        />


                        <Typography variant="body1" sx={{ marginTop: 1 }}>
                            Upload File:
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                            <Input
                                type="file"
                                id="fileInput"
                                onChange={(e) =>
                                    handleFileSelect(e)
                                }
                                sx={{ display: 'none' }}
                            />
                            <label htmlFor="fileInput">
                                <Button
                                    variant="contained"
                                    component="span"
                                    startIcon={<CloudUpload />}
                                    sx={{ marginRight: 1 }}
                                >
                                    Choose File
                                </Button>
                            </label>
                            <Typography variant="body1" sx={{ flex: 1 }}>
                                {selectedFile ? selectedFile.name : 'No file chosen'}
                            </Typography>
                        </Box>

                        <Button
                            type="button"
                            variant="contained"
                            onClick={handleSaveEditData}
                            sx={{
                                marginY: 2,
                                backgroundColor: theme.palette.primary.brand,
                                '&:hover': {
                                    backgroundColor: theme.palette.secondary.brand,
                                },
                            }}
                        >
                            Save
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default EditColumnModal;
