import { useState } from 'react';
import Papa from 'papaparse';
import { read, utils } from 'xlsx';
import './FileUpload.css';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setErrorMessage(null);
    };
    const handleUpload = async () => {
        if (file) {
            try {
                const data = await readFile(file);
                const fileExtension = file.name.split('.').pop().toLowerCase();

                if (fileExtension === 'csv') {
                    const csvResult = Papa.parse(data, { header: true, skipEmptyLines: true, });

                    if (csvResult.errors.length === 0) {
                        console.log('Parsed CSV Data:', csvResult.data);
                        // Process and send the data to the backend
                        // ...

                        return;
                    } else {
                        // Handle CSV parsing errors
                        const error = csvResult.errors[0];
                        console.error('CSV Parsing Error:', error);
                        setErrorMessage(`Error parsing CSV: ${error.message}`);
                    }
                } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
                    const workbook = read(data, { type: 'binary' });

                    if (workbook.SheetNames.length > 0) {
                        const sheetName = workbook.SheetNames[0];
                        const excelData = utils.sheet_to_json(workbook.Sheets[sheetName]);

                        console.log('Parsed Excel Data:', excelData);
                        // Process and send the data to the backend
                        // ...

                        return;
                    } else {
                        // Handle Excel parsing errors
                        setErrorMessage('Error parsing Excel file.');
                        console.error('Error parsing Excel file.');
                    }
                } else {
                    // If neither CSV nor Excel, handle the error
                    setErrorMessage('Unsupported file format. Please upload a CSV or Excel file.');
                    console.error('Unsupported file format');
                }
            } catch (error) {
                console.error('Error reading file:', error);
                setErrorMessage('Error reading file. Please try again.');
            }
        }
    };


    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsBinaryString(file);
        });
    };

    return (
        <div className="file-upload-container">
            <label htmlFor="file-input" className="file-upload-label">
                Choose a file
            </label>
            <input type="file" id="file-input" onChange={handleFileChange} />
            {file && <p className="file-name">Selected File: {file.name}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="upload-button" onClick={handleUpload}>
                Upload
            </button>
        </div>
    );
};

export default FileUpload;
