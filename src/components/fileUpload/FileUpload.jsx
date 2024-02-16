import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload } from 'react-icons/fa';
import * as api from '../../api/index';
import toast from 'react-hot-toast';
import ProgressBar from '@ramonak/react-progress-bar';
import './FileUpload.css';
import { useDispatch } from 'react-redux';
import { updateFiles } from '../../features/upload/uploadSlice';
import { toggleUploadModal } from '../../features/modals/modalsSlice';
// import * as XLSX from 'xlsx';
import { getLoggedUser } from '../../utils/getLoggedUser';
// import { toggleUploadModal } from '../../features/modals/modalsSlice';

const FileUpload = () => {
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [fileUploadProgress, setFileUploadProgress] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState('');
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [folders, setFolders] = useState([]);
    const [confidential, setConfidential] = useState(false);
    // const [allowedFileFormats, setAllowedFileFormats] = useState([]);
    const dispatch = useDispatch();

    const loggedInUser = getLoggedUser();

    const isSpreadsheetFile = (fileName) => {
        const allowedFileFormats = ["xls", "xlsx",];
        const fileExtension = fileName.split('.').pop().toLowerCase();
        return allowedFileFormats.includes(fileExtension);
    };

    // const checkSheetValues = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();

    //         reader.onload = (e) => {
    //             try {
    //                 const data = new Uint8Array(e.target.result);
    //                 const workbook = XLSX.read(data, { type: 'array' });
    //                 const firstSheetName = workbook.SheetNames[0];
    //                 const worksheet = workbook.Sheets[firstSheetName];

    //                 // Extract column names
    //                 const columnNames = Object.keys(worksheet)
    //                     .filter((cell) => /^[A-Z]+1$/.test(cell))
    //                     .map((cell) => worksheet[cell].v);

    //                 // Check if there are columns
    //                 if (columnNames.length === 0) {
    //                     console.log('No columns found in the Excel file.');
    //                     resolve(false);
    //                     return;
    //                 }

    //                 // Extract values from the second row (assuming the first row is header)
    //                 const values = Object.keys(worksheet)
    //                     .filter((cell) => /^[A-Z]+2$/.test(cell))
    //                     .map((cell) => worksheet[cell].v);

    //                 // Check if there are non-empty values under the columns
    //                 if (values.every((value) => value === "")) {
    //                     console.log('No non-empty values found under the columns in the Excel file.');
    //                     resolve(false);
    //                     return;
    //                 }

    //                 console.log('Columns:', columnNames);
    //                 console.log('Values:', values);

    //                 // Return true if there are both columns and non-empty values
    //                 resolve(true);
    //             } catch (error) {
    //                 console.error('Error checking sheet values:', error);
    //                 reject(error);
    //             }
    //         };

    //         reader.readAsArrayBuffer(file);
    //     });
    // };

    const onDrop = useCallback(async (acceptedFiles) => {
        try {
            const file = acceptedFiles[0];
            setError(null);

            // Check if a folder is selected
            if (!selectedFolder) {
                setError('Please select a folder before uploading.');
                return;
            }

            const allowedFileFormats = ["xls", "xlsx", "csv", "pdf", "doc", "docx", "json"];

            const isFileFormatAllowed = (fileName) => {
                const fileExtension = fileName.split('.').pop().toLowerCase();
                return allowedFileFormats.includes(fileExtension);
            };

            if (!isFileFormatAllowed(file.name) || allowedFileFormats.length <= 0) {
                setError('Unsupported file type');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('confidential', confidential);

            if (selectedFolder === 'Templates') {
                if (!isSpreadsheetFile(file.name)) {
                    toast.error('File Not Supported, Upload Spreadsheet');
                    return;
                }

                // const check = await checkSheetValues(file);
                // if (check) {
                //     const result = await api.upload(selectedFolder, formData, setFileUploadProgress);
                //     toast.success(`File Uploaded Successfully`);
                //     setUploadedFileName(file.name);
                //     dispatch(updateFiles(result.data.fileUpload));
                //     if (!isModalOpen) {
                //         dispatch(toggleUploadModal())
                //     }
                // } else {
                //     toast.error('Template is Empty')
                // }
                const result = await api.upload(selectedFolder, formData, setFileUploadProgress);
                toast.success(`File Uploaded Successfully`);
                setUploadedFileName(file.name);
                dispatch(updateFiles(result.data.fileUpload));
                if (!isModalOpen) {
                    dispatch(toggleUploadModal())
                }
            } else {
                const result = await api.upload(selectedFolder, formData, setFileUploadProgress);
                toast.success(`File Uploaded Successfully`);

                setUploadedFileName(file.name);
                dispatch(updateFiles({ ...result.data.fileUpload, uploadedBy: { name: loggedInUser.name } }));
                dispatch(toggleUploadModal());
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('Unknown error occurred');
        }
    }, [selectedFolder, dispatch, confidential, setFileUploadProgress, isModalOpen, loggedInUser.name]);

    const handleFolderChange = (e) => {
        setSelectedFolder(e.target.value);
    };

    const handleSelectClick = (e) => {
        e.stopPropagation();
    };

    const handleSelectMouseDown = (e) => {
        e.stopPropagation();
    };

    const openModal = () => {
        setNewFolderName('')
        setIsModalOpen(true);
    };

    const closeModal = (e) => {

        setIsModalOpen(false);
        // setNewFolderName('');
        e.stopPropagation()

    };

    const handleNewFolder = (e) => {
        e.stopPropagation();

        // Check if the folder already exists
        if (folders.includes(newFolderName)) {
            setError('Folder already exists. Please choose a different name.');
            return;
        }
        setFolders((prev) => [...prev, newFolderName])

        // Clear any previous error
        setError(null);

        // Set the new folder name
        setSelectedFolder(newFolderName);

        // Close the modal
        closeModal();
    };

    const handleFolderNameChange = (e) => {
        e.stopPropagation();
        setNewFolderName(e.target.value)
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
    });

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await api.getFolders(); // Call the getFolders function
                setFolders(response.data.folders);
            } catch (error) {
                console.error('Error fetching folders:', error);
                toast.error('Error fetching folders');
            }
        };
        // const fetchConfigFile = async () => {
        //     try {
        //         const res = await api.getConfigFile();
        //         setAllowedFileFormats(res.data.configFile.allowedFileFormats)
        //     } catch (error) {
        //         console.error(error)
        //         setAllowedFileFormats(null)

        //     }
        // }
        fetchFolders();
        // fetchConfigFile();
    }, []);

    return (
        <div className='upload-container'>
            <div>
                <div className='folder-dropdown'>
                    <select
                        id='folderSelect'
                        value={selectedFolder}
                        onChange={handleFolderChange}
                        onClick={handleSelectClick}
                        onMouseDown={handleSelectMouseDown}
                    >
                        <option value=''>Select Folder</option>
                        {folders.map((folder, index) => (
                            <option key={index} value={folder}>
                                {folder}
                            </option>
                        ))}
                        <option value='Others' onClick={openModal}>
                            Others
                        </option>

                    </select>
                </div>
                <form className='confidential-checkbox'>
                    <input
                        type="checkbox"
                        id="confidentialCheckbox"
                        name="confidential"
                        checked={confidential}
                        onChange={(e) => setConfidential(e.target.checked)}
                    />
                    <label htmlFor="confidentialCheckbox">Confidential</label>

                </form>
            </div>

            <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? 'active' : ''} ${isDragAccept ? 'accept' : ''} ${isDragReject ? 'reject' : ''} file-upload`}
            >

                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here...</p>
                ) : (
                    <div className='upload-elements'>
                        <FaUpload className='upload-icon' />

                        <p className='upload-successful'>
                            {uploadedFileName
                                ? `File uploaded: ${uploadedFileName}`
                                : 'Drag\'n drop csv or excel files here, or click to select files'}
                        </p>

                        <p className='unsupported-error-msg'>{error}</p>
                        <div className='progress-bar'>
                            {fileUploadProgress && <ProgressBar completed={fileUploadProgress} />}
                        </div>
                    </div>
                )}
                {isModalOpen && (
                    <div className='modal'>
                        <div className='modal-content'>
                            <p>Please enter the folder name:</p>
                            <input
                                type='text'
                                value={newFolderName}
                                onChange={handleFolderNameChange}
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                            />
                            <button onClick={closeModal}>Cancel</button>
                            <button onClick={handleNewFolder}>Create Folder</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
