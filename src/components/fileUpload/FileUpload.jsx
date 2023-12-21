import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload } from "react-icons/fa";
import * as api from '../../api/index';
import toast from "react-hot-toast";
import ProgressBar from "@ramonak/react-progress-bar";
import './FileUpload.css';

const FileUpload = () => {
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [fileUploadProgress, setFileUploadProgress] = useState(null);

    const [error, setError] = useState(null);

    const onDrop = useCallback(async (acceptedFiles) => {
        try {
            const file = acceptedFiles[0];
            const formData = new FormData()


            setError(null);

            if (file.path.endsWith('.xls') || file.path.endsWith('.xlsx') || file.path.endsWith('.csv')) {
                formData.append('file', acceptedFiles[0]);
                await api.upload(formData, setFileUploadProgress);
                console.log('p', fileUploadProgress)
                toast.success(`File Uploaded Successfully`)
                setUploadedFileName(file.path);
            } else {
                setError('Unsupported file type');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error(`Error uploading file`)
            setError('Error uploading file');
        }
    }, [fileUploadProgress]);


    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
    });

    return (
        <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'active' : ''} ${isDragAccept ? 'accept' : ''} ${isDragReject ? 'reject' : ''}`}
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
                            : "Drag'n drop csv or excel files here, or click to select files"}
                    </p>
                    <p className='unsupported-error-msg'>{error}</p>
                    <div className='progress-bar'>
                        {fileUploadProgress && <ProgressBar completed={fileUploadProgress} />}
                    </div>
                </div>
            )}

        </div>
    );
};

export default FileUpload;
