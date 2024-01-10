import { useEffect, useState } from "react";
import { writeFileXLSX, utils } from "xlsx";
import * as XLSX from 'xlsx';
import './Configuration.css'
import toast from "react-hot-toast";
import * as api from '../../api/index';
import Templates from "../../components/templates/Templates";
// import UploadedFiles from "../../components/uploadedFiles/UploadedFiles";

function Configuration() {
    const [modalVisible, setModalVisible] = useState(false);
    const [newColumn, setNewColumn] = useState({
        category: "",
        columnName: "",
        dataType: "",
        defaultValue: "",
        unitOfMeasure: "",
        impactPercentage: 0,
    });

    const [templateNameInput, setTemplateNameInput] = useState("");
    const [saveModalVisible, setSaveModalVisible] = useState(false);
    const [setFileUploadProgress] = useState(null);

    const [templates, setTemplates] = useState([]);

    const excelDataTypes = ["Text", "Number", "Date", "Boolean"];
    const categories = ['Environment', 'Social', 'Governance', 'Economic'];

    const [templateData, setTemplateData] = useState([])

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setNewColumn({
            columnName: "",
            dataType: "",
            defaultValue: "",
            unitOfMeasure: "",
            impactPercentage: '',
        });
    };



    const calculateTotalPercentage = (category) => {
        const categoryData = templateData.find((data) => data.category === category);
        if (!categoryData) return 0;

        return categoryData.columns.reduce((total, column) => total + parseFloat(column.impactPercentage), 0);
    };

    const handleTemplateData = () => {

        if (!newColumn.category.trim() || !newColumn.columnName.trim()) {
            // Display an error message or take appropriate action
            toast.error('Field is empty!');
            return;
        }
        const impactPercentage = newColumn.impactPercentage === '' ? 0 : parseFloat(newColumn.impactPercentage);

        const totalPercentage = calculateTotalPercentage(newColumn.category);
        if (totalPercentage + impactPercentage > 100) {
            // Display an error message or take appropriate action
            toast.error('Total Impact Percentage cannot exceed 100% for a category!');
            return;
        }


        const existingCategoryIndex = templateData.findIndex((category) => category.category === newColumn.category);

        if (existingCategoryIndex !== -1) {
            // Category already exists, add new columns to its columns array
            const updatedData = [...templateData];



            updatedData[existingCategoryIndex].columns.push({
                columnName: newColumn.columnName,
                dataType: newColumn.dataType,
                defaultValue: newColumn.defaultValue,
                unitOfMeasure: newColumn.unitOfMeasure,
                impactPercentage
            });
            setTemplateData([...updatedData]);
        } else {
            // Category doesn't exist, add a new category object
            setTemplateData((prevData) => [
                ...prevData,
                {
                    category: newColumn.category,
                    columns: [
                        {
                            columnName: newColumn.columnName,
                            dataType: newColumn.dataType,
                            defaultValue: newColumn.defaultValue,
                            unitOfMeasure: newColumn.unitOfMeasure,
                            impactPercentage

                        },
                    ],
                },
            ]);
        }

        // Reset the newColumn state
        setNewColumn({
            category: '',
            columnName: '',
            dataType: '',
            defaultValue: '',
            unitOfMeasure: '',
            impactPercentage: '',
        });


    };



    const handleTemplateSave = async (templateName) => {

        const wb = utils.book_new();
        let hasError = false;

        templateData.forEach((sheet) => {

            const totalPercentage = calculateTotalPercentage(sheet.category);

            if (totalPercentage !== 100) {
                // Set hasError flag to true
                hasError = true;

                toast.error(`Total Impact Percentage for ${sheet.category} must be 100%!`);
                return;
            }
            const wsData = sheet.columns.map((column) => ({ [column.columnName]: '' }));
            const ws = utils.json_to_sheet(wsData);

            sheet.columns.forEach((item, index) => {
                const cellAddress = utils.encode_cell({ r: 0, c: index });

                if (!ws[cellAddress]) {
                    ws[cellAddress] = { t: 's', v: item.columnName, r: utils.encode_cell({ c: index, r: 0 }) };
                }

                const commentText = `Data Type: ${item.dataType}\nDefault Value: ${item.defaultValue
                    }\nUnit Of Measure: ${item.unitOfMeasure}\nImpact Percentage: ${item.impactPercentage} `;

                if (!ws[cellAddress].c) ws[cellAddress].c = [];

                ws[cellAddress].c.push({ a: "Comment Author", t: commentText });
            });

            utils.book_append_sheet(wb, ws, sheet.category);
        });

        if (hasError) {
            return;
        }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const formData = new FormData();
        formData.append('file', blob, `${templateName}.xlsx`); // Set filename using templateName parameter


        try {
            const res = await api.upload('Templates', formData, setFileUploadProgress);
            setTemplates((prev) => [...prev, res.data.fileUpload]);
            toast.success(`File Uploaded Successfully`);
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('File Upload Failed');
        }
    };



    const handleDownloadTemplate = () => {
        const wb = utils.book_new();

        let hasError = false;

        templateData.forEach((sheet) => {
            const totalPercentage = calculateTotalPercentage(sheet.category);
            if (totalPercentage !== 100) {
                // Set hasError flag to true
                hasError = true;

                toast.error(`Total Impact Percentage for ${sheet.category} must be 100%!`);
                return;
            }

            const wsData = sheet.columns.map((column) => ({ [column.columnName]: '' }));
            const ws = utils.json_to_sheet(wsData);

            sheet.columns.forEach((item, index) => {
                const cellAddress = utils.encode_cell({ r: 0, c: index });

                if (!ws[cellAddress]) {
                    ws[cellAddress] = { t: 's', v: item.columnName, r: utils.encode_cell({ c: index, r: 0 }) };
                }

                const commentText = `Data Type: ${item.dataType}\nDefault Value: ${item.defaultValue
                    }\nUnit Of Measure: ${item.unitOfMeasure}\nImpact Percentage: ${item.impactPercentage} `;

                if (!ws[cellAddress].c) ws[cellAddress].c = [];

                ws[cellAddress].c.push({ a: "Comment Author", t: commentText });
            });

            utils.book_append_sheet(wb, ws, sheet.category);
        });

        // If there are no errors, initiate the download
        if (!hasError) {
            writeFileXLSX(wb, `ExcelTemplate - ${Date.now()}.xlsx`, { bookType: "xlsx", bookSST: false, type: "blob" });
        }
    };

    const handleImpactPercentage = (categoryIndex, columnIndex, e) => {

        const inputValue = e.target.value.trim();
        const parsedValue = inputValue === '' ? 0 : parseInt(inputValue, 10);
        if (!isNaN(parsedValue)) {
            // Clone the existing data structure to avoid directly mutating state
            const updatedData = JSON.parse(JSON.stringify(templateData));

            // Update the impactPercentage for the specified category and column
            updatedData[categoryIndex].columns[columnIndex].impactPercentage = inputValue;

            // Update the state with the modified data structure
            setTemplateData(updatedData);
        }
    };


    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await api.getTemplates();
                setTemplates(response.data.templates);
                // setAdminTemplate(response
                //     .data.adminTemplate)
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        };

        fetchTemplates();
    }, []);

    return (
        <div className="config-container">
            <h1>Configuration</h1>


            {/* {
                adminTemplate.length > 0 && <UploadedFiles uploadedFiles={adminTemplate} adminTemplate />
            } */}

            {templates.length > 0 && <div className="uploaded-templates">
                <Templates templates={templates} adminTemplate />

            </div>}
            {templateData.length > 0 && <div className="template-container">
                <h2>Created Template</h2>
                <table className="template-table">
                    <thead>
                        <tr>
                            <th>Column Name</th>
                            <th>Data Type</th>
                            <th>Default Value</th>
                            <th>Unit of Measure</th>
                            <th>Impact Percentage</th>
                            <th>Category</th>

                        </tr>
                    </thead>
                    <tbody>
                        {templateData.map((category, categoryIndex) =>
                            category.columns.map((column, columnIndex) => (
                                <tr key={`${category.category}-${columnIndex}`}>
                                    <td>{column.columnName}</td>
                                    <td>{column.dataType}</td>
                                    <td>{column.defaultValue}</td>
                                    <td>{column.unitOfMeasure}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={column.impactPercentage}
                                            onChange={(e) => handleImpactPercentage(categoryIndex, columnIndex, e)}
                                        />
                                    </td>
                                    <td className={category.category ? `category-${category.category}` : ''}>
                                        {category.category}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

            </div>}
            <button className="create-sheet-button" onClick={openModal}>Create Template</button>


            {/* Modal */}
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <h2>Enter Column Details</h2>
                        <form>
                            <label>Category:</label>

                            <select
                                value={newColumn.category}
                                onChange={(e) =>
                                    setNewColumn({ ...newColumn, category: e.target.value })
                                }
                            >
                                <option value="">Select Category</option>
                                {categories.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            <label>Column Name:</label>
                            <input
                                type="text"
                                value={newColumn.columnName}
                                onChange={(e) =>
                                    setNewColumn({ ...newColumn, columnName: e.target.value })
                                }
                                required
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

                            <label>Impact Percentage:</label>
                            <input
                                type="number"
                                value={newColumn.impactPercentage}
                                onChange={(e) => {
                                    const inputValue = e.target.value.trim();

                                    setNewColumn((prevColumn) => ({
                                        ...prevColumn,
                                        impactPercentage: inputValue,
                                    }));
                                }}
                            />
                            <button type="button" onClick={handleTemplateData}>
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {templateData.length > 0 && (
                <div className="template-save-download-container">
                    <button onClick={handleDownloadTemplate}>Download Template</button>
                    <button onClick={() => setSaveModalVisible(true)}>Save Template</button>
                </div>
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
