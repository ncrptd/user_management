import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    IconButton,
    Box

} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { setEditColumnData, toggleEditColumnModal } from '../../../features/template/templateSlice';
import { useTheme } from '@emotion/react';
import CreateTemplateModal from '../modals/CreateTemplateModal';


const CreatedTemplate = ({ templateData, handleColumnDelete, calculateTotalPercentage }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleEditColumn = async (column, category, categoryIndex, columnIndex) => {
        await dispatch(setEditColumnData({ editedColumnData: { ...column, category }, categoryIndex, columnIndex, category }))
        dispatch(toggleEditColumnModal(true));

    }

    return (
        <div style={{ marginTop: '30px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Typography variant="h5" sx={{ marginRight: '10px' }}>Created Template</Typography>
                <CreateTemplateModal
                    templateData={templateData}
                    handleColumnDelete={handleColumnDelete}
                    calculateTotalPercentage={calculateTotalPercentage}
                />
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Column Name</TableCell>
                        <TableCell>Data Type</TableCell>
                        <TableCell>Default Value</TableCell>
                        <TableCell>Unit of Measure</TableCell>
                        <TableCell>Impact Percentage</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {templateData.map((category, categoryIndex) =>
                        category.columns.map((column, columnIndex) => (
                            <TableRow key={`${category.category}-${columnIndex}`}>
                                <TableCell>{column.columnName}</TableCell>
                                <TableCell>{column.dataType}</TableCell>
                                <TableCell>{column.defaultValue}</TableCell>
                                <TableCell>{column.unitOfMeasure}</TableCell>
                                <TableCell>
                                    {column.impactPercentage}

                                </TableCell>
                                <TableCell className={category.category ? `category-${category.category}` : ''}>
                                    {category.category}
                                </TableCell>
                                <TableCell sx={{ display: 'flex', gap: '5px' }}>
                                    <IconButton onClick={() => handleEditColumn(column, category.category, categoryIndex, columnIndex)}>
                                        <EditIcon sx={{ color: 'green' }} />
                                    </IconButton>

                                    <IconButton onClick={() => handleColumnDelete(categoryIndex, columnIndex)}>
                                        <DeleteIcon sx={{ color: 'gray', '&:hover': { color: theme.palette.primary.brand } }} />

                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>


        </div >
    );
};

export default CreatedTemplate;
