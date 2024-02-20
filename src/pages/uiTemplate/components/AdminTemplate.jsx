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
    TextField,
    Typography,
    Tooltip,
    Button,
    // InputLabel,
    // MenuItem,
    // FormControl,
    // Select
} from '@mui/material';
import { Download as DownloadIcon, Visibility as VisibilityIcon, Comment as CommentIcon, CloudUpload as UploadIcon } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { setEditColumnData, toggleEditColumnModal } from '../../../features/template/templateSlice';

const AdminTemplate = ({ data }) => {
    const [currentTab, setCurrentTab] = useState(0);
    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const [actionModalOpen, setActionModalOpen] = useState(false);

    // const [formData, setFormData] = useState({
    //     columnName: "",
    //     dataType: null,
    //     defaultValue: "",
    //     unitOfMeasure: "",
    //     impactPercentage: 0,
    //     category: '',

    // });

    console.log('data', data)
    const handleTabChange = (event, newValue) => {
        console.log('new', newValue)
        setCurrentTab(newValue);
    };

    const handleCommentButtonClick = () => {
        setCommentModalOpen(true);
    };

    const handleActionButtonClick = () => {
        setActionModalOpen(true);
    };

    const handleCloseCommentModal = () => {
        setCommentModalOpen(false);
    };

    const handleCloseActionModal = () => {
        setActionModalOpen(false);
    };

    const theme = useTheme();
    const dispatch = useDispatch();

    console.log('d', data)


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
                            <TableCell>Column Name</TableCell>
                            <TableCell>Data Type</TableCell>
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
                                    {/* <TextField
                                        variant="standard"
                                        defaultValue={column.dataType}
                                        onChange={(e) => setFormData({ ...column, dataType: e.target.value })}
                                    /> */}
                                    <p onClick={() => handleEditColumn(column, columns.category, categoryIndex, columnIndex)}>{column.dataType}</p>


                                </TableCell>
                                <TableCell>
                                    <Tooltip title={column.unitOfMeasure} placement="right">
                                        <IconButton
                                            aria-label="toggle unit of measurement"
                                            onMouseEnter={() => console.log('Show unit of measurement')}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>{column.impactPercentage}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="comment" onClick={handleCommentButtonClick}>
                                        <CommentIcon />
                                    </IconButton>
                                    <IconButton aria-label="download" onClick={() => console.log('Download')}>
                                        <DownloadIcon />
                                    </IconButton>
                                    <IconButton aria-label="upload" onClick={handleActionButtonClick}>
                                        <UploadIcon />
                                    </IconButton>
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
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {data.map((item, index) => (
                        <Tab key={index} label={item.category} />
                    ))}
                </Tabs>
            </AppBar>

            <Box sx={{ padding: '20px' }}>
                {/* {RenderColumns(data[currentTab], currentTab)} */}
                <RenderColumns columns={data[currentTab]} categoryIndex={currentTab} />
            </Box>

            <Modal open={commentModalOpen} onClose={handleCloseCommentModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Comments
                    </Typography>
                    <TextField
                        label="Comments"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        onClick={handleCloseCommentModal}
                        sx={{
                            backgroundColor: theme.palette.primary.brand,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.brand,
                            },
                            marginTop: '10px'
                        }}
                    >
                        Save
                        <SaveIcon sx={{ marginLeft: '10px' }} />
                    </Button>
                </Box>
            </Modal>
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
