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
import { useState } from 'react';

const CreateTemplateModal = ({
    newColumn,
    setNewColumn,
    categories,
    excelDataTypes,
    handleTemplateData,
}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setNewColumn({
            columnName: "",
            dataType: "",
            defaultValue: "",
            unitOfMeasure: "",
            impactPercentage: '',
        });
    };

    return (
        <div>
            <Button
                onClick={handleOpen}
                sx={{
                    backgroundColor: '#2196F3', // Choose your desired background color
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#1565C0', // Darker color on hover
                    },
                }}
            >
                Create Template
            </Button>
            <Modal open={open} onClose={handleClose}>
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
                        style={{ position: 'absolute', top: '5px', right: '10px', cursor: 'pointer' }}
                        onClick={handleClose}
                    >
                        &times;
                    </span>
                    <Typography variant="h5">Enter Column Details</Typography>
                    <form>
                        <TextField
                            label="Column Name"
                            type="text"
                            value={newColumn.columnName}
                            onChange={(e) => setNewColumn({ ...newColumn, columnName: e.target.value })}
                            required
                            fullWidth
                            sx={{ marginY: 1 }}
                        />

                        <FormControl fullWidth sx={{ marginY: 1 }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={newColumn.category}
                                onChange={(e) => setNewColumn({ ...newColumn, category: e.target.value })}
                            >
                                <MenuItem value="">Select Category</MenuItem>
                                {categories.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ marginY: 1 }}>
                            <InputLabel>Data Type</InputLabel>
                            <Select
                                value={newColumn.dataType}
                                onChange={(e) => setNewColumn({ ...newColumn, dataType: e.target.value })}
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
                            value={newColumn.defaultValue}
                            onChange={(e) => setNewColumn({ ...newColumn, defaultValue: e.target.value })}
                            fullWidth
                            sx={{ marginY: 1 }}
                        />

                        <TextField
                            label="Unit Of Measure"
                            type="text"
                            value={newColumn.unitOfMeasure}
                            onChange={(e) => setNewColumn({ ...newColumn, unitOfMeasure: e.target.value })}
                            fullWidth
                            sx={{ marginY: 1 }}
                        />

                        <TextField
                            label="Impact Percentage"
                            type="number"
                            value={newColumn.impactPercentage}
                            onChange={(e) =>
                                setNewColumn((prevColumn) => ({
                                    ...prevColumn,
                                    impactPercentage: e.target.value.trim(),
                                }))
                            }
                            fullWidth
                            sx={{ marginY: 1 }}
                        />

                        <Button type="button" variant="contained" onClick={handleTemplateData} sx={{ marginY: 2 }}>
                            Add
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateTemplateModal;
