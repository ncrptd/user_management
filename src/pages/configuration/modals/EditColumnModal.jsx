import {
    Modal,
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { saveEditColumnData, toggleEditColumnModal } from '../../../features/template/templateSlice';
import { useEffect, useState } from 'react';


const EditColumnModal = ({ excelDataTypes }) => {
    const { showEditColumnModal } = useSelector((state) => state.template);


    const [formData, setFormData] = useState({
        columnName: "",
        dataType: "",
        defaultValue: "",
        unitOfMeasure: "",
        impactPercentage: 0,
    });

    // Assuming editedColumnData is coming from Redux store or props
    const editedColumnData = useSelector((state) => state.template.editedColumnData);
    const dispatch = useDispatch();


    const handleClose = () => {
        dispatch(toggleEditColumnModal(false))
    };



    const handleSaveEditData = () => {
        dispatch(saveEditColumnData({ formData }))
        handleClose();
    };



    useEffect(() => {
        if (editedColumnData) {
            // If editedColumnData exists, update formData
            setFormData(editedColumnData);
        } else {
            // If editedColumnData is null or undefined, reset formData
            setFormData({
                columnName: "",
                dataType: "",
                defaultValue: "",
                unitOfMeasure: "",
                impactPercentage: 0,
            });
        }
    }, [editedColumnData]);

    return (
        <div >
            <Modal open={showEditColumnModal} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: '20px',
                    }}
                >
                    <span
                        style={{ position: 'absolute', top: '5px', right: '10px', cursor: 'pointer', color: 'red', fontSize: '2rem' }}
                        onClick={handleClose}
                    >
                        &times;
                    </span>
                    <Typography variant="h5">Edit Column Details</Typography>
                    <form>
                        <TextField
                            label="Column Name"
                            type="text"
                            value={formData.columnName}
                            onChange={(e) => setFormData({ ...formData, columnName: e.target.value })}
                            required
                            fullWidth
                            sx={{ marginY: 1 }}
                        />

                        {/* <FormControl fullWidth sx={{ marginY: 1 }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <MenuItem value="">Select Category</MenuItem>
                                {categories.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}

                        <FormControl fullWidth sx={{ marginY: 1 }}>
                            <InputLabel>Data Type</InputLabel>
                            <Select
                                value={formData.dataType}
                                onChange={(e) => setFormData({ ...formData, dataType: e.target.value })}
                            >
                                <MenuItem value="">Select Data Type</MenuItem>
                                {excelDataTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Default Value"
                            type="text"
                            value={formData.defaultValue}
                            onChange={(e) => setFormData({ ...formData, defaultValue: e.target.value })}
                            fullWidth
                            sx={{ marginY: 1 }}
                        />

                        <TextField
                            label="Unit Of Measure"
                            type="text"
                            value={formData.unitOfMeasure}
                            onChange={(e) => setFormData({ ...formData, unitOfMeasure: e.target.value })}
                            fullWidth
                            sx={{ marginY: 1 }}
                        />

                        <TextField
                            label="Impact Percentage"
                            type="number"
                            value={formData.impactPercentage}
                            onChange={(e) =>
                                setFormData((prevColumn) => ({
                                    ...prevColumn,
                                    impactPercentage: e.target.value.trim(),
                                }))
                            }
                            fullWidth
                            sx={{ marginY: 1 }}
                        />

                        <Button type="button" variant="contained" onClick={() => handleSaveEditData()} sx={{ marginY: 2 }}>
                            Save
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default EditColumnModal;
