import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Typography,
} from '@mui/material';

const CreatedTemplate = ({ templateData, handleImpactPercentage }) => {
    return (
        <div>
            <Typography variant="h4" sx={{ marginTop: 3, textAlign: 'center', fontWeight: 'bold' }}>Created Template</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Column Name</TableCell>
                        <TableCell>Data Type</TableCell>
                        <TableCell>Default Value</TableCell>
                        <TableCell>Unit of Measure</TableCell>
                        <TableCell>Impact Percentage</TableCell>
                        <TableCell>Category</TableCell>
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
                                    <TextField
                                        type="number"
                                        value={column.impactPercentage}
                                        onChange={(e) =>
                                            handleImpactPercentage(categoryIndex, columnIndex, e)
                                        }
                                    />
                                </TableCell>
                                <TableCell className={category.category ? `category-${category.category}` : ''}>
                                    {category.category}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default CreatedTemplate;
