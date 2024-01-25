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
import AddIcon from '@mui/icons-material/Add';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setTemplateData } from '../../../features/template/templateSlice';

const categories = ['Environment', 'Social', 'Governance', 'Economic'];

const CreateTemplateModal = ({
    // newColumn,
    // setNewColumn,
    excelDataTypes,
    // handleTemplateData,
    templateData,
    calculateTotalPercentage
}) => {
    const dispatch = useDispatch();

    const [newColumn, setNewColumn] = useState({
        category: "",
        columnName: "",
        dataType: "",
        defaultValue: "",
        unitOfMeasure: "",
        impactPercentage: 0,
    });
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);


    const resetNewColumn = () => {
        setNewColumn({
            category: "",
            columnName: "",
            dataType: "",
            defaultValue: "",
            unitOfMeasure: "",
            impactPercentage: 0,
        });
    };

    const handleClose = () => {
        setOpen(false);
        resetNewColumn();
    };


    const handleTemplateData = () => {
        if (!newColumn.category.trim() || !newColumn.columnName.trim()) {
            // Display an error message or take appropriate action
            toast.error('Field is empty!');
            return;
        }
        const impactPercentage = newColumn.impactPercentage === '' ? 0 : parseFloat(newColumn.impactPercentage);

        const totalPercentage = calculateTotalPercentage(newColumn.category);
        if (totalPercentage + impactPercentage > 100) {
            // Display an error message or take appropriate action
            toast.error('Total Impact Percentage cannot exceed 100% for a category!');
            return;
        }


        const existingCategoryIndex = templateData.findIndex((category) => category.category === newColumn.category);

        if (existingCategoryIndex !== -1) {
            // Category already exists, add new columns to its columns array
            const updatedData = JSON.parse(JSON.stringify(templateData));



            updatedData[existingCategoryIndex].columns.push({
                columnName: newColumn.columnName,
                dataType: newColumn.dataType,
                defaultValue: newColumn.defaultValue,
                unitOfMeasure: newColumn.unitOfMeasure,
                impactPercentage
            });
            dispatch(setTemplateData({ templateData: updatedData }))
                ;
        } else {
            // Category doesn't exist, add a new category object
            dispatch(setTemplateData({
                templateData: [
                    ...templateData,
                    {
                        category: newColumn.category,
                        columns: [
                            {
                                columnName: newColumn.columnName,
                                dataType: newColumn.dataType,
                                defaultValue: newColumn.defaultValue,
                                unitOfMeasure: newColumn.unitOfMeasure,
                                impactPercentage

                            },
                        ],
                    },
                ]
            }));
        }

        // Reset the newColumn state

        resetNewColumn();


    };

    return (
        <div >
            <div style={{ display: 'flex', justifyContent: ' flex-end' }}>
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
                    {templateData.length <= 0 ? <span>Create Template</span> : <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>  <AddIcon /> Add Column</span>}
                </Button>
            </div>
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
                        style={{ position: 'absolute', top: '5px', right: '10px', cursor: 'pointer', color: 'red', fontSize: '2rem' }}
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
