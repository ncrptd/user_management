import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload } from 'react-icons/fa';
import * as api from '../../api/index';
import toast from 'react-hot-toast';
import ProgressBar from '@ramonak/react-progress-bar';
import './FileUpload.css';
import { useDispatch } from 'react-redux';
import { updateFiles } from '../../features/upload/uploadSlice';
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

    const dispatch = useDispatch();

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

            if (!isFileFormatAllowed(file.path)) {
                setError('Unsupported file type');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('confidential', confidential);

            const result = await api.upload(selectedFolder, formData, setFileUploadProgress);
            toast.success(`File Uploaded Successfully`);

            setUploadedFileName(file.path);
            dispatch(updateFiles(result.data.fileUpload));
            setIsModalOpen(false)
        } catch (error) {
            setError('Unknown error occurred');
        }
    }, [selectedFolder, dispatch, confidential, setFileUploadProgress]);

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

        fetchFolders();
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
