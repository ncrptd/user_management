import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    IconButton

} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { setEditColumnData, toggleEditColumnModal } from '../../../features/template/templateSlice';


const CreatedTemplate = ({ templateData }) => {
    const dispatch = useDispatch();


    const handleEditColumn = async (column, category, categoryIndex, columnIndex) => {
        await dispatch(setEditColumnData({ editedColumnData: column, categoryIndex, columnIndex }))
        dispatch(toggleEditColumnModal(true));

    }


    return (
        <div>
            <Typography variant="h4" >Template</Typography>
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
                                    {/* <IconButton onClick={() => handleColumnDelete(categoryIndex, columnIndex)}>
                                        <DeleteIcon sx={{ color: 'red' }} />

                                    </IconButton> */}
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
