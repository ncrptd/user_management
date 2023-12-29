import { useEffect, useState } from "react";
import { writeFileXLSX, utils } from "xlsx";
import * as XLSX from 'xlsx';
import './Configuration.css'
import toast from "react-hot-toast";
import * as api from '../../api/index';
import UploadedFiles from "../../components/uploadedFiles/UploadedFiles";

function Configuration() {
    const [modalVisible, setModalVisible] = useState(false);
    const [columnInputs, setColumnInputs] = useState([]);
    const [newColumn, setNewColumn] = useState({
        name: "",
        dataType: "",
        defaultValue: "",
        unitOfMeasure: "",
    });
    const [columns, setColumns] = useState([]);

    const [templateNameInput, setTemplateNameInput] = useState("");
    const [saveModalVisible, setSaveModalVisible] = useState(false);
    const [setFileUploadProgress] = useState(null);

    const [templates, setTemplates] = useState([]);

    const excelDataTypes = ["Text", "Number", "Date", "Boolean"];
    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setNewColumn({
            name: "",
            dataType: "",
            defaultValue: "",
            unitOfMeasure: "",
        });
    };

    const addColumnInputs = () => {
        const { name, dataType, defaultValue, unitOfMeasure } = newColumn;

        if (name.trim() !== "") {
            if (!columnInputs.includes(name)) {
                setColumnInputs([...columnInputs, name]);
                setColumns((prevColumns) => [
                    ...prevColumns,
                    { name, dataType, defaultValue, unitOfMeasure },
                ]);
                setNewColumn({
                    name: "",
                    dataType: "",
                    defaultValue: "",
                    unitOfMeasure: "",
                });

            } else {
                toast.error("Column with the same name already exists!");
            }
        }
    };

    const handleDownloadTemplate = () => {
        const columnNamesOnly = columnInputs.map((columnName) => ({ [columnName]: '' }));
        const ws = utils.json_to_sheet(columnNamesOnly);

        columnInputs.forEach((columnName, index) => {
            const cellAddress = utils.encode_cell({ r: 0, c: index });

            if (!ws[cellAddress]) {
                ws[cellAddress] = { t: 's', v: columnName, r: utils.encode_cell({ c: index, r: 0 }) };
            }

            const commentText = `Data Type: ${columns[index].dataType}\nDefault Value: ${columns[index].defaultValue}\nUnit Of Measure: ${columns[index].unitOfMeasure}`;

            if (!ws[cellAddress].c) ws[cellAddress].c = [];

            ws[cellAddress].c.push({ a: "Comment Author", t: commentText });
        });

        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Template");
        console.log(wb)
        writeFileXLSX(wb, `ExcelTemplate-${Date.now()}.xlsx`, { bookType: "xlsx", bookSST: false, type: "blob" });
    };

    const handleTemplateSave = async (templateName) => {
        const columnNamesOnly = columnInputs.map((columnName) => ({ [columnName]: '' }));
        const ws = XLSX.utils.json_to_sheet(columnNamesOnly);
        columnInputs.forEach((columnName, index) => {
            const cellAddress = utils.encode_cell({ r: 0, c: index });

            if (!ws[cellAddress]) {
                ws[cellAddress] = { t: 's', v: columnName, r: utils.encode_cell({ c: index, r: 0 }) };
            }

            const commentText = `Data Type: ${columns[index].dataType}\nDefault Value: ${columns[index].defaultValue}\nUnit Of Measure: ${columns[index].unitOfMeasure}`;

            if (!ws[cellAddress].c) ws[cellAddress].c = [];

            ws[cellAddress].c.push({ a: "Comment Author", t: commentText });
        });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, ws, 'Template');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const formData = new FormData();
        formData.append('file', blob, `${templateName}.xlsx`); // Set filename using templateName parameter

        try {
            const res = await api.upload('Templates', formData, setFileUploadProgress);
            console.log('fi', res.data.fileUpload)
            setTemplates((prev) => [...prev, res.data.fileUpload]);
            toast.success(`File Uploaded Successfully`);
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('File Upload Failed');
        }
    };

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await api.getTemplates();
                console.log(response)
                setTemplates(response.data.templates); // Assuming the API response contains the data field
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        };

        fetchTemplates();
    }, []);

    console.log(columnInputs)
    return (
        <div className="config-container">
            {templates.length > 0 && <div className="uploaded-templates">
                <UploadedFiles uploadedFiles={templates} template />

            </div>}
            <h1>Create Template</h1>
            <table className="data-table">
                <thead>
                    <tr>
                        {columnInputs.map((columnName, index) => (
                            <th className="column-name" key={index}>
                                {columnName}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {columns.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columnInputs.map((columnName, colIndex) => (
                                <td key={colIndex}></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="create-sheet-button" onClick={openModal}>Create</button>

            {/* Modal */}
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <h2>Enter Column Details</h2>
                        <form>
                            <label>Column Name:</label>
                            <input
                                type="text"
                                value={newColumn.name}
                                onChange={(e) =>
                                    setNewColumn({ ...newColumn, name: e.target.value })
                                }
                            />

                            <label>Data Type:</label>
                            <select
                                value={newColumn.dataType}
                                onChange={(e) =>
                                    setNewColumn({ ...newColumn, dataType: e.target.value })
                                }
                            >
                                <option value="">Select Data Type</option>
                                {excelDataTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>

                            <label>Default Value:</label>
                            <input
                                type="text"
                                value={newColumn.defaultValue}
                                onChange={(e) =>
                                    setNewColumn({ ...newColumn, defaultValue: e.target.value })
                                }
                            />

                            <label>Unit Of Measure:</label>
                            <input
                                type="text"
                                value={newColumn.unitOfMeasure}
                                onChange={(e) =>
                                    setNewColumn({
                                        ...newColumn,
                                        unitOfMeasure: e.target.value,
                                    })
                                }
                            />

                            <button type="button" onClick={addColumnInputs}>
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {columns.length > 0 && (
                <>
                    <button onClick={handleDownloadTemplate}>Download Template</button>
                    <button onClick={() => setSaveModalVisible(true)}>Save Template</button>
                </>
            )}

            {/* Save Template Modal */}
            {saveModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setSaveModalVisible(false)}>
                            &times;
                        </span>
                        <h2>Save Template</h2>
                        <form>
                            <label>Template Name:</label>
                            <input
                                type="text"
                                value={templateNameInput}
                                onChange={(e) => setTemplateNameInput(e.target.value)}
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    handleTemplateSave(templateNameInput);
                                    setSaveModalVisible(false);
                                }}
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Configuration;
