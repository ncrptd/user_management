import { useState } from 'react';
import {
    AppBar,
    Box,
    IconButton,
    Modal,
    Paper,
    Tab,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    Tabs,
    Typography,
    Tooltip,
    // InputLabel,
    // MenuItem,
    // FormControl,
    // Select
} from '@mui/material';
// import { Download as DownloadIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

import { useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { setEditColumnData, toggleEditColumnModal } from '../../../features/template/templateSlice';
import { Visibility } from '@mui/icons-material';

const AdminTemplate = ({ data }) => {
    const [currentTab, setCurrentTab] = useState(0);
    const [actionModalOpen, setActionModalOpen] = useState(false);

    // const [formData, setFormData] = useState({
    //     columnName: "",
    //     dataType: null,
    //     defaultValue: "",
    //     unitOfMeasure: "",
    //     impactPercentage: 0,
    //     category: '',

    // });

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };


    const handleCloseActionModal = () => {
        setActionModalOpen(false);
    };

    const theme = useTheme();
    const dispatch = useDispatch();



    const handleEditColumn = async (column, category, categoryIndex, columnIndex) => {
        await dispatch(setEditColumnData({ editedColumnData: { ...column, category }, categoryIndex, columnIndex, category }))
        dispatch(toggleEditColumnModal(true));

    }

    const RenderColumns = ({ columns, categoryIndex }) => {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Indicator</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Unit of Measure</TableCell>
                            <TableCell>Impact Percentage</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {columns.columns.map((column, columnIndex) => (
                            <TableRow key={`${column.category}-${columnIndex}`}>
                                <TableCell>{column.columnName}</TableCell>
                                <TableCell>

                                    {column.defaultValue}
                                </TableCell>
                                <TableCell>
                                    <Tooltip title={column.unitOfMeasure} placement="right">
                                        <IconButton
                                            aria-label="toggle unit of measurement"
                                            onMouseEnter={() => console.log('Show unit of measurement', column.unitOfMeasure)}
                                        >
                                            <Visibility />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>



                                <TableCell>{column.impactPercentage}</TableCell>
                                <TableCell>

                                    <IconButton aria-label="edit" onClick={() => handleEditColumn(column, columns.category, categoryIndex, columnIndex)}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    {/* <IconButton aria-label="download" onClick={() => console.log('Download')}>
                                        <Download />
                                    </IconButton> */}

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', width: 'full' }}>
            <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.brand }}>
                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    indicatorColor="secondary"
                    textColor="white"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    sx={{
                        borderBottom: '1px solid #ccc', // Add border at the bottom of the tabs
                    }}
                >
                    {data.map((item, index) => (
                        <Tab
                            key={index}
                            label={item.category}
                            sx={{
                                '&.Mui-selected': {
                                    color: theme.palette.secondary.brand,
                                    borderBottom: '2px solid', // Add border to the bottom of the selected tab
                                },
                            }}
                        />
                    ))}
                </Tabs>

            </AppBar>

            <Box sx={{ padding: '20px' }}>
                {/* {RenderColumns(data[currentTab], currentTab)} */}
                <RenderColumns columns={data[currentTab]} categoryIndex={currentTab} />
            </Box>



            <Modal open={actionModalOpen} onClose={handleCloseActionModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Upload Modal
                    </Typography>

                </Box>
            </Modal>
        </Box>
    );
};

export default AdminTemplate;
